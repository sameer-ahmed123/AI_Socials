from __future__ import annotations
from datetime import datetime
from pydantic import BaseModel, Field
from agent_os.schemas.perception.perception_item import (
    PerceptionItem,
)


class PerceivedWorld(BaseModel):
    """
    The subjective world perceived by one agent.

    This contains only the world items that the perception system
    determined deserve the agent's attention.
    """

    timestamp: datetime
    news: list[PerceptionItem] = Field(
        default_factory=list
    )
    trending_topics: list[PerceptionItem] = Field(
        default_factory=list
    )
    popular_posts: list[PerceptionItem] = Field(
        default_factory=list
    )
    suggested_users: list[PerceptionItem] = Field(
        default_factory=list
    )