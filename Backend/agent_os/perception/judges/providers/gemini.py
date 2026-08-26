from __future__ import annotations

import os
from typing import Any

from google import genai
from google.genai import types

from agent_os.perception.judges.client import LLMClient
from agent_os.perception.judges.errors import (
    RelevanceJudgeResponseError,
)
from agent_os.perception.judges.rate_limit import (
    LLMRateLimitExceeded,
    LLMRateLimiter,
)


class GeminiLLMClient(LLMClient):
    """
    Gemini implementation of the provider-agnostic LLMClient.

    Uses Google's google-genai SDK with Gemini structured output
    and a Pydantic response schema.

    Configuration:

        GEMINI_API_KEY
        GEMINI_MODEL

    Example:

        GEMINI_API_KEY=...
        GEMINI_MODEL=gemini-2.5-flash
    """

    DEFAULT_MODEL = "gemini-3.6-flash"

    def __init__(
        self,
        *,
        api_key: str | None = None,
        model: str | None = None,
        client: genai.Client | None = None,
        rate_limiter: LLMRateLimiter | None = None,
    ) -> None:
        """
        Construct the Gemini client.

        If model is not explicitly supplied, GEMINI_MODEL is used.
        If GEMINI_MODEL is not set, DEFAULT_MODEL is used.
        """

        resolved_api_key = (
            api_key
            or os.getenv("GEMINI_API_KEY")
        )

        if client is not None:
            self._client = client
        else:
            if not resolved_api_key:
                raise ValueError(
                    "GEMINI_API_KEY is not set."
                )

            self._client = genai.Client(
                api_key=resolved_api_key,
            )

        self._model = (
            model
            or os.getenv(
                "GEMINI_MODEL",
                self.DEFAULT_MODEL,
            )
        )

        if isinstance(rate_limiter, LLMRateLimiter):
            self._rate_limiter = rate_limiter
        elif isinstance(rate_limiter, int):
            self._rate_limiter = LLMRateLimiter(
                max_requests_per_minute=rate_limiter
            )
        else:
            self._rate_limiter = LLMRateLimiter(
                max_requests_per_minute=5,
                max_requests_per_day=20,
            )

    @property
    def model(self) -> str:
        """
        Return the configured Gemini model name.
        """

        return self._model

    def generate_structured(
        self,
        *,
        system_prompt: str,
        request: Any,
        response_model: type[Any],
    ) -> Any:
        """
        Generate a structured Gemini response.

        The request object is serialized into deterministic JSON.
        Gemini is instructed to return JSON matching response_model.
        """

        try:
            request_json = request.model_dump_json(
                exclude_none=True,
            )
        except Exception as exc:
            raise RelevanceJudgeResponseError(
                "Failed to serialize the relevance-judge request "
                "before sending it to Gemini."
            ) from exc

        config = types.GenerateContentConfig(
            system_instruction=system_prompt,
            response_mime_type="application/json",
            response_schema=response_model,
        )

        try:
            self._rate_limiter.acquire()

            response = self._client.models.generate_content(
                model=self._model,
                contents=request_json,
                config=config,
            )
        except LLMRateLimitExceeded:
            raise
        except Exception as exc:
            # Preserve the actual provider error. This is important
            # during development because 400/401/403/404/429 errors
            # need to remain distinguishable.
            raise RelevanceJudgeResponseError(
                (
                    "Gemini relevance-judge request failed. "
                    f"model={self._model!r}; "
                    f"error={exc}"
                )
            ) from exc

        # ----------------------------------------------------------
        # Preferred structured response path
        # ----------------------------------------------------------

        parsed = getattr(
            response,
            "parsed",
            None,
        )

        if parsed is not None:
            if isinstance(
                parsed,
                response_model,
            ):
                return parsed

            try:
                return response_model.model_validate(
                    parsed,
                )
            except Exception as exc:
                raise RelevanceJudgeResponseError(
                    "Gemini returned a structured response that "
                    "could not be validated against the expected "
                    "response model."
                ) from exc

        # ----------------------------------------------------------
        # Fallback JSON-text path
        # ----------------------------------------------------------

        response_text = getattr(
            response,
            "text",
            None,
        )

        if not response_text:
            raise RelevanceJudgeResponseError(
                "Gemini returned an empty relevance-judge response."
            )

        try:
            return response_model.model_validate_json(
                response_text,
            )
        except Exception as exc:
            raise RelevanceJudgeResponseError(
                "Gemini returned invalid structured JSON."
            ) from exc
