from users.firebase import get_current_user
from chat.models import Conversation
from users.serializers import PublicUserSerializer
from rest_framework import serializers
from chat.models import Message


class StartConversationSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)


class CreateMessageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Message
        fields = ("content",)

    def validate_content(self, value):
        value = value.strip()

        if not value:
            raise serializers.ValidationError(
                "Message cannot be empty."
            )

        return value

    def create(self, validated_data):
        return Message.objects.create(
            conversation=self.context["conversation"],
            sender=self.context["user"],
            **validated_data,
        )


class MessageSerializer(serializers.ModelSerializer):
    sender = PublicUserSerializer(read_only=True)

    class Meta:
        model = Message
        fields = (
            "id",
            "sender",
            "content",
            "created_at",
        )


class ConversationPreviewSerializer(serializers.ModelSerializer):
    other_user = serializers.SerializerMethodField()
    last_message = serializers.SerializerMethodField()

    class Meta:
        model = Conversation

        fields = (
            "id",
            "other_user",
            "last_message",
            "last_message_at",
        )

    def get_other_user(self, obj):
        current_user = self.context["current_user"]

        participant = (
            obj.participants
            .exclude(user=current_user)
            .select_related("user")
            .first()
        )

        if not participant:
            return None

        return PublicUserSerializer(
            participant.user,
            context=self.context,
        ).data

    def get_last_message(self, obj):
        message = obj.messages.order_by("-created_at").first()

        if not message:
            return None

        return {
            "content": message.content,
            "sender": message.sender.username,
        }


class ConversationSerializer(serializers.ModelSerializer):
    other_user = serializers.SerializerMethodField()

    class Meta:
        model = Conversation
        fields = (
            "id",
            "other_user",
        )

    def get_other_user(self, obj):
        request = self.context["request"]

        current_user = get_current_user(request)

        participant = (
            obj.participants
            .exclude(user=current_user)
            .select_related("user")
            .first()
        )

        if participant is None:
            return None

        return PublicUserSerializer(
            participant.user,
            context=self.context,
        ).data


class ConversationMessagesSerializer(serializers.Serializer):
    conversation = ConversationSerializer()
    messages = MessageSerializer(many=True)
