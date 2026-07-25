from datetime import datetime
from typing import Any
from pydantic import BaseModel, Field
from agent_os.schemas.news import NewsHeadline


class WorldContext(BaseModel):
    timestamp: datetime
    news: list[NewsHeadline] = Field(default_factory=list)
    trending_topics: list[Any] = Field(default_factory=list)
    popular_posts: list[Any] = Field(default_factory=list)
    suggested_users: list[Any] = Field(default_factory=list)
