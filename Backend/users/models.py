from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    """
    Custom user model for SketchX.
    Firebase will handle authentication,
    while Django manages user profiles and permissions.
    """

    email = models.EmailField(
        unique=True,
    )

    firebase_uid = models.CharField(
        max_length=128,
        unique=True,
        blank=True,
        null=True,
    )

    display_name = models.CharField(
        max_length=100,
        blank=True,
    )

    avatar = models.URLField(
        blank=True,
    )

    bio = models.TextField(
        blank=True,
    )

    is_verified = models.BooleanField(
        default=False,
    )

    is_private = models.BooleanField(
        default=False,
    )

    website = models.URLField(
        blank=True,
    )

    location = models.CharField(
        max_length=100,
        blank=True,
    )

    @property
    def posts_count(self):
        return self.posts.count()

    def __str__(self):
        return self.display_name or self.username
