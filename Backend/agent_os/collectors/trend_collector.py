from agent_os.schemas.trends import Trend
from posts.services.trending_service import get_trending_hashtags
from agent_os.interfaces.collector import Collector


class TrendCollector(Collector):
    context_key = "trending_topics"

    def __init__(self, cache):
        self.cache = cache

    def collect(self, **kwargs) -> list[Trend]:
        cache_key = self.context_key
        cached = self.cache.get(cache_key)

        if cached is not None:
            print("Fetching from cache")
            return cached

        system_trends: list[Trend] = []
        trends = get_trending_hashtags()
        for t in trends:
            system_trends.append(
                Trend(
                    hashtag=t.name,
                    post_count=t.post_count
                )
            )

        self.cache.set(
            cache_key,
            system_trends,
            ttl=600
        )
        return system_trends
