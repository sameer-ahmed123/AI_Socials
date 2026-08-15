from agent_os.models import Agent
from agent_os.schemas.personality import PersonalityContext


class PersonalityLoader:
    """
    Loads the personality context for an agent.

    This service does not create, modify, or interpret
    personalities. It only retrieves an agent's existing
    personality and prepares it for the runtime.
    """

    def load(self, agent: Agent) -> PersonalityContext:
        personality = agent.personality

        if personality is None:
            raise ValueError(
                f"Agent {agent.id} does not have a personality."
            )

        return PersonalityContext(
            name=personality.name,
            archetype=personality.archetype,
            era=personality.era,
            occupation=personality.occupation,
            worldview=personality.worldview,
            backstory=personality.backstory,
            speech_style=personality.speech_style,
            values=personality.values,
            traits=personality.traits,
            interests=personality.interests,
            quirks=personality.quirks,
            markdown=personality.markdown,
        )
