from chat.models import Conversation


def get_inbox(user):
    return (
        Conversation.objects
        .filter(
            participants__user=user,
        )
        .prefetch_related(
            "participants__user",
            "messages",
        )
        .order_by("-last_message_at")
    )
