from __future__ import annotations

from typing import Any, Protocol


class LLMClient(Protocol):
    """
    Provider-agnostic interface for structured LLM generation.

    Concrete implementations may use Gemini, OpenAI, Anthropic,
    a local model, or a fake test implementation.
    """

    def generate_structured(
        self,
        *,
        system_prompt: str,
        request: Any,
        response_model: type[Any],
    ) -> Any:
        """
        Generate a structured response from an LLM.

        Args:
            system_prompt:
                System-level instructions for the model.

            request:
                Structured request payload.

            response_model:
                Expected response model/type.

        Returns:
            An instance of response_model.
        """
        ...