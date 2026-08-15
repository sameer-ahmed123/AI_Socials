# here im going to define the schema for news_headlines
from datetime import datetime
from pydantic import BaseModel


class trend(BaseModel):
    hashtag: str
    post_count: int
