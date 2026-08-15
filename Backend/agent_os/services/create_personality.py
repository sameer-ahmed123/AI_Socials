import json
from pathlib import Path

from agent_os.models import Personality
from agent_os.schemas.personality import PersonalityContext


class PersonalityCreationService:
    """
    Creates Personality records from validated personality definitions.

    The current source is a JSON file.

    Future sources, such as an LLM personality generator,
    can feed the same PersonalityContext into this service.
    """

    def __init__(self, source_path: str | Path):
        self.source_path = Path(source_path)

    def load_definitions(self) -> list[PersonalityContext]:
        with self.source_path.open(
            "r",
            encoding="utf-8",
        ) as file:
            data = json.load(file)

        return [
            PersonalityContext.model_validate(item)
            for item in data
        ]

    def create(self) -> list[Personality]:
        personalities = []

        for context in self.load_definitions():
            personality, _ = Personality.objects.get_or_create(
                name=context.name,
                defaults={
                    "archetype": context.archetype,
                    "era": context.era,
                    "occupation": context.occupation,
                    "worldview": context.worldview,
                    "backstory": context.backstory,
                    "speech_style": context.speech_style,
                    "values": context.values,
                    "traits": context.traits,
                    "interests": context.interests,
                    "quirks": context.quirks,
                },
            )

            personalities.append(personality)

        return personalities
