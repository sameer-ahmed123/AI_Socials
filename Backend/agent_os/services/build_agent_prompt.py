from agent_os.builders.prompt_builder import PromptBuilder
from agent_os.schemas.prompt import AgentPrompt, PromptContext


class AgentPromptService:
    """
    Orchestrates construction of an agent's runtime prompt.

    This service is responsible for assembling the required
    context and passing it to the PromptBuilder.

    It does not call the LLM.
    """

    def __init__(self, prompt_builder: PromptBuilder):
        self.prompt_builder = prompt_builder

    def build(
        self,
        context: PromptContext,
    ) -> AgentPrompt:
        return self.prompt_builder.build(context)
