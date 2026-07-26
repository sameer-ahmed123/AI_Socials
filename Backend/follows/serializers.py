from rest_framework import serializers
from follows.models import Follow
from users.models import User


class FollowSerializer(serializers.Serializer):

    def validate(self, attrs):
        current_user = self.context["current_user"]
        target_user = self.context["target_user"]
        method = self.context["method"]

        if current_user == target_user:
            raise serializers.ValidationError(
                "You cannot follow yourself."
            )

        already_following = Follow.objects.filter(
            follower=current_user,
            following=target_user,
        ).exists()

        if method == "POST" and already_following:
            raise serializers.ValidationError(
                "Already following this user."
            )

        if method == "DELETE" and not already_following:
            raise serializers.ValidationError(
                "You are not following this user."
            )

        return attrs


class FollowUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "display_name",
            "profile_picture",
        )
