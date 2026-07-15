
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from django.shortcuts import get_object_or_404
from users.firebase import get_current_user
from posts.models import Post
from comments.models import Comment
from comments.serializers import CommentSerializer, CreateCommentSerializer


@api_view(["GET", "POST"])
def comments(request, post_id):
    user = get_current_user(request)
    post = get_object_or_404(Post, id=post_id)

    if request.method == "GET":
        comments = (
            post.comments
            .select_related("author")
            .filter(parent__isnull=True)
            .order_by("created_at")
        )

        serializer = CommentSerializer(
            comments,
            many=True,
        )

        return Response(serializer.data)

    if user is None:
        return Response(
            {"detail": "Authentication required."},
            status=status.HTTP_401_UNAUTHORIZED,
        )

    serializer = CreateCommentSerializer(
        data=request.data,
    )

    serializer.is_valid(raise_exception=True)
    print(Comment)
    print(type(Comment))
    comment = serializer.save(
        author=user,
        post=post,
    )

    return Response(
        CommentSerializer(comment).data,
        status=status.HTTP_201_CREATED,
    )


@api_view(["DELETE"])
def comment_detail(request, comment_id):
    user = get_current_user(request)

    if user is None:
        return Response(
            {"detail": "Authentication required."},
            status=status.HTTP_401_UNAUTHORIZED,
        )

    comment = get_object_or_404(
        Comment,
        id=comment_id,
    )

    if comment.author != user:
        return Response(
            {"detail": "Permission denied."},
            status=status.HTTP_403_FORBIDDEN,
        )

    comment.delete()

    return Response(
        status=status.HTTP_204_NO_CONTENT,
    )
