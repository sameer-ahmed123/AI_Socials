from __future__ import annotations
import re
from agent_os.perception.judges.base import (
    RelevanceJudge,
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


class FakeRelevanceJudge(RelevanceJudge):
    """
    Deterministic local relevance judge used during development.

    This implementation intentionally uses simple lexical matching.
    It exists to validate the perception architecture before the
    external LLM judge is introduced.

    It is NOT intended to be a production semantic relevance system.
    """

    def judge(
        self,
        *,
        profile: PerceptionProfile,
        items: list[PerceptionItem],
    ) -> list[RelevanceJudgment]:

        profile_text = self._build_profile_text(
            profile
        )

        results: list[RelevanceJudgment] = []

        for item in items:

            item_text = self._extract_item_text(
                item
            )

            score, matches = (
                self._calculate_score(
                    profile_text=profile_text,
                    item_text=item_text,
                )
            )

            relevant = score >= 0.30

            if matches:
                reason = (
                    "Matched perception signals: "
                    + ", ".join(matches)
                )
            else:
                reason = (
                    "No perception profile signals matched."
                )

            results.append(
                RelevanceJudgment(
                    item_id=item.id,
                    relevant=relevant,
                    score=score,
                    reason=reason,
                )
            )

        return results

    @staticmethod
    def _build_profile_text(
        profile: PerceptionProfile,
    ) -> str:

        values = [
            profile.archetype,
            profile.occupation,
            profile.worldview,
            *profile.values,
            *profile.interests,
            *profile.traits,
        ]

        return " ".join(
            value
            for value in values
            if value
        ).lower()

    @staticmethod
    def _extract_item_text(
        item: PerceptionItem,
    ) -> str:

        if isinstance(
            item.content,
            dict,
        ):
            return " ".join(
                str(value)
                for value in item.content.values()
            ).lower()

        return str(
            item.content
        ).lower()

    @staticmethod
    def _calculate_score(
        *,
        profile_text: str,
        item_text: str,
    ) -> tuple[float, list[str]]:

        profile_words = set(
            re.findall(
                r"\b[a-zA-Z0-9]+\b",
                profile_text,
            )
        )

        item_words = set(
            re.findall(
                r"\b[a-zA-Z0-9]+\b",
                item_text,
            )
        )

        if not profile_words or not item_words:
            return 0.0, []

        matches = (
            profile_words
            & item_words
        )

        if not matches:
            return 0.0, []

        score = min(
            len(matches) / 5.0,
            1.0,
        )

        return (
            score,
            sorted(matches),
        )
