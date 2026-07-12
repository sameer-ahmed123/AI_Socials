from rest_framework import serializers

from .models import User


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
            "date_joined",
            "is_verified",
        )


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


class UpdateProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = User

        fields = (
            "display_name",
            "bio",
            "avatar",
            "cover_image",
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
