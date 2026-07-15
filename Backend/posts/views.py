from rest_framework.decorators import api_view
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status

from users.firebase import get_current_user
from django.shortcuts import get_object_or_404
from .models import Post, Like, Bookmark, Repost
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
            context={"request": request}
        )

        return Response(serializer.data)

    # POST

    user = get_current_user(request)

    if user is None:
        return Response(
            {"detail": "Authentication required. User must be logged in to Create a Post!"},
            status=status.HTTP_401_UNAUTHORIZED,
        )

    serializer = CreatePostSerializer(
        data=request.data,
    )

    serializer.is_valid(raise_exception=True)

    post = serializer.save(author=user)

    return Response(
        PostSerializer(post, context={"request": request}).data,
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

        serializer = PostSerializer(post, context={"request": request})

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


@api_view(["POST"])
def toggle_like(request, post_id):

    user = get_current_user(request)

    if user is None:
        return Response(
            {"detail": "Authentication required."},
            status=status.HTTP_401_UNAUTHORIZED,
        )

    post = get_object_or_404(Post, id=post_id)
    like = Like.objects.filter(
        user=user,
        post=post,
    )

    if like.exists():
        like.delete()

        liked = False

    else:
        Like.objects.create(
            user=user,
            post=post,
        )

        liked = True

    return Response(
        {
            "liked": liked,
            "like_count": post.likes.count(),
        },
        status=status.HTTP_200_OK,
    )


@api_view(["POST"])
def toggle_bookmark(request, post_id):

    user = get_current_user(request)

    if user is None:
        return Response(
            {"detail": "Authentication required."},
            status=status.HTTP_401_UNAUTHORIZED,
        )

    post = get_object_or_404(Post, id=post_id)

    bookmark = Bookmark.objects.filter(
        user=user,
        post=post,
    )

    if bookmark.exists():
        bookmark.delete()

        bookmarked = False

    else:
        Bookmark.objects.create(
            user=user,
            post=post,
        )

        bookmarked = True

    return Response(
        {
            "bookmarked": bookmarked,
            "bookmark_count": post.bookmarks.count(),
        },
        status=status.HTTP_200_OK,
    )


@api_view(["POST"])
def toggle_repost(request, post_id):

    user = get_current_user(request)

    if user is None:
        return Response(
            {"detail": "Authentication required."},
            status=status.HTTP_401_UNAUTHORIZED,
        )

    post = get_object_or_404(
        Post,
        id=post_id,
    )

    repost = Repost.objects.filter(
        user=user,
        post=post,
    )

    if repost.exists():

        repost.delete()

        reposted = False

    else:

        Repost.objects.create(
            user=user,
            post=post,
        )

        reposted = True

    return Response(
        {
            "reposted": reposted,
            "repost_count": post.reposts.count(),
        },
        status=status.HTTP_200_OK,
    )
