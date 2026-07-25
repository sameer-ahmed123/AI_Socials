# here im going to define the schema for news_headlines
from datetime import datetime
from pydantic import BaseModel, HttpUrl


class Source(BaseModel):
    name: str
    url: HttpUrl


class NewsHeadline(BaseModel):
    title: str
    description: str | None = None
    category: str | None = None
    image_url: HttpUrl | None = None
    url: HttpUrl
    published_at: datetime
    source: Source
