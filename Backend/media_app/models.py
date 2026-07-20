from django.db import models
from posts.models import Post


class PostMedia(models.Model):
    post = models.ForeignKey(
        Post,
        on_delete=models.CASCADE,
        related_name="media",
    )

    image_url = models.URLField()

    public_id = models.CharField(
        max_length=255,
        unique=True,
        
    )

    width = models.PositiveIntegerField()

    height = models.PositiveIntegerField()

    display_order = models.PositiveSmallIntegerField(
        default=0,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    class Meta:
        ordering = ["display_order"]

    def __str__(self):
        return f"Post {self.post_id} - Image {self.display_order}"