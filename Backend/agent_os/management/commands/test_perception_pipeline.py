from __future__ import annotations

import os

from django.core.management.base import (
    BaseCommand,
    CommandError,
)

from agent_os.cache.memory_cache import MemoryCache
from agent_os.collectors.news_collector import NewsCollector
from agent_os.perception.judges.llm import LLMRelevanceJudge
from agent_os.perception.judges.providers.gemini import (
    GeminiLLMClient,
)
from agent_os.perception.perception_filter import PerceptionFilter
from agent_os.builders.prompt_builder import (
    PromptBuilder,
)
from agent_os.schemas.prompt import PromptContext
from agent_os.schemas.perception.perception_profile import (
    PerceptionProfile,
)
from agent_os.schemas.personality import PersonalityContext

from agent_os.models import Agent


class Command(BaseCommand):
    help = (
        "Run the complete SketchX perception pipeline using "
        "active agents stored in the database."
    )

    def handle(self, *args, **options):
        # ==========================================================
        # 1. Environment
        # ==========================================================

        if not os.getenv("GEMINI_API_KEY"):
            raise CommandError(
                "GEMINI_API_KEY is not set."
            )

        model = os.getenv(
            "GEMINI_MODEL",
            GeminiLLMClient.DEFAULT_MODEL,
        )

        self.stdout.write("")
        self.stdout.write(
            self.style.SUCCESS(
                "Starting full SketchX perception pipeline..."
            )
        )

        self.stdout.write(
            f"Gemini model: {model}"
        )

        # ==========================================================
        # 2. Construct the REAL WorldContext
        # ==========================================================

        world_context = self._build_world_context()

        self.stdout.write(
            self.style.SUCCESS(
                "✓ WorldContext constructed."
            )
        )

        # ==========================================================
        # 3. Construct Gemini client
        # ==========================================================

        try:
            gemini_client = GeminiLLMClient(
                model=model,
            )
        except Exception as exc:
            raise CommandError(
                f"Failed to construct Gemini client: {exc}"
            ) from exc

        self.stdout.write(
            self.style.SUCCESS(
                "✓ Gemini client constructed."
            )
        )

        # ==========================================================
        # 4. Construct relevance judge
        # ==========================================================

        judge = LLMRelevanceJudge(
            client=gemini_client,
        )

        self.stdout.write(
            self.style.SUCCESS(
                "✓ LLM relevance judge constructed."
            )
        )

        # ==========================================================
        # 5. Construct perception filter
        # ==========================================================

        perception_filter = PerceptionFilter(
            judge=judge,
        )

        self.stdout.write(
            self.style.SUCCESS(
                "✓ PerceptionFilter constructed."
            )
        )

        # ==========================================================
        # 6. Load REAL agents from database
        # ==========================================================

        agents = self._load_agents()

        self.stdout.write(
            self.style.SUCCESS(
                f"✓ Loaded {len(agents)} active agent(s)."
            )
        )

        if not agents:
            self.stdout.write(
                self.style.WARNING(
                    "No active agents found. "
                    "Nothing to run."
                )
            )
            return

        # ==========================================================
        # 7. Run perception for every real agent
        # ==========================================================

        for index, agent in enumerate(
            agents,
            start=1,
        ):
            self._run_agent(
                index=index,
                total=len(agents),
                agent=agent,
                world_context=world_context,
                perception_filter=perception_filter,
            )

        # ==========================================================
        # 8. Complete
        # ==========================================================

        self.stdout.write("")
        self.stdout.write(
            self.style.SUCCESS(
                "Full perception pipeline completed."
            )
        )

    # ==============================================================
    # WORLD CONTEXT
    # ==============================================================

    def _build_world_context(self):
        """
        Build the objective world snapshot using the actual
        SketchX world-building pipeline.
        """

        try:
            from agent_os.builders.world_builder import (
                WorldBuilder,
            )
        except ImportError as exc:
            raise CommandError(
                "Could not import WorldBuilder from "
                "agent_os.builders.world_builder."
            ) from exc

        try:
            cache = MemoryCache()

            collectors = [
                NewsCollector(
                    cache=cache,
                ),
            ]

            builder = WorldBuilder(
                collectors,
            )

            return builder.build()

        except Exception as exc:
            raise CommandError(
                f"WorldContext construction failed: {exc}"
            ) from exc

    # ==============================================================
    # AGENTS
    # ==============================================================

    @staticmethod
    def _load_agents():
        """
        Load the real active agents from the database.

        Agent is the system-of-record for which agents participate
        in the perception pipeline.

        select_related("personality") avoids an additional database
        query for every agent.
        """

        return list(
            Agent.objects
            .filter(
                is_active=True,
                personality__isnull=False,
            )
            .select_related(
                "personality",
                "user",
            )
            .order_by("id")
        )

    # ==============================================================
    # PERCEPTION PROFILE
    # ==============================================================

    @staticmethod
    def _build_perception_profile(
        agent: Agent,
    ) -> PerceptionProfile:
        """
        Convert the persisted Agent/Personality model into the
        compact perception profile consumed by PerceptionFilter.
        """

        personality = agent.personality

        if personality is None:
            raise ValueError(
                f"Agent {agent.pk} has no personality."
            )

        return PerceptionProfile(
            archetype=personality.archetype,
            occupation=personality.occupation,
            worldview=personality.worldview,
            values=list(
                personality.values or []
            ),
            interests=list(
                personality.interests or []
            ),
            traits=list(
                personality.traits or []
            ),
        )

    # ==============================================================
    # PERSONALITY CONTEXT BUILDER
    # ==============================================================

    @staticmethod
    def _build_personality_context(
        agent: Agent,
    ) -> PersonalityContext:
        """
        Map the Django Personality ORM model into the Pydantic
        PersonalityContext schema expected by PromptContext.
        """
        personality = agent.personality

        return PersonalityContext(
            name=getattr(personality, "name", ""),
            archetype=getattr(personality, "archetype", ""),
            era=getattr(personality, "era", ""),
            occupation=getattr(personality, "occupation", ""),
            worldview=getattr(personality, "worldview", ""),
            backstory=getattr(personality, "backstory", ""),
            speech_style=getattr(personality, "speech_style", ""),
            values=list(getattr(personality, "values", []) or []),
            traits=list(getattr(personality, "traits", []) or []),
            interests=list(getattr(personality, "interests", []) or []),
            quirks=list(getattr(personality, "quirks", []) or []),
            markdown=getattr(personality, "markdown", ""),
        )

    # ==============================================================
    # AGENT EXECUTION
    # ==============================================================

    def _run_agent(
        self,
        *,
        index: int,
        total: int,
        agent: Agent,
        world_context,
        perception_filter: PerceptionFilter,
    ) -> None:

        personality = agent.personality

        self.stdout.write("")
        self.stdout.write("=" * 80)

        self.stdout.write(
            f"AGENT {index}/{total}"
        )

        self.stdout.write("=" * 80)

        # ----------------------------------------------------------
        # Agent identity
        # ----------------------------------------------------------

        self.stdout.write(
            f"Agent ID: {agent.pk}"
        )

        self.stdout.write(
            f"Username: {agent.user.username}"
        )

        self.stdout.write(
            f"Name: {personality.name}"
        )

        self.stdout.write(
            f"Archetype: {personality.archetype}"
        )

        self.stdout.write(
            f"Occupation: {personality.occupation}"
        )

        # ----------------------------------------------------------
        # Build perception profile from real Personality
        # ----------------------------------------------------------

        try:
            profile = self._build_perception_profile(
                agent,
            )
        except Exception as exc:
            raise CommandError(
                (
                    f"Could not build perception profile "
                    f"for agent '{agent.user.username}': {exc}"
                )
            ) from exc

        self.stdout.write("")
        self.stdout.write(
            "PERCEPTION PROFILE"
        )
        self.stdout.write("-" * 80)

        self.stdout.write(
            f"Archetype: {profile.archetype}"
        )

        self.stdout.write(
            f"Occupation: {profile.occupation}"
        )

        self.stdout.write(
            f"Worldview: {profile.worldview}"
        )

        self.stdout.write(
            f"Values: {profile.values}"
        )

        self.stdout.write(
            f"Interests: {profile.interests}"
        )

        self.stdout.write(
            f"Traits: {profile.traits}"
        )

        # ----------------------------------------------------------
        # Run the actual perception pipeline
        # ----------------------------------------------------------

        try:
            perceived_world = perception_filter.filter(
                world_context=world_context,
                profile=profile,
            )

        except Exception as exc:
            raise CommandError(
                (
                    "Perception pipeline failed for "
                    f"agent '{agent.user.username}': {exc}"
                )
            ) from exc

        # ----------------------------------------------------------
        # Display perception result & get total item count
        # ----------------------------------------------------------

        total_items = self._print_perceived_world(
            perceived_world=perceived_world,
        )

        # ----------------------------------------------------------
        # Construct & print prompt if perceived items exist
        # ----------------------------------------------------------

        if total_items == 0:
            self.stdout.write("")
            self.stdout.write(
                self.style.WARNING(
                    "No perceived items; skipping PromptBuilder."
                )
            )
            return

        try:
            personality_context = self._build_personality_context(
                agent,
            )

            prompt_context = PromptContext(
                personality=personality_context,
                world=perceived_world,
            )
            
            agent_prompt = PromptBuilder().build(prompt_context)

        except Exception as exc:
            raise CommandError(
                (
                    "Prompt construction failed for "
                    f"agent '{agent.user.username}': {exc}"
                )
            ) from exc

        self.stdout.write("")
        self.stdout.write(
            "CONSTRUCTED PROMPT"
        )
        self.stdout.write("-" * 80)
        self.stdout.write(agent_prompt.render())

    # ==============================================================
    # OUTPUT
    # ==============================================================

    def _print_perceived_world(
        self,
        *,
        perceived_world,
    ) -> int:

        self.stdout.write("")
        self.stdout.write(
            "PERCEIVED WORLD"
        )
        self.stdout.write("-" * 80)

        total_items = 0

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

            total_items += len(values)

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
                f"TOTAL PERCEIVED: {total_items}"
            )
        )

        return total_items
