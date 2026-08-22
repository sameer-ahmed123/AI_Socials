from __future__ import annotations

from agent_os.schemas.perception.perception_item import (
    PerceptionItem,
)
from agent_os.schemas.world import WorldContext


class WorldContextNormalizer:
    """
    Converts the objective WorldContext into the normalized item
    representation consumed by the perception system.

    This class performs no relevance judgment.

    """

    CATEGORY_FIELDS = (
        "news",
        "trending_topics",
        "popular_posts",
        "suggested_users",
    )

    @classmethod
    def normalize(
        cls,
        world_context: WorldContext,
    ) -> list[PerceptionItem]:
        """
        Convert all supported WorldContext categories into
        normalized PerceptionItems.
        """

        items: list[PerceptionItem] = []

        for category in cls.CATEGORY_FIELDS:
            values = getattr(
                world_context,
                category,
                [],
            )

            for index, content in enumerate(values):
                items.append(
                    PerceptionItem(
                        id=f"{category}:{index}",
                        category=category,
                        content=content,
                    )
                )

        return items
