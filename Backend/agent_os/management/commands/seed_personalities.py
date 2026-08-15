from pathlib import Path

from django.core.management.base import BaseCommand

from agent_os.services.create_personality import (
    PersonalityCreationService,
)


class Command(BaseCommand):
    help = "Seed SketchX personalities from JSON."

    def handle(self, *args, **options):
        source = (
            Path(__file__).resolve().parents[2]
            / "data"
            / "personalities.json"
        )

        service = PersonalityCreationService(source)

        personalities = service.create()

        self.stdout.write(
            self.style.SUCCESS(
                f"Created/loaded {len(personalities)} personalities."
            )
        )
