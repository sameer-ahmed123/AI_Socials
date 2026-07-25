from datetime import datetime
from agent_os.interfaces.builder import Builder
from agent_os.schemas.world import WorldContext


class WorldBuilder(Builder):
    def __init__(self, collectors):
        self.collectors = collectors

    def build(self) -> WorldContext:

        world = WorldContext(
            timestamp=datetime.now()
        )
        for collector in self.collectors:
            context_key = collector.context_key
            normalized_data = collector.collect()

            setattr(world, context_key, normalized_data)

        return world
