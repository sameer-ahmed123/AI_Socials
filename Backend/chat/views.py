from django.shortcuts import get_object_or_404
from chat.models import Conversation
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from users.firebase import get_current_user
from users.models import User

from chat.serializers import ConversationMessagesSerializer, ConversationPreviewSerializer, CreateMessageSerializer, MessageSerializer, StartConversationSerializer
from chat.conversation_service import (
    get_conversation_for_user,
    get_or_create_private_conversation,
)
from chat.inbox_service import get_inbox


@api_view(["POST"])
def start_conversation(request):
    current_user = get_current_user(request)

    if current_user is None:
        return Response(
            {"detail": "Authentication required."},
            status=status.HTTP_401_UNAUTHORIZED,
        )

    serializer = StartConversationSerializer(
        data=request.data,
    )

    serializer.is_valid(raise_exception=True)

    username = serializer.validated_data["username"]

    other_user = get_object_or_404(
        User,
        username=username,
    )

    if other_user == current_user:
        return Response(
            {
                "detail": "You cannot start a conversation with yourself."
            },
            status=status.HTTP_400_BAD_REQUEST,
        )

    conversation = get_or_create_private_conversation(
        current_user,
        other_user,
    )

    return Response(
        {
            "conversation_id": conversation.id,
        }
    )


@api_view(["GET", "POST"])
def conversation_messages(request, conversation_id):

    user = get_current_user(request)

    if user is None:
        return Response(
            {"detail": "Authentication required."},
            status=status.HTTP_401_UNAUTHORIZED,
        )

    conversation = get_object_or_404(
        Conversation,
        id=conversation_id,
    )

    if request.method == "GET":
        messages = (
            conversation.messages
            .select_related("sender")
            .order_by("created_at")
        )

        serializer = ConversationMessagesSerializer(
            {
                "conversation": conversation,
                "messages": messages,
            },
            context={
                "request": request,
            },
        )

        return Response(serializer.data)

    serializer = CreateMessageSerializer(
        data=request.data,
        context={
            "conversation": conversation,
            "user": user,
        },
    )

    serializer.is_valid(raise_exception=True)

    serializer.save()

    return Response(
        MessageSerializer(serializer.instance).data,
        status=status.HTTP_201_CREATED,
    )


@api_view(["GET"])
def inbox(request):
    user = get_current_user(request)

    if user is None:
        return Response(
            {"detail": "Authentication required."},
            status=status.HTTP_401_UNAUTHORIZED,
        )

    conversations = get_inbox(user)

    serializer = ConversationPreviewSerializer(
        conversations,
        many=True,
        context={
            "request": request,
            "current_user": user,
        },
    )

    return Response(serializer.data)
