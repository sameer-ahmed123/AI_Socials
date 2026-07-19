from users.firebase import get_current_user
from rest_framework import serializers

from .models import User


class PublicUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User

        fields = (
            "id",
            "username",
            "display_name",
            "avatar",
            "bio",
            "is_verified",
        )


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User

        fields = (
            "id",
            "username",
            "email",
            "display_name",
            "avatar",
            "bio",
            "is_verified",
            "is_private",
            "date_joined",
        )

        read_only_fields = (
            "id",
            "email",
            "is_verified",
            "date_joined",
        )


class ProfileSerializer(serializers.ModelSerializer):

    posts_count = serializers.IntegerField(read_only=True)

    followers_count = serializers.SerializerMethodField()

    following_count = serializers.SerializerMethodField()

    is_following = serializers.SerializerMethodField()

    is_me = serializers.SerializerMethodField()

    joined_at = serializers.DateTimeField(
        source="date_joined",
        read_only=True,
    )

    class Meta:
        model = User

        fields = (
            "id",
            "username",
            "display_name",
            "avatar",
            "bio",
            "website",
            "location",
            "is_verified",
            "joined_at",
            "posts_count",
            "followers_count",
            "following_count",
            "is_following",
            "is_me",
        )

    def get_followers_count(self, obj):
        return 0

    def get_following_count(self, obj):
        return 0

    def get_is_following(self, obj):
        return False

    def get_is_me(self, obj):
        request = self.context.get("request")

        user = get_current_user(request)

        if user is None:
            return False

        return user.id == obj.id


class UpdateProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User

        fields = (
            "display_name",
            "bio",
            "avatar",
            "website",
            "location",
            "is_private",
        )

    def validate_display_name(self, value):
        value = value.strip()

        if len(value) < 2:
            raise serializers.ValidationError(
                "Display name is too short."
            )

        return value

    def validate_bio(self, value):
        if len(value) > 280:
            raise serializers.ValidationError(
                "Bio cannot exceed 280 characters."
            )

        return value
