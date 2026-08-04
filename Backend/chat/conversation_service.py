from django.conf import settings
from django.db.models import Count

from chat.models import (
    Conversation,
    ConversationParticipant,
)

User = settings.AUTH_USER_MODEL


def get_or_create_private_conversation(
    user_a: User,
    user_b: User,
) -> Conversation:
    """
    Return the existing private conversation between two users,
    or create one if it doesn't exist.
    """

    conversation = (
        Conversation.objects
        .annotate(
            participant_count=Count("participants"),
        )
        .filter(
            participant_count=2,
            participants__user=user_a,
        )
        .filter(
            participants__user=user_b,
        )
        .first()
    )

    if conversation:
        return conversation

    conversation = Conversation.objects.create()

    ConversationParticipant.objects.bulk_create(
        [
            ConversationParticipant(
                conversation=conversation,
                user=user_a,
            ),
            ConversationParticipant(
                conversation=conversation,
                user=user_b,
            ),
        ]
    )

    return conversation


def get_conversation_for_user(
    *,
    conversation_id: int,
    user,
):
    """
    Return a conversation if the user is a participant.

    Raises:
        Conversation.DoesNotExist
        PermissionDenied
    """

    conversation = Conversation.objects.get(
        id=conversation_id,
    )

    is_participant = (
        ConversationParticipant.objects.filter(
            conversation=conversation,
            user=user,
        ).exists()
    )

    if not is_participant:
        raise PermissionDenied(
            "You are not a participant in this conversation."
        )

    return conversation
