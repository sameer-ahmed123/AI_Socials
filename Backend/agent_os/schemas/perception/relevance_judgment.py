from __future__ import annotations
from pydantic import BaseModel, Field


class RelevanceJudgment(BaseModel):
    """
    The result of the perception relevance judge.

    This represents whether a world item deserves the attention of
    a particular agent.
    """

    item_id: str
    relevant: bool
    score: float = Field(ge=0.0, le=1.0)
    reason: str