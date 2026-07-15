from rest_framework import serializers

from .models import Comment
from users.serializers import PublicUserSerializer


class CommentSerializer(serializers.ModelSerializer):
    author = PublicUserSerializer(
        read_only=True,
    )

    class Meta:
        model = Comment

        fields = (
            "id",
            "author",
            "content",
            "created_at",
            "updated_at",
        )

        read_only_fields = (
            "id",
            "author",
            "created_at",
            "updated_at",
        )


class CreateCommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = (
            "content",
        )

    def validate_content(self, value):
        value = value.strip()
        if not value:
            raise serializers.ValidationError(
                "Comment cannot be empty."
            )
        return value
