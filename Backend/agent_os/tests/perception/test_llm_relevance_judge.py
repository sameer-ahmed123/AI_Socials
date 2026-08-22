from agent_os.perception.judges.llm import (
    LLMRelevanceJudge,
)
from agent_os.perception.judges.schemas import (
    LLMRelevanceResult,
    RelevanceJudgeResponse,
)
from agent_os.schemas.perception.perception_item import (
    PerceptionItem,
)
from agent_os.schemas.perception.perception_profile import (
    PerceptionProfile,
)


def test_build_request_preserves_profile_and_item_ids():
    profile = PerceptionProfile(
        archetype="Noir Private Eye",
        occupation="Pet Sitter",
        worldview="The city is full of mysteries.",
        values=["loyalty"],
        interests=["dogs", "investigation"],
        traits=["observant"],
    )

    items = [
        PerceptionItem(
            id="news:0",
            category="news",
            content={
                "title": "Lost dog found",
            },
        ),
        PerceptionItem(
            id="news:1",
            category="news",
            content={
                "title": "Football transfer",
            },
        ),
    ]

    request = LLMRelevanceJudge._build_request(
        profile=profile,
        items=items,
    )

    assert request.profile.archetype == "Noir Private Eye"
    assert request.profile.occupation == "Pet Sitter"

    assert [item.id for item in request.items] == [
        "news:0",
        "news:1",
    ]


def test_validate_response_returns_domain_judgments():
    items = [
        PerceptionItem(
            id="news:0",
            category="news",
            content="Lost dog found",
        ),
        PerceptionItem(
            id="news:1",
            category="news",
            content="Football transfer",
        ),
    ]

    response = RelevanceJudgeResponse(
        judgments=[
            LLMRelevanceResult(
                item_id="news:0",
                relevant=True,
                score=0.9,
                reason="Strong connection to dogs.",
            ),
            LLMRelevanceResult(
                item_id="news:1",
                relevant=False,
                score=0.1,
                reason="No meaningful connection.",
            ),
        ]
    )

    judgments = LLMRelevanceJudge._validate_response(
        items=items,
        response=response,
    )

    assert len(judgments) == 2
    assert judgments[0].item_id == "news:0"
    assert judgments[0].relevant is True
    assert judgments[0].score == 0.9


def test_validate_response_rejects_missing_item():
    items = [
        PerceptionItem(
            id="news:0",
            category="news",
            content="Dog found",
        ),
        PerceptionItem(
            id="news:1",
            category="news",
            content="Football transfer",
        ),
    ]

    response = RelevanceJudgeResponse(
        judgments=[
            LLMRelevanceResult(
                item_id="news:0",
                relevant=True,
                score=0.9,
                reason="Relevant.",
            ),
        ]
    )

    try:
        LLMRelevanceJudge._validate_response(
            items=items,
            response=response,
        )
    except ValueError as exc:
        assert "unexpected number" in str(exc)
    else:
        raise AssertionError(
            "Expected validation to fail."
        )
