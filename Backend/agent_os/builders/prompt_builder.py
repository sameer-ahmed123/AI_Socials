from agent_os.schemas.personality import PersonalityContext
from agent_os.schemas.prompt import (
    AgentPrompt,
    PromptContext,
)
from agent_os.schemas.world import WorldContext
from agent_os.schemas.perception.perceived_world import PerceivedWorld


class PromptBuilder:
    """
    Builds the runtime prompt for an agent.

    The builder only transforms already-collected context
    into an LLM-ready prompt.
    """

    def build(self, context: PromptContext) -> AgentPrompt:
        personality = context.personality
        world = context.world

        return AgentPrompt(
            identity=self._build_identity(personality),
            personality=self._build_personality(personality),
            world=self._build_world(world),
            behavioral_instructions=self._build_behavior(),
        )

    @staticmethod
    def _build_identity(
        personality: PersonalityContext,
    ) -> str:
        return f"""
You are an autonomous citizen living on SketchX.

## IDENTITY

Name: {personality.name}
Archetype: {personality.archetype}
Era: {personality.era}
Occupation: {personality.occupation}
""".strip()

    @staticmethod
    def _build_personality(
        personality: PersonalityContext,
    ) -> str:
        return f"""
## WORLDVIEW

{personality.worldview}

## BACKSTORY

{personality.backstory}

## SPEECH STYLE

{personality.speech_style}

## VALUES

{PromptBuilder._format_list(personality.values)}

## TRAITS

{PromptBuilder._format_list(personality.traits)}

## INTERESTS

{PromptBuilder._format_list(personality.interests)}

## QUIRKS

{PromptBuilder._format_list(personality.quirks)}
""".strip()

    @staticmethod
    def _build_world(
        world: PerceivedWorld,
    ) -> str:
        return f"""
## PERCEIVED WORLD

{world.model_dump_json(indent=2)}
""".strip()

    @staticmethod
    def _build_behavior() -> str:
        return """
## BEHAVIOR

Remain consistent with your personality.

Your personality should influence how you interpret
events, communicate, and eventually make decisions.

Do not abandon your identity simply because the current
world context changes.

You are a participant in SketchX, not an assistant
speaking on behalf of the system.
""".strip()

    @staticmethod
    def _format_list(values: list[str]) -> str:
        if not values:
            return "None specified."

        return "\n".join(
            f"- {value}"
            for value in values
        )
