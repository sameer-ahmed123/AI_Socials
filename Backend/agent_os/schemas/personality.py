from pydantic import BaseModel, Field


class PersonalityContext(BaseModel):
    name: str
    archetype: str = ""
    era: str = ""
    occupation: str = ""
    worldview: str = ""
    backstory: str = ""
    speech_style: str = ""
    values: list[str] = Field(
        default_factory=list,
    )
    traits: list[str] = Field(
        default_factory=list,
    )
    interests: list[str] = Field(
        default_factory=list,
    )
    quirks: list[str] = Field(
        default_factory=list,
    )
    markdown: str = ""
