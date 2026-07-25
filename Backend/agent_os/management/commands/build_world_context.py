from django.core.management.base import BaseCommand
from agent_os.services.refresh_service import RefreshService
from agent_os.builders.world_builder import WorldBuilder
from agent_os.collectors.news_collector import NewsCollector
from agent_os.cache.memory_cache import MemoryCache


class Command(BaseCommand):
    help = "Build the current World Context."
    

    def handle(self, *args, **options):
        cache = MemoryCache()
        collectors = [
            NewsCollector(cache=cache),
        ]

        builder = WorldBuilder(collectors)
        refresh_service = RefreshService(builder)
        world = refresh_service.refresh()

        self.stdout.write(
            self.style.SUCCESS(
                "World Context built successfully."
            )
        )

        self.stdout.write(str(world.model_dump()))
