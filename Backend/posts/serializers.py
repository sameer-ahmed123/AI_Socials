from rest_framework import serializers

from .models import Post, Like, Bookmark, Repost
from media_app.models import PostMedia
from users.serializers import PublicUserSerializer
from media_app.serializers import PostMediaSerializer
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
    media = PostMediaSerializer(
        many=True,
        read_only=True,
    )

    class Meta:
        model = Post

        fields = (
            "id",
            "author",
            "content",
            "media",
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
    uploaded_media = serializers.DictField(
        write_only=True,
        required=False,
    )

    class Meta:
        model = Post

        fields = (
            "content",
            "uploaded_media",
        )

    def validate_content(self, value):
        value = value.strip()

        if not value:
            raise serializers.ValidationError(
                "Post content cannot be empty."
            )

        return value

    def create(self, validated_data):
        uploaded_media = validated_data.pop(
            "uploaded_media",
            None,
        )

        post = Post.objects.create(**validated_data)

        if uploaded_media:
            PostMedia.objects.create(
                post=post,
                public_id=uploaded_media["public_id"],
                image_url=uploaded_media["image_url"],
                width=uploaded_media["width"],
                height=uploaded_media["height"],
            )

        return post
