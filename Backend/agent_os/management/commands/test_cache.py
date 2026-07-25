from django.core.management.base import BaseCommand

from agent_os.cache.memory_cache import MemoryCache
from agent_os.collectors.news_collector import NewsCollector


class Command(BaseCommand):
    help = "Test MemoryCache"

    def handle(self, *args, **options):

        cache = MemoryCache()
        collector = NewsCollector(cache)

        print("------ First Call ------")
        collector.collect()

        print("------ Second Call ------")
        collector.collect()

        print("------ Third Call ------")
        collector.collect()
