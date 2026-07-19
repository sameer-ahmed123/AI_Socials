from django.shortcuts import get_object_or_404
from posts.serializers import PostSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .firebase import get_current_user, verify_firebase_token
from .models import User
from .serializers import ProfileSerializer, UpdateProfileSerializer, UserSerializer


@api_view(["GET"])
def health(request):
    return Response(
        {
            "message": "Users API is working."
        }
    )


@api_view(["POST"])
def firebase_login(request):

    id_token = request.data.get("idToken")

    if not id_token:
        return Response(
            {"detail": "Missing Firebase token."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        firebase_user = verify_firebase_token(id_token)

    except Exception as e:
        # print(e)
        return Response(
            {"detail": "Invalid Firebase token."},
            # {"detail": str(e)},
            status=status.HTTP_401_UNAUTHORIZED,
        )

    email = firebase_user.get("email")

    firebase_uid = firebase_user["uid"]

    username = email.split("@")[0]

    user, created = User.objects.get_or_create(
        firebase_uid=firebase_uid,
        defaults={
            "username": username,
            "email": email,
            "display_name": firebase_user.get("name", username),
            "avatar": firebase_user.get("picture", ""),
        },
    )

    if not created:

        user.display_name = firebase_user.get(
            "name",
            user.display_name,
        )

        user.avatar = firebase_user.get(
            "picture",
            user.avatar,
        )

        user.save()

    serializer = UserSerializer(user)

    return Response(serializer.data)


@api_view(["GET"])
def current_user(request):

    user = get_current_user(request)

    if user is None:
        return Response(
            {
                "detail": "Authentication required."
            },
            status=status.HTTP_401_UNAUTHORIZED,
        )

    serializer = UserSerializer(user)

    return Response(serializer.data)


@api_view(["GET"])
def profile(request, username):

    user = get_object_or_404(
        User,
        username=username,
    )

    serializer = ProfileSerializer(
        user,
        context={
            "request": request,
        },
    )

    return Response(serializer.data)


@api_view(["PATCH"])
def update_profile(request):

    user = get_current_user(request)

    if user is None:
        return Response(
            {"detail": "Authentication required."},
            status=status.HTTP_401_UNAUTHORIZED,
        )

    serializer = UpdateProfileSerializer(
        user,
        data=request.data,
        partial=True,
    )

    serializer.is_valid(raise_exception=True)

    serializer.save()

    return Response(UserSerializer(user).data)


@api_view(["GET"])
def profile_posts(request, username):

    user = get_object_or_404(
        User,
        username=username,
    )

    posts = (
        user.posts
        .select_related("author")
        .order_by("-created_at")
    )

    serializer = PostSerializer(
        posts,
        many=True,
        context={
            "request": request,
        },
    )

    return Response(serializer.data)


# TODO will do when making the Replies tab in frontend
#
# @api_view(["GET"])
# def profile_replies(request, username):

#     user = get_object_or_404(
#         User,
#         username=username,
#     )

#     posts = (
#         user.posts
#         .filter(
#             parent__isnull=False,
#         )
#         .select_related("author")
#         .order_by("-created_at")
#     )

#     serializer = PostSerializer(
#         posts,
#         many=True,
#         context={
#             "request": request,
#         },
#     )

#     return Response(serializer.data)


# @api_view(["GET"])
# def profile_replies(request, username):

#     user = get_object_or_404(
#         User,
#         username=username,
#     )

#     posts = (
#         user.posts
#         .filter(
#             parent__isnull=False,
#         )
#         .select_related("author")
#         .order_by("-created_at")
#     )

#     serializer = PostSerializer(
#         posts,
#         many=True,
#         context={
#             "request": request,
#         },
#     )

#     return Response(serializer.data)
