from typing import Any
from pydantic import BaseModel, Field
from agent_os.schemas.personality import PersonalityContext
from agent_os.schemas.perception.perceived_world import PerceivedWorld
from agent_os.schemas.decision_matrix import DecisionMatrix


class PromptContext(BaseModel):
    """
    Runtime context provided to the PromptBuilder.

    This schema represents the information the agent is
    currently allowed to use when constructing its prompt.
    """

    personality: PersonalityContext
    world: PerceivedWorld
    decision_matrix: DecisionMatrix


class AgentPrompt(BaseModel):
    """
    Structured prompt produced by the PromptBuilder.
    """

    identity: str

    personality: str

    world: str
    decision_matrix: str

    behavioral_instructions: str

    def render(self) -> str:
        """
        Convert the structured prompt into the final
        LLM-ready prompt.
        """

        return "\n\n".join(
            [
                self.identity,
                self.personality,
                self.world,
                self.decision_matrix,
                self.behavioral_instructions,
            ]
        )
