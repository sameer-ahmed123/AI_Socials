class RefreshService:
    """
    Orchestrates rebuilding the current WorldContext.
    """

    def __init__(self, builder):
        self.builder = builder

    def refresh(self):
        """
        Rebuild and return the latest WorldContext.
        """

        world = self.builder.build()

        # Future:
        # Persist latest WorldContext
        # Publish refresh events

        return world