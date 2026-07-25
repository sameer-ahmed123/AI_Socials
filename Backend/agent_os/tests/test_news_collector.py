from unittest.mock import patch

from django.test import SimpleTestCase

from agent_os.cache.memory_cache import MemoryCache
from agent_os.collectors.news_collector import NewsCollector


class NewsCollectorTests(SimpleTestCase):

    @patch("agent_os.collectors.news_collector.fetch_top_headlines")
    def test_collect_uses_cache_after_first_call(self, mock_fetch):

        mock_fetch.return_value = {
            "articles": []
        }

        cache = MemoryCache()

        collector = NewsCollector(cache)

        collector.collect()
        collector.collect()

        self.assertEqual(
            mock_fetch.call_count,
            1
        )

    @patch("agent_os.collectors.news_collector.fetch_top_headlines")
    def test_collect_returns_same_cached_result(self, mock_fetch):

        mock_fetch.return_value = {
            "articles": []
        }

        cache = MemoryCache()

        collector = NewsCollector(cache)

        first = collector.collect()
        second = collector.collect()

        self.assertEqual(first, second)

    @patch("agent_os.collectors.news_collector.fetch_top_headlines")
    def test_cache_is_created(self, mock_fetch):

        mock_fetch.return_value = {
            "articles": []
        }

        cache = MemoryCache()

        collector = NewsCollector(cache)

        collector.collect()

        self.assertIsNotNone(
            cache.get("news:general")
        )
