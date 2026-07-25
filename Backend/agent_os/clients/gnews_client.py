import logging
import os
from typing import Any

import requests
GNEWS_BASE_URL = "https://gnews.io/api/v4"
GNEWS_API_KEY = os.environ.get("GNEWS_API_KEY")

logger = logging.getLogger(__name__)


def fetch_top_headlines(
    category: str = "general",
    language: str = "en",
    limit: int = 10,
) -> dict[str, Any]:
    print("Fetching from GNews")

    if not GNEWS_API_KEY:
        raise RuntimeError("GNEWS_API_KEY is missing.")

    params = {
        "category": category,
        "lang": language,
        "max": limit,
        "apikey": GNEWS_API_KEY,
    }

    response = requests.get(
        f"{GNEWS_BASE_URL}/top-headlines",
        params=params,
        timeout=(3.05, 15),
    )

    response.raise_for_status()
    data = response.json()
    return data
