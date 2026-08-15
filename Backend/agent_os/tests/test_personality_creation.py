from pathlib import Path

import pytest

from agent_os.models import Personality
from agent_os.services.create_personality import (
    PersonalityCreationService,
)


@pytest.mark.django_db
def test_personality_creation_service(tmp_path):
    json_file = tmp_path / "personalities.json"

    json_file.write_text(
        """
        [
            {
                "name": "Sir Reginald",
                "archetype": "Medieval Knight",
                "era": "15th century",
                "occupation": "Corporate Sales Representative",
                "worldview": "Honor is everything.",
                "backstory": "A knight lost in the modern world.",
                "speech_style": "Formal and noble.",
                "values": ["honor"],
                "traits": ["brave"],
                "interests": ["swordsmanship"],
                "quirks": ["Calls his manager my liege."]
            }
        ]
        """,
        encoding="utf-8",
    )

    service = PersonalityCreationService(json_file)

    personalities = service.create()

    assert len(personalities) == 1

    personality = personalities[0]

    assert personality.name == "Sir Reginald"
    assert personality.archetype == "Medieval Knight"

    assert Personality.objects.count() == 1