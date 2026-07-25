from agent_os.interfaces.collector import Collector
from agent_os.interfaces.cache import Cache


class FakeCollector(Collector):
    context_key = "news"

    def collect(self):
        return ["fake-news-1", "fake-news-2"]


class FakeCache(Cache):
    def __init__(self):
        self.data = {}

    def get(self, key):
        return self.data.get(key)

    def set(self, key, value, ttl=None):
        self.data[key] = value

    def delete(self, key):
        self.data.pop(key, None)

    def clear(self):
        self.data.clear()