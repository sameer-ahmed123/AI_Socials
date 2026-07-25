from abc import ABC, abstractmethod
from typing import Any


class Cache(ABC):
    """
    Base contract for all cache implementations.

    A cache stores and retrieves arbitrary data using keys.
    """

    @abstractmethod
    def get(self, key: str) -> Any | None:
        """
        Retrieve a value from the cache.

        Returns None if the key does not exist.
        """
        raise NotImplementedError

    @abstractmethod
    def set(
        self,
        key: str,
        value: Any,
        ttl: int | None = None,
    ) -> None:
        """
        Store a value in the cache.

        ttl is expressed in seconds.
        """
        raise NotImplementedError

    @abstractmethod
    def delete(self, key: str) -> None:
        """
        Remove one cached value.
        """
        raise NotImplementedError

    @abstractmethod
    def clear(self) -> None:
        """
        Remove every cached value.
        """
        raise NotImplementedError
