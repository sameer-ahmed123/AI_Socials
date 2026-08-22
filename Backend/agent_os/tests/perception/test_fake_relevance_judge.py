from agent_os.perception.judges.fake import (
    FakeRelevanceJudge,
)
from agent_os.schemas.perception.perception_item import (
    PerceptionItem,
)
from agent_os.schemas.perception.perception_profile import (
    PerceptionProfile,
)


def test_fake_judge_returns_one_judgment_per_item():

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
                "title": "Lost dog found after investigation"
            },
        ),
        PerceptionItem(
            id="news_2",
            category="news",
            content={
                "title": "New football transfer announced"
            },
        ),
    ]

    judge = FakeRelevanceJudge()

    judgments = judge.judge(
        profile=profile,
        items=items,
    )

    assert len(judgments) == 2

    assert judgments[0].item_id == "news_1"
    assert judgments[1].item_id == "news_2"
