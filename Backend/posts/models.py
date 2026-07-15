from django.conf import settings
from django.db import models

User = settings.AUTH_USER_MODEL


class Post(models.Model):
    """
    A post created by a user.
    """

    author = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="posts",
    )

    content = models.TextField(
        max_length=280,
    )

    image = models.URLField(
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    def __str__(self):
        return f"{self.author.username}: {self.content[:30]}"


class Like(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="likes",
    )

    post = models.ForeignKey(
        Post,
        on_delete=models.CASCADE,
        related_name="likes",
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["user", "post"],
                name="unique_user_like",
            )
        ]

        ordering = [
            "-created_at",
        ]

    def __str__(self):
        return f"{self.user.username} liked Post {self.post.id}"


class Bookmark(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="bookmarks",
    )

    post = models.ForeignKey(
        Post,
        on_delete=models.CASCADE,
        related_name="bookmarks",
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    class Meta:
        unique_together = (
            "user",
            "post",
        )

        ordering = (
            "-created_at",
        )

    def __str__(self):
        return f"{self.user.username} bookmarked Post {self.post.id}"


class Repost(models.Model):

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="reposts",
    )

    post = models.ForeignKey(
        Post,
        on_delete=models.CASCADE,
        related_name="reposts",
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    class Meta:

        unique_together = (
            "user",
            "post",
        )

        ordering = (
            "-created_at",
        )

    def __str__(self):
        return (
            f"{self.user.username} reposted Post {self.post.id}"
        )