from django.test import SimpleTestCase

from agent_os.builders.world_builder import WorldBuilder
from agent_os.tests.fakes import FakeCollector


class WorldBuilderTests(SimpleTestCase):

    def test_world_builder_builds_world_context(self):
        builder = WorldBuilder(
            collectors=[
                FakeCollector(),
            ]
        )

        world = builder.build()

        self.assertEqual(
            world.news,
            ["fake-news-1", "fake-news-2"]
        )
