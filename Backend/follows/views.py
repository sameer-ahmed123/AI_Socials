from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from follows.models import Follow
from follows.serializers import FollowSerializer, FollowUserSerializer
from users.firebase import get_current_user
from users.models import User


@api_view(["POST", "DELETE"])
def follow(request, user_id):

    user = get_current_user(request)

    if user is None:
        return Response(
            {
                "detail": "Authentication required."
            },
            status=status.HTTP_401_UNAUTHORIZED,
        )

    target = get_object_or_404(User, pk=user_id)

    serializer = FollowSerializer(
        data={},
        context={
            "current_user": user,
            "target_user": target,
            "method": request.method,
        },
    )

    serializer.is_valid(raise_exception=True)

    if request.method == "POST":

        Follow.objects.create(
            follower=user,
            following=target,
        )

        return Response(
            {
                "following": True,
                "followers_count": target.follower_relationships.count(),
            },
            status=status.HTTP_201_CREATED,
        )

    Follow.objects.filter(
        follower=user,
        following=target,
    ).delete()

    return Response(
        {
            "following": False,
            "followers_count": target.follower_relationships.count(),
        },
        status=status.HTTP_200_OK,
    )


@api_view(["GET"])
def followers(request, user_id):
    target = get_object_or_404(User, pk=user_id)

    users = User.objects.filter(
        following_relationships__following=target
    )
    serializer = FollowUserSerializer(
        users,
        many=True
    )

    return Response(serializer.data)


@api_view(["GET"])
def following(request, user_id):
    target = get_object_or_404(User, pk=user_id)

    users = User.objects.filter(
        follower_relationships__follower=target
    )
    serializer = FollowUserSerializer(
        users,
        many=True
    )

    return Response(serializer.data)
