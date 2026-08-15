from datetime import datetime

import pytest

from agent_os.builders.prompt_builder import PromptBuilder
from agent_os.schemas.personality import PersonalityContext
from agent_os.schemas.prompt import AgentPrompt, PromptContext
from agent_os.schemas.world import WorldContext


@pytest.fixture
def personality_context() -> PersonalityContext:
    return PersonalityContext(
        name="Sir Reginald",
        archetype="Medieval Knight",
        era="15th century",
        occupation="Corporate Sales Representative",
        worldview="Honor and loyalty are the foundations of society.",
        backstory=(
            "A medieval knight mysteriously transported "
            "into the modern world."
        ),
        speech_style="Formal, noble, slightly confused by modern technology.",
        values=[
            "honor",
            "loyalty",
        ],
        traits=[
            "brave",
            "formal",
            "confused",
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
def world_context() -> WorldContext:
    return WorldContext(
        timestamp=datetime.now(),
    )


@pytest.fixture
def prompt_context(
    personality_context: PersonalityContext,
    world_context: WorldContext,
) -> PromptContext:
    return PromptContext(
        personality=personality_context,
        world=world_context,
    )


def test_build_returns_agent_prompt(
    prompt_context: PromptContext,
):
    builder = PromptBuilder()

    result = builder.build(prompt_context)

    assert isinstance(result, AgentPrompt)


def test_build_contains_identity(
    prompt_context: PromptContext,
):
    builder = PromptBuilder()

    result = builder.build(prompt_context)

    assert "Sir Reginald" in result.identity
    assert "Medieval Knight" in result.identity
    assert "15th century" in result.identity
    assert "Corporate Sales Representative" in result.identity


def test_build_contains_personality(
    prompt_context: PromptContext,
):
    builder = PromptBuilder()

    result = builder.build(prompt_context)

    assert "Honor and loyalty" in result.personality
    assert "A medieval knight" in result.personality
    assert "formal" in result.personality
    assert "swordsmanship" in result.personality
    assert "manager" in result.personality
    assert "my liege" in result.personality


def test_build_contains_world(
    prompt_context: PromptContext,
):
    builder = PromptBuilder()

    result = builder.build(prompt_context)

    assert "CURRENT WORLD" in result.world
    assert "timestamp" in result.world


def test_build_contains_behavioral_instructions(
    prompt_context: PromptContext,
):
    builder = PromptBuilder()

    result = builder.build(prompt_context)

    assert "Remain consistent with your personality." in (
        result.behavioral_instructions
    )

    assert "participant in SketchX" in (
        result.behavioral_instructions
    )


def test_render_combines_all_sections(
    prompt_context: PromptContext,
):
    builder = PromptBuilder()

    result = builder.build(prompt_context)

    rendered = result.render()

    assert result.identity in rendered
    assert result.personality in rendered
    assert result.world in rendered
    assert result.behavioral_instructions in rendered


def test_empty_personality_lists_are_handled(
    world_context: WorldContext,
):
    personality = PersonalityContext(
        name="Unknown Agent",
        archetype="Unknown",
        era="Unknown",
        occupation="Unknown",
        worldview="",
        backstory="",
        speech_style="",
        values=[],
        traits=[],
        interests=[],
        quirks=[],
    )

    context = PromptContext(
        personality=personality,
        world=world_context,
    )

    builder = PromptBuilder()

    result = builder.build(context)

    assert "None specified." in result.personality


def test_empty_world_is_serialized(
    personality_context: PersonalityContext,
):
    world = WorldContext(
        timestamp=datetime.now(),
    )

    context = PromptContext(
        personality=personality_context,
        world=world,
    )

    builder = PromptBuilder()

    result = builder.build(context)

    assert result.world
    assert "CURRENT WORLD" in result.world