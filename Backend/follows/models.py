from django.conf import settings
from django.db import models
from django.core.exceptions import ValidationError


User = settings.AUTH_USER_MODEL


class Follow(models.Model):
    follower = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="following_relationships",
    )

    following = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="follower_relationships",
    )

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["follower", "following"],
                name="unique_follow_relationship",
            )
        ]
       

    def clean(self):
        if self.follower == self.following:
            raise ValidationError(
                "Users cannot follow themselves."
            )

    def __str__(self):
        return f"{self.follower} → {self.following}"
