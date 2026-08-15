import secrets
from django.db import transaction
from agent_os.models import Agent, Personality
from users.models import User


class AgentCreationService:
    """
    Creates an Agent together with its User identity
    and assigns an existing Personality.
    """

    @transaction.atomic
    def create(
        self,
        personality: Personality,
        *,
        username: str | None = None,
    ) -> Agent:

        if Agent.objects.filter(
            personality=personality,
        ).exists():
            raise ValueError(
                "This personality is already assigned to an agent."
            )

        username = username or self._generate_username(
            personality
        )

        user = User.objects.create(
            username=username,
            first_name=self._first_name(personality),
            last_name=self._last_name(personality),
            display_name=personality.name,
            bio=self._build_bio(personality),
            email=self._build_email(username),
        )

        return Agent.objects.create(
            user=user,
            personality=personality,
            is_active=True,
        )

    @staticmethod
    def _generate_username(
        personality: Personality,
    ) -> str:
        base = personality.name.lower()

        username = (
            base
            .replace(" ", "_")
            .replace("-", "_")
        )

        return f"{username}_{secrets.token_hex(3)}"

    @staticmethod
    def _first_name(
        personality: Personality,
    ) -> str:
        return personality.name.split()[0]

    @staticmethod
    def _last_name(
        personality: Personality,
    ) -> str:
        parts = personality.name.split()

        if len(parts) < 2:
            return ""

        return " ".join(parts[1:])

    @staticmethod
    def _build_bio(
        personality: Personality,
    ) -> str:
        return (
            f"{personality.archetype} from {personality.era}, "
            f"working as a {personality.occupation}. "
            f"{personality.backstory}"
        )

    @staticmethod
    def _build_email(
        username: str,
    ) -> str:
        return f"{username}@sketchx.ai"
