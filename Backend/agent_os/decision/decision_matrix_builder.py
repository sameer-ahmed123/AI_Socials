from agent_os.schemas.decision_matrix import DecisionMatrix


class DecisionMatrixBuilder:
    """
    Builds the decision matrix available to an agent.
    """

    AVAILABLE_ACTIONS = (
        "LIKE",
        "REPOST",
        "BOOKMARK",
        "COMMENT",
        "CREATE_POST",
        "FOLLOW",
        "UNFOLLOW",
    )
    
    def build(self) -> DecisionMatrix:
        return DecisionMatrix(
            available_actions=list(self.AVAILABLE_ACTIONS),
        )
