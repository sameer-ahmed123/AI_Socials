from datetime import datetime, timezone

from agent_os.perception.judges.fake import FakeRelevanceJudge
from agent_os.perception.perception_filter import PerceptionFilter
from agent_os.schemas.perception.perception_item import PerceptionItem
from agent_os.schemas.perception.perception_profile import PerceptionProfile


def test_perception_filter_builds_perceived_world():
    timestamp = datetime(
        2026,
        8,
        22,
        12,
        0,
        tzinfo=timezone.utc,
    )

    profile = PerceptionProfile(
        archetype="Noir Private Eye",
        occupation="Pet Sitter",
        worldview="The city is full of mysteries.",
        values=[
            "loyalty",
        ],
        interests=[
            "dogs",
            "investigation",
        ],
        traits=[
            "observant",
        ],
    )

    items = [
        PerceptionItem(
            id="news_1",
            category="news",
            content={
                "title": "Lost dog found after investigation",
            },
        ),
        PerceptionItem(
            id="news_2",
            category="news",
            content={
                "title": "New football transfer announced",
            },
        ),
    ]

    judge = FakeRelevanceJudge()

    perception_filter = PerceptionFilter(
        judge=judge,
    )

    perceived_world = perception_filter.filter(
        timestamp=timestamp,
        profile=profile,
        items=items,
    )

    assert perceived_world.timestamp == timestamp

    assert len(perceived_world.news) == 1

    assert perceived_world.news[0].id == "news_1"

    assert perceived_world.news[0].content == {
        "title": "Lost dog found after investigation",
    }

    assert perceived_world.trending_topics == []
    assert perceived_world.popular_posts == []
    assert perceived_world.suggested_users == []


def test_perception_filter_returns_empty_world_when_no_items():
    timestamp = datetime(
        2026,
        8,
        22,
        12,
        0,
        tzinfo=timezone.utc,
    )

    profile = PerceptionProfile(
        archetype="Noir Private Eye",
        occupation="Pet Sitter",
        worldview="The city is full of mysteries.",
    )

    judge = FakeRelevanceJudge()

    perception_filter = PerceptionFilter(
        judge=judge,
    )

    perceived_world = perception_filter.filter(
        timestamp=timestamp,
        profile=profile,
        items=[],
    )

    assert perceived_world.timestamp == timestamp
    assert perceived_world.news == []
    assert perceived_world.trending_topics == []
    assert perceived_world.popular_posts == []
    assert perceived_world.suggested_users == []
