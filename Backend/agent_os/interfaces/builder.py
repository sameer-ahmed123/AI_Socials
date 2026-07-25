from abc import ABC, abstractmethod


class Builder(ABC):
    """
    Base contract for all builders.

    Builders combine multiple normalized data sources into a
    higher-level object.
    """

    @abstractmethod
    def build(self):
        """
        Build and return an object.

        Returns:
            Built object.
        """
        raise NotImplementedError