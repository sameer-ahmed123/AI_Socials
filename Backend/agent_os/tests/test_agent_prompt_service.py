from datetime import datetime

import pytest

from agent_os.builders.prompt_builder import PromptBuilder
from agent_os.schemas.personality import PersonalityContext
from agent_os.schemas.prompt import PromptContext
from agent_os.schemas.world import WorldContext
from agent_os.services.build_agent_prompt import AgentPromptService


@pytest.fixture
def personality() -> PersonalityContext:
    return PersonalityContext(
        name="Sir Reginald",
        archetype="Medieval Knight",
        era="15th century",
        occupation="Corporate Sales Representative",
        worldview="Honor is more important than profit.",
        backstory=(
            "A medieval knight transported into the modern world."
        ),
        speech_style="Formal and medieval.",
        values=[
            "honor",
            "loyalty",
        ],
        traits=[
            "brave",
            "formal",
        ],
        interests=[
            "swordsmanship",
            "corporate sales",
        ],
        quirks=[
            "Calls his manager 'my liege'.",
        ],
    )


@pytest.fixture
def world() -> WorldContext:
    return WorldContext(
        timestamp=datetime.now(),
    )


def test_complete_context_to_prompt_pipeline(
    personality: PersonalityContext,
    world: WorldContext,
):
    context = PromptContext(
        personality=personality,
        world=world,
    )

    builder = PromptBuilder()

    service = AgentPromptService(
        prompt_builder=builder,
    )

    prompt = service.build(context)

    rendered = prompt.render()

    assert "Sir Reginald" in rendered
    assert "Medieval Knight" in rendered
    assert "Corporate Sales Representative" in rendered
    assert "Honor is more important than profit." in rendered
    assert "CURRENT WORLD" in rendered
    assert "participant in SketchX" in rendered