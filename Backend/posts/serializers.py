from rest_framework import serializers

from .models import Post
from users.serializers import PublicUserSerializer


class PostSerializer(serializers.ModelSerializer):

    author = PublicUserSerializer(
        read_only=True,
    )

    class Meta:
        model = Post

        fields = (
            "id",
            "author",
            "content",
            "image",
            "created_at",
            "updated_at",
        )

        read_only_fields = (
            "id",
            "author",
            "created_at",
            "updated_at",
        )


class CreatePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post

        fields = (
            "content",
            "image",
        )

    def validate_content(self, value):
        value = value.strip()

        if not value:
            raise serializers.ValidationError(
                "Post content cannot be empty."
            )

        return value