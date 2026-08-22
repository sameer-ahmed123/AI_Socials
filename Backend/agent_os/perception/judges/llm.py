from __future__ import annotations

import json
from typing import Any

from agent_os.perception.judges.base import RelevanceJudge
from agent_os.perception.judges.client import LLMClient
from agent_os.perception.judges.errors import (
    RelevanceJudgeResponseMismatch,
)
from agent_os.perception.judges.schemas import (
    LLMPerceptionItem,
    LLMPerceptionProfile,
    RelevanceJudgeRequest,
    RelevanceJudgeResponse,
)
from agent_os.schemas.perception.perception_item import (
    PerceptionItem,
)
from agent_os.schemas.perception.perception_profile import (
    PerceptionProfile,
)
from agent_os.schemas.perception.relevance_judgment import (
    RelevanceJudgment,
)


class LLMRelevanceJudge(RelevanceJudge):
    """
    Relevance judge backed by a structured LLM client.

    The judge is provider-agnostic. It is responsible for:

    1. Converting domain objects into the controlled LLM request.
    2. Supplying the relevance-judging instructions.
    3. Invoking an abstract LLMClient.
    4. Validating the returned response.
    5. Converting the response into domain RelevanceJudgment objects.

    Provider-specific concerns belong in the provider implementation.
    """

    SYSTEM_PROMPT = """
You are the Perception Relevance Judge for SketchX.

Your ONLY task is to determine whether each supplied world item
deserves the attention of the supplied agent.

You are judging ATTENTION RELEVANCE, not meaning, truth,
importance to society, or what the agent should do.

Do not:
- generate an agent response
- recommend actions
- make decisions for the agent
- interpret what the agent should believe
- invent information
- modify the supplied world items

Evaluate every supplied world item independently.

For every input item, return exactly one judgment.

The score must represent how strongly the item deserves
the attention of this particular agent:

0.00 = no meaningful reason for this agent to notice it
1.00 = extremely strong reason for this agent to notice it

Return only the requested structured output.
""".strip()

    def __init__(
        self,
        client: LLMClient,
    ) -> None:
        self._client = client

    def judge(
        self,
        *,
        profile: PerceptionProfile,
        items: list[PerceptionItem],
    ) -> list[RelevanceJudgment]:
        """
        Judge a batch of world items for one agent.

        Empty batches do not result in an LLM call.
        """

        if not items:
            return []

        request = self._build_request(
            profile=profile,
            items=items,
        )

        response = self._client.generate_structured(
            system_prompt=self.SYSTEM_PROMPT,
            request=request,
            response_model=RelevanceJudgeResponse,
        )

        if not isinstance(response, RelevanceJudgeResponse):
            raise RelevanceJudgeResponseMismatch(
                "LLM client returned an unexpected response type."
            )

        return self._validate_response(
            items=items,
            response=response,
        )

    @classmethod
    def _build_request(
        cls,
        *,
        profile: PerceptionProfile,
        items: list[PerceptionItem],
    ) -> RelevanceJudgeRequest:
        """
        Convert domain objects into the controlled LLM request schema.
        """

        return RelevanceJudgeRequest(
            profile=LLMPerceptionProfile(
                archetype=profile.archetype,
                occupation=profile.occupation,
                worldview=profile.worldview,
                values=list(profile.values),
                interests=list(profile.interests),
                traits=list(profile.traits),
            ),
            items=[
                cls._build_llm_item(item)
                for item in items
            ],
        )

    @staticmethod
    def _build_llm_item(
        item: PerceptionItem,
    ) -> LLMPerceptionItem:
        """
        Convert one domain perception item into an LLM-safe
        textual representation.
        """

        return LLMPerceptionItem(
            id=item.id,
            category=item.category,
            content=LLMRelevanceJudge._serialize_content(
                item.content
            ),
        )

    @staticmethod
    def _serialize_content(
        content: Any,
    ) -> str:
        """
        Convert arbitrary world content into deterministic text.

        Serialization only.

        No interpretation, summarization, or modification is performed.
        """

        if content is None:
            return ""

        if isinstance(content, str):
            return content.strip()

        if isinstance(content, (dict, list)):
            return json.dumps(
                content,
                ensure_ascii=False,
                sort_keys=True,
                default=str,
            )

        return str(content)

    @staticmethod
    def _validate_response(
        *,
        items: list[PerceptionItem],
        response: RelevanceJudgeResponse,
    ) -> list[RelevanceJudgment]:
        """
        Validate and convert an LLM response into domain
        RelevanceJudgment objects.

        The LLM must return:

        - exactly one judgment per supplied item
        - no duplicate item IDs
        - no unknown item IDs
        - no missing item IDs

        The returned judgments are normalized to the same
        order as the original input items.
        """

        expected_ids = [
            item.id
            for item in items
        ]

        expected_id_set = set(expected_ids)

        returned_ids = [
            judgment.item_id
            for judgment in response.judgments
        ]

        returned_id_set = set(returned_ids)

        if len(returned_ids) != len(expected_ids):
            raise RelevanceJudgeResponseMismatch(
                "LLM relevance response contained an unexpected "
                "number of judgments. "
                f"Expected {len(expected_ids)}, "
                f"received {len(returned_ids)}."
            )

        if len(returned_id_set) != len(returned_ids):
            raise RelevanceJudgeResponseMismatch(
                "LLM relevance response contains duplicate item IDs."
            )

        unknown_ids = returned_id_set - expected_id_set

        if unknown_ids:
            raise RelevanceJudgeResponseMismatch(
                "LLM relevance response contains unknown item IDs: "
                f"{sorted(unknown_ids)}"
            )

        missing_ids = expected_id_set - returned_id_set

        if missing_ids:
            raise RelevanceJudgeResponseMismatch(
                "LLM relevance response is missing item IDs: "
                f"{sorted(missing_ids)}"
            )

        judgments_by_id = {
            judgment.item_id: judgment
            for judgment in response.judgments
        }

        return [
            RelevanceJudgment(
                item_id=item.id,
                relevant=judgments_by_id[item.id].relevant,
                score=judgments_by_id[item.id].score,
                reason=judgments_by_id[item.id].reason,
            )
            for item in items
        ]