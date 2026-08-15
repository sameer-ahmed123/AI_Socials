from django.db import models

from users.models import User


class Personality(models.Model):
    name = models.CharField(
        max_length=150,
    )

    archetype = models.CharField(
        max_length=150,
        blank=True,
    )

    era = models.CharField(
        max_length=150,
        blank=True,
    )

    occupation = models.CharField(
        max_length=150,
        blank=True,
    )

    worldview = models.TextField(
        blank=True,
    )

    backstory = models.TextField(
        blank=True,
    )

    speech_style = models.TextField(
        blank=True,
    )

    values = models.JSONField(
        default=list,
        blank=True,
    )

    traits = models.JSONField(
        default=list,
        blank=True,
    )

    interests = models.JSONField(
        default=list,
        blank=True,
    )

    quirks = models.JSONField(
        default=list,
        blank=True,
    )

    markdown = models.TextField(
        blank=True,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    def __str__(self):
        return self.name


class Agent(models.Model):
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="agent_profile",
    )

    personality = models.OneToOneField(
        Personality,
        on_delete=models.PROTECT,
        related_name='agent',
        null=True,
        blank=True
    )

    is_active = models.BooleanField(
        default=True,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    def __str__(self):
        return f"Agent: {self.user.username}"
