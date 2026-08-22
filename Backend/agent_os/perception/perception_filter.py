from __future__ import annotations

from collections import defaultdict
from datetime import datetime

from agent_os.perception.judges.base import RelevanceJudge
from agent_os.schemas.perception.perceived_world import PerceivedWorld
from agent_os.schemas.perception.perception_item import PerceptionItem
from agent_os.schemas.perception.perception_profile import PerceptionProfile
from agent_os.schemas.world import WorldContext


class PerceptionFilter:
    """
    Orchestrates the perception pipeline.

    The PerceptionFilter does NOT determine semantic relevance itself.

    It:
        1. Converts WorldContext entries into PerceptionItems.
        2. Delegates relevance judgment to a RelevanceJudge.
        3. Keeps only items judged relevant.
        4. Constructs the agent's PerceivedWorld.

    The actual relevance logic belongs to the RelevanceJudge.
    """

    def __init__(
        self,
        judge: RelevanceJudge,
    ):
        self.judge = judge

    def filter(
        self,
        *,
        world_context: WorldContext,
        profile: PerceptionProfile,
    ) -> PerceivedWorld:
        """
        Run the perception pipeline for one agent.

        Args:
            world_context:
                Objective world snapshot shared by all agents.

            profile:
                Compact representation of the agent's
                perception/attention profile.

        Returns:
            A PerceivedWorld containing only items judged relevant.
        """

        items = self._build_perception_items(
            world_context
        )

        if not items:
            return PerceivedWorld(
                timestamp=world_context.timestamp,
            )

        judgments = self.judge.judge(
            profile=profile,
            items=items,
        )

        relevant_item_ids = {
            judgment.item_id
            for judgment in judgments
            if judgment.relevant
        }

        perceived_items = [
            item
            for item in items
            if item.id in relevant_item_ids
        ]

        return self._build_perceived_world(
            timestamp=world_context.timestamp,
            items=perceived_items,
        )

    @staticmethod
    def _build_perception_items(
        world_context: WorldContext,
    ) -> list[PerceptionItem]:
        """
        Convert the objective WorldContext into the generic
        PerceptionItem representation used by the perception layer.
        """

        items: list[PerceptionItem] = []

        categories = (
            "news",
            "trending_topics",
            "popular_posts",
            "suggested_users",
        )

        for category in categories:
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

    @staticmethod
    def _build_perceived_world(
        *,
        timestamp: datetime,
        items: list[PerceptionItem],
    ) -> PerceivedWorld:
        """
        Organize relevant perception items into their
        WorldContext categories.
        """

        grouped: dict[
            str,
            list[PerceptionItem],
        ] = defaultdict(list)

        for item in items:
            grouped[item.category].append(item)

        return PerceivedWorld(
            timestamp=timestamp,
            news=grouped.get(
                "news",
                [],
            ),
            trending_topics=grouped.get(
                "trending_topics",
                [],
            ),
            popular_posts=grouped.get(
                "popular_posts",
                [],
            ),
            suggested_users=grouped.get(
                "suggested_users",
                [],
            ),
        )
