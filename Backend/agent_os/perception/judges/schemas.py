from __future__ import annotations

from pydantic import BaseModel, Field


class LLMPerceptionProfile(BaseModel):
    archetype: str
    occupation: str
    worldview: str

    values: list[str] = Field(
        default_factory=list
    )

    interests: list[str] = Field(
        default_factory=list
    )

    traits: list[str] = Field(
        default_factory=list
    )


class LLMPerceptionItem(BaseModel):
    id: str
    category: str
    content: str


class RelevanceJudgeRequest(BaseModel):
    """
    Batch request supplied to the external LLM.

    One request represents one agent and multiple world items.
    """

    profile: LLMPerceptionProfile
    items: list[LLMPerceptionItem]


class LLMRelevanceResult(BaseModel):
    item_id: str

    relevant: bool

    score: float = Field(
        ge=0.0,
        le=1.0,
    )

    reason: str


class RelevanceJudgeResponse(BaseModel):
    """
    Structured batch response returned by the external LLM.
    """

    judgments: list[LLMRelevanceResult]