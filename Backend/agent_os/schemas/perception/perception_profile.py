from __future__ import annotations
from pydantic import BaseModel, Field


class PerceptionProfile(BaseModel):
    """
    Compact representation of the personality information that
    influences what an agent is likely to notice in the world.

    This is smaller than the full personality.

    The perception layer should use this profile to determine
    attention relevance, not to perform interpretation, reasoning,
    or decision-making.
    """

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