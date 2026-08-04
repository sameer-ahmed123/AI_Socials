from chat.models import (
    ConversationParticipant,
    Message,
)


def create_message(
    *,
    conversation,
    sender,
    content,
):
    is_participant = ConversationParticipant.objects.filter(
        conversation=conversation,
        user=sender,
    ).exists()

    if not is_participant:
        raise PermissionDenied(
            "You are not a participant in this conversation."
        )

    message = Message.objects.create(
        conversation=conversation,
        sender=sender,
        content=content,
    )

    conversation.last_message_at = message.created_at
    conversation.save(update_fields=["last_message_at"])

    return message
