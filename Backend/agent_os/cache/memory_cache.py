from datetime import datetime, timedelta
from typing import Any

from agent_os.interfaces.cache import Cache


class MemoryCache(Cache):
    """
    Simple in-memory cache implementation.

    Stores values inside a Python dictionary.
    """

    def __init__(self):
        self._cache: dict[str, dict[str, Any]] = {}

    def get(self, key: str) -> Any | None:
        item = self._cache.get(key)

        if item is None:
            return None

        expires_at = item["expires_at"]

        if expires_at is not None and datetime.now() >= expires_at:
            self.delete(key)
            return None

        return item["value"]

    def set(
        self,
        key: str,
        value: Any,
        ttl: int | None = None,
    ) -> None:

        expires_at = (
            datetime.now() + timedelta(seconds=ttl)
            if ttl is not None
            else None
        )

        self._cache[key] = {
            "value": value,
            "expires_at": expires_at,
        }

    def delete(self, key: str) -> None:
        self._cache.pop(key, None)

    def clear(self) -> None:
        self._cache.clear()
