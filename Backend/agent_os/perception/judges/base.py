from __future__ import annotations
from abc import ABC, abstractmethod

from agent_os.schemas.perception.perception_item import (
    PerceptionItem,
)
from agent_os.schemas.perception.perception_profile import (
    PerceptionProfile,
)
from agent_os.schemas.perception.relevance_judgment import (
    RelevanceJudgment,
)


class RelevanceJudge(ABC):
    """
    Interface for judging whether world items deserve an agent's
    attention.

    Implementations may use deterministic logic, an external LLM,
    or another future relevance mechanism.
    """

    @abstractmethod
    def judge(
        self,
        *,
        profile: PerceptionProfile,
        items: list[PerceptionItem],
    ) -> list[RelevanceJudgment]:
        """
        Judge the relevance of multiple world items for one agent.
        """
        raise NotImplementedError