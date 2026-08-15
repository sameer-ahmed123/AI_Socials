from django.core.management.base import BaseCommand

from agent_os.collectors.trend_collector import TrendCollector
from agent_os.cache.memory_cache import MemoryCache
from agent_os.collectors.news_collector import NewsCollector


class Command(BaseCommand):
    help = "Test MemoryCache"

    def handle(self, *args, **options):

        cache = MemoryCache()
        collector = NewsCollector(cache)
        collector2 = TrendCollector(cache)

        print("------ First Call ------")
        collector.collect()
        collector2.collect()

        print("------ Second Call ------")
        collector.collect()
        collector2.collect()

        print("------ Third Call ------")
        collector.collect()
        collector2.collect()
