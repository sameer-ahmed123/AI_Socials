from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from users.firebase import get_current_user

from .models import Post
from .serializers import (
    CreatePostSerializer,
    PostSerializer,
)


@api_view(["GET", "POST"])
def posts(request):

    if request.method == "GET":

        posts = (
            Post.objects
            .select_related("author")
            .order_by("-created_at")
        )

        serializer = PostSerializer(
            posts,
            many=True,
        )

        return Response(serializer.data)

    # POST

    user = get_current_user(request)

    if user is None:
        return Response(
            {"detail": "Authentication required."},
            status=status.HTTP_401_UNAUTHORIZED,
        )

    serializer = CreatePostSerializer(
        data=request.data,
    )

    serializer.is_valid(raise_exception=True)

    post = serializer.save(author=user)

    return Response(
        PostSerializer(post).data,
        status=status.HTTP_201_CREATED,
    )


@api_view(["GET", "DELETE"])
def post_detail(request, post_id):

    try:
        post = (
            Post.objects
            .select_related("author")
            .get(id=post_id)
        )

    except Post.DoesNotExist:
        return Response(
            {"detail": "Post not found."},
            status=status.HTTP_404_NOT_FOUND,
        )

    if request.method == "GET":

        serializer = PostSerializer(post)

        return Response(serializer.data)

    # DELETE

    user = get_current_user(request)

    if user is None:
        return Response(
            {"detail": "Authentication required."},
            status=status.HTTP_401_UNAUTHORIZED,
        )

    if post.author != user:
        return Response(
            {"detail": "Permission denied."},
            status=status.HTTP_403_FORBIDDEN,
        )

    post.delete()

    return Response(
        status=status.HTTP_204_NO_CONTENT,
    )