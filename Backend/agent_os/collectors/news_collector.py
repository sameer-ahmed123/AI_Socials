from agent_os.schemas.news import NewsHeadline, Source
from agent_os.clients.gnews_client import fetch_top_headlines
from agent_os.interfaces.collector import Collector


class NewsCollector(Collector):
    context_key = "news"
    def __init__(self,cache):
        self.cache = cache

    def collect(self, category: str = "general") -> list[NewsHeadline]:
        cache_key  = f"{self.context_key}:{category}"
        cached = self.cache.get(cache_key)
        if cached is not None:
            print("Fetching from cache")
            return cached
        
        headlines: list[NewsHeadline] = []
        response = fetch_top_headlines(category, "en", 5)
        articles = response['articles']
        for item in articles:
            source_data = item.get('source') or {}
            headlines.append(
                NewsHeadline(
                    title=item.get('title'),
                    description=item.get('description'),
                    category=category,
                    image_url=item.get('image'),
                    url=item.get('url'),
                    published_at=item.get('publishedAt'),
                    source=Source(
                        name=source_data.get('name'),
                        url=source_data.get('url')
                    )

                )

            )
        self.cache.set(
            cache_key,
            headlines,
            ttl = 600
        )
        return headlines
