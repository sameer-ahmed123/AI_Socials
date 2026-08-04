from django.urls import path

from chat.views import *

urlpatterns = [
    path(
        "conversations/start/",
        start_conversation,
        name="start_conversation",
    ),
    path(
        "conversations/<int:conversation_id>/",
        conversation_messages,
        name="conversation_messages",
    ),
    path(
        "inbox/",
        inbox,
        name="inbox",
    ),
]
