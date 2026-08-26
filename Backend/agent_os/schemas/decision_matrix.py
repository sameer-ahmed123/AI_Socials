from pydantic import BaseModel, Field


class DecisionMatrix(BaseModel):
    """
    Defines the actions currently available to an agent.

    The DecisionMatrix does not decide which action the agent should
    take. It only defines the action space that can be supplied to
    the decision-making prompt.
    """

    available_actions: list[str] = Field(
        default_factory=list,
    )
