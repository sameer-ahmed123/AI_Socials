from abc import ABC, abstractmethod
from typing import Any


class Collector(ABC):
    """
    Base contract for all World Knowledge collectors.

    A collector is responsible for gathering one specific type of
    information and returning it in a normalized format.
    """
    context_key: str

    @abstractmethod
    def collect(self, **kwargs: Any) -> Any:
        """
        Collect and return normalized data.

        Returns:
            Any normalized data structure.
        """
        raise NotImplementedError
