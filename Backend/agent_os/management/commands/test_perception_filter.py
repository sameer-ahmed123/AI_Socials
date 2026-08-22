from __future__ import annotations

import os
from datetime import datetime, timezone

from django.core.management.base import BaseCommand, CommandError

from agent_os.perception.judges.llm import LLMRelevanceJudge
from agent_os.perception.judges.providers.gemini import GeminiLLMClient
from agent_os.perception.perception_filter import PerceptionFilter

from agent_os.schemas.perception.perception_profile import (
    PerceptionProfile,
)

from agent_os.schemas.world import WorldContext
from agent_os.schemas.news import NewsHeadline, Source


class Command(BaseCommand):
    help = (
        "Run PerceptionFilter against deterministic custom world data "
        "for multiple agent profiles using Gemini relevance judgment."
    )

    def handle(self, *args, **options):
        if not os.getenv("GEMINI_API_KEY"):
            raise CommandError(
                "GEMINI_API_KEY is not set."
            )

        self.stdout.write("")
        self.stdout.write(
            self.style.SUCCESS(
                "Starting PerceptionFilter test..."
            )
        )

        # ----------------------------------------------------------
        # 1. Build valid custom WorldContext
        # ----------------------------------------------------------

        try:
            world_context = self._build_world_context()
        except Exception as exc:
            raise CommandError(
                f"Failed to construct test WorldContext: {exc}"
            ) from exc

        self.stdout.write(
            self.style.SUCCESS(
                "✓ WorldContext constructed."
            )
        )

        self._print_world_context(world_context)

        # ----------------------------------------------------------
        # 2. Gemini client
        # ----------------------------------------------------------

        try:
            gemini_client = GeminiLLMClient()
        except Exception as exc:
            raise CommandError(
                f"Failed to construct Gemini client: {exc}"
            ) from exc

        self.stdout.write(
            self.style.SUCCESS(
                "✓ Gemini client constructed."
            )
        )

        # ----------------------------------------------------------
        # 3. Relevance judge
        # ----------------------------------------------------------

        judge = LLMRelevanceJudge(
            client=gemini_client,
        )

        self.stdout.write(
            self.style.SUCCESS(
                "✓ LLM relevance judge constructed."
            )
        )

        # ----------------------------------------------------------
        # 4. PerceptionFilter
        # ----------------------------------------------------------

        perception_filter = PerceptionFilter(
            judge=judge,
        )

        self.stdout.write(
            self.style.SUCCESS(
                "✓ PerceptionFilter constructed."
            )
        )

        # ----------------------------------------------------------
        # 5. Test profiles
        # ----------------------------------------------------------

        profiles = self._build_profiles()

        self.stdout.write(
            self.style.SUCCESS(
                f"✓ Loaded {len(profiles)} test profiles."
            )
        )

        # ----------------------------------------------------------
        # 6. Run every profile against SAME WorldContext
        # ----------------------------------------------------------

        for index, profile in enumerate(
            profiles,
            start=1,
        ):
            self._run_agent(
                index=index,
                total=len(profiles),
                perception_filter=perception_filter,
                world_context=world_context,
                profile=profile,
            )

        self.stdout.write("")
        self.stdout.write(
            self.style.SUCCESS(
                "PerceptionFilter test completed."
            )
        )

    # ==============================================================
    # WORLD CONTEXT
    # ==============================================================

    @staticmethod
    def _build_world_context() -> WorldContext:
        """
        Construct a deterministic WorldContext using valid
        NewsHeadline and Source objects.

        This is intentionally independent of GNews so that the
        perception filter can be tested with known inputs.
        """

        timestamp = datetime.now(timezone.utc)

        source = Source(
            name="SketchX Test News",
            url="https://example.com",
        )

        news = [
            NewsHeadline(
                title=(
                    "Major international technology company "
                    "announces a new open-source AI model "
                    "with significantly improved reasoning capabilities."
                ),
                description=(
                    "The company released a new open-source "
                    "artificial intelligence model focused on "
                    "reasoning and machine learning."
                ),
                category="technology",
                image_url=None,
                url="https://example.com/news/ai-model",
                published_at=timestamp,
                source=source,
            ),

            NewsHeadline(
                title=(
                    "National cricket team announces squad "
                    "for upcoming international tournament."
                ),
                description=(
                    "The national cricket team has announced "
                    "its squad ahead of an upcoming international "
                    "competition."
                ),
                category="sports",
                image_url=None,
                url="https://example.com/news/cricket-squad",
                published_at=timestamp,
                source=source,
            ),

            NewsHeadline(
                title=(
                    "New restaurant opens downtown offering "
                    "traditional regional cuisine."
                ),
                description=(
                    "A new restaurant has opened downtown, "
                    "serving traditional regional dishes."
                ),
                category="food",
                image_url=None,
                url="https://example.com/news/new-restaurant",
                published_at=timestamp,
                source=source,
            ),

            NewsHeadline(
                title=(
                    "Government announces major change to "
                    "national education policy affecting "
                    "university admissions."
                ),
                description=(
                    "The government has announced changes "
                    "to education policy that will affect "
                    "university admissions."
                ),
                category="education",
                image_url=None,
                url="https://example.com/news/education-policy",
                published_at=timestamp,
                source=source,
            ),

            NewsHeadline(
                title=(
                    "Scientists announce breakthrough in "
                    "renewable energy storage technology."
                ),
                description=(
                    "Researchers have announced a breakthrough "
                    "in renewable energy storage technology."
                ),
                category="science",
                image_url=None,
                url="https://example.com/news/energy-storage",
                published_at=timestamp,
                source=source,
            ),
        ]

        return WorldContext(
            timestamp=timestamp,

            news=news,

            trending_topics=[
                "artificial intelligence",
                "international cricket",
                "university admissions",
                "renewable energy",
            ],

            popular_posts=[
                "People are discussing the latest AI model release.",
                "Fans are debating the cricket team's new squad.",
                "Students are discussing university admission changes.",
                "Researchers are discussing new energy storage technology.",
            ],

            suggested_users=[
                "AI Research Weekly",
                "International Cricket News",
                "University Policy Watch",
                "Renewable Energy Research",
            ],
        )

    # ==============================================================
    # PROFILES
    # ==============================================================

    @staticmethod
    def _build_profiles() -> list[PerceptionProfile]:
        return [
            PerceptionProfile(
                archetype="technology researcher",
                occupation="AI researcher",
                worldview="analytical and evidence-driven",
                values=[
                    "scientific progress",
                    "innovation",
                    "open research",
                ],
                interests=[
                    "artificial intelligence",
                    "machine learning",
                    "technology",
                    "renewable energy",
                ],
                traits=[
                    "curious",
                    "analytical",
                    "research-oriented",
                ],
            ),

            PerceptionProfile(
                archetype="sports enthusiast",
                occupation="sports journalist",
                worldview="competitive and sports-focused",
                values=[
                    "competition",
                    "teamwork",
                    "excellence",
                ],
                interests=[
                    "cricket",
                    "international sports",
                    "athletes",
                ],
                traits=[
                    "competitive",
                    "social",
                    "energetic",
                ],
            ),

            PerceptionProfile(
                archetype="university student",
                occupation="university student",
                worldview="education-focused",
                values=[
                    "education",
                    "personal development",
                    "opportunity",
                ],
                interests=[
                    "university",
                    "education policy",
                    "career development",
                ],
                traits=[
                    "ambitious",
                    "curious",
                    "future-oriented",
                ],
            ),
        ]

    # ==============================================================
    # EXECUTION
    # ==============================================================

    def _run_agent(
        self,
        *,
        index: int,
        total: int,
        perception_filter: PerceptionFilter,
        world_context: WorldContext,
        profile: PerceptionProfile,
    ) -> None:

        self.stdout.write("")
        self.stdout.write("=" * 80)

        self.stdout.write(
            f"AGENT {index}/{total}: {profile.archetype}"
        )

        self.stdout.write(
            f"Occupation: {profile.occupation}"
        )

        self.stdout.write("=" * 80)

        try:
            perceived_world = perception_filter.filter(
                world_context=world_context,
                profile=profile,
            )

        except Exception as exc:
            raise CommandError(
                f"PerceptionFilter failed for "
                f"'{profile.archetype}': {exc}"
            ) from exc

        self._print_perceived_world(
            perceived_world=perceived_world,
        )

    # ==============================================================
    # OUTPUT
    # ==============================================================

    def _print_world_context(
        self,
        world_context: WorldContext,
    ) -> None:

        self.stdout.write("")
        self.stdout.write("-" * 80)
        self.stdout.write("OBJECTIVE WORLD")
        self.stdout.write("-" * 80)

        for category in (
            "news",
            "trending_topics",
            "popular_posts",
            "suggested_users",
        ):
            values = getattr(
                world_context,
                category,
                [],
            )

            self.stdout.write("")
            self.stdout.write(
                f"{category}: {len(values)}"
            )

            for index, value in enumerate(values):
                self.stdout.write(
                    f"  [{index}] {value}"
                )

    def _print_perceived_world(
        self,
        *,
        perceived_world,
    ) -> None:

        self.stdout.write("")
        self.stdout.write("PERCEIVED WORLD")
        self.stdout.write("-" * 80)

        total = 0

        for category in (
            "news",
            "trending_topics",
            "popular_posts",
            "suggested_users",
        ):
            values = getattr(
                perceived_world,
                category,
                [],
            )

            total += len(values)

            self.stdout.write("")
            self.stdout.write(
                f"{category}: {len(values)}"
            )

            for item in values:
                self.stdout.write(
                    f"  [{item.id}] {item.content}"
                )

        self.stdout.write("")
        self.stdout.write(
            self.style.SUCCESS(
                f"TOTAL PERCEIVED ITEMS: {total}"
            )
        )