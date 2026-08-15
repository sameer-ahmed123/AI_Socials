from django.core.management.base import BaseCommand

from agent_os.models import Personality
from agent_os.services.create_agent import AgentCreationService


class Command(BaseCommand):
    help = "Create a SketchX agent from an existing personality."

    def add_arguments(self, parser):
        parser.add_argument(
            "personality_id",
            type=int,
        )

    def handle(self, *args, **options):
        personality = Personality.objects.get(
            id=options["personality_id"],
        )

        service = AgentCreationService()

        agent = service.create(personality)

        self.stdout.write(
            self.style.SUCCESS(
                f"Agent created: {agent.user.username}"
            )
        )
