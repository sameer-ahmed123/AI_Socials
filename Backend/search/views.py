from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from posts.serializers import PostSerializer
from users.serializers import PublicUserSerializer

from .services.users import search_users
from .services.posts import search_posts
from .services.hashtags import search_hashtags


@api_view(["GET"])
def search(request):
    query = request.GET.get("q", "").strip()

    scope = request.GET.get("scope", "").strip().lower()

    if not query:
        return Response(
            {"detail": "Missing search query."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    if scope == "users":
        queryset = search_users(query)

        serializer = PublicUserSerializer(
            queryset,
            many=True,
        )

        return Response(serializer.data)

    if scope == "posts":
        queryset = search_posts(query)

        serializer = PostSerializer(
            queryset,
            many=True,
            context={
                "request": request,
            },
        )

        return Response(serializer.data)

    if scope == "hashtags":
        return Response(search_hashtags(query))

    return Response(
        {
            "detail": "Invalid search scope.",
        },
        status=status.HTTP_400_BAD_REQUEST,
    )