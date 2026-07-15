from rest_framework import serializers

from .models import Post, Like, Bookmark, Repost
from users.serializers import PublicUserSerializer
from users.firebase import get_current_user
from users.serializers import PublicUserSerializer


class PostSerializer(serializers.ModelSerializer):

    author = PublicUserSerializer(
        read_only=True,
    )

    like_count = serializers.SerializerMethodField()
    liked = serializers.SerializerMethodField()
    bookmark_count = serializers.SerializerMethodField()
    bookmarked = serializers.SerializerMethodField()
    repost_count = serializers.SerializerMethodField()
    reposted = serializers.SerializerMethodField()
    reply_count = serializers.SerializerMethodField()

    class Meta:
        model = Post

        fields = (
            "id",
            "author",
            "content",
            "image",
            "reply_count",
            "like_count",
            "liked",
            "bookmark_count",
            "bookmarked",
            "repost_count",
            "reposted",
            "created_at",
            "updated_at",
        )

        read_only_fields = (
            "id",
            "author",
            "reply_count",
            "like_count",
            "liked",
            "bookmark_count",
            "bookmarked",
            "repost_count",
            "reposted",
            "created_at",
            "updated_at",
        )

    def get_like_count(self, obj):
        return obj.likes.count()

    def get_liked(self, obj):

        request = self.context.get("request")

        if request is None:
            return False

        user = get_current_user(request)

        if user is None:
            return False

        return Like.objects.filter(
            user=user,
            post=obj,
        ).exists()

    def get_bookmark_count(self, obj):
        return obj.bookmarks.count()

    def get_bookmarked(self, obj):

        request = self.context.get("request")

        if request is None:
            return False

        user = get_current_user(request)

        if user is None:
            return False

        return Bookmark.objects.filter(
            user=user,
            post=obj,
        ).exists()

    def get_repost_count(self, obj):
        return obj.reposts.count()

    def get_reposted(self, obj):

        request = self.context.get("request")

        if request is None:
            return False

        user = get_current_user(request)

        if user is None:
            return False

        return Repost.objects.filter(
            user=user,
            post=obj,
        ).exists()

    def get_reply_count(self, obj):
        return obj.comments.filter(
            parent__isnull=True
        ).count()


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
