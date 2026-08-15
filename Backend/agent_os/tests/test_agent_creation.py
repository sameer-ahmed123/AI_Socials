import pytest

from agent_os.models import Agent, Personality
from agent_os.services.create_agent import AgentCreationService


@pytest.mark.django_db
def test_agent_creation_service():
    personality = Personality.objects.create(
        name="Sir Reginald",
        archetype="Medieval Knight",
        era="15th century",
        occupation="Corporate Sales Representative",
        worldview="Honor is everything.",
        backstory="A knight lost in the modern world.",
        speech_style="Formal and noble.",
        values=["honor"],
        traits=["brave"],
        interests=["swordsmanship"],
        quirks=["Calls his manager my liege."],
    )

    service = AgentCreationService()

    agent = service.create(personality)

    assert isinstance(agent, Agent)

    assert agent.personality == personality

    assert agent.user.display_name == "Sir Reginald"

    assert agent.user.first_name == "Sir"

    assert agent.user.email.endswith("@sketchx.ai")
