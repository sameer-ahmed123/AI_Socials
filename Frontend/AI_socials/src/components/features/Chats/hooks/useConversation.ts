import { useEffect, useState } from "react";
import { getMessages, sendMessage } from "../api/messages";
import type { ConversationData } from "../types/conversation.model";
import type { SearchUser } from "../../Search/types/SearchUser.model";
import type { Message } from "../types/message.model";
import { useInbox } from "../context/InboxContext"; // Adjust path if needed

export function useConversation(conversationId: number) {
  const [conversation, setConversation] = useState<ConversationData | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { updateConversationPreview } = useInbox();

  const send = async (content: string, currentUser: SearchUser) => {
    const optimisticId = Date.now();

    const optimisticMessage: Message = {
      id: optimisticId,
      sender: currentUser,
      content,
      created_at: new Date().toISOString(),
      optimistic: true,
    };

    // 1. Optimistically update local message list
    setConversation((previous) => {
      if (!previous) return null;
      return {
        ...previous,
        messages: [...previous.messages, optimisticMessage],
      };
    });

    // 2. Optimistically update Inbox list preview & order
    updateConversationPreview(conversationId, optimisticMessage);

    try {
      const savedMessage = await sendMessage(conversationId, content);

      // Re-sync confirmed backend message locally and in inbox preview
      setConversation((previous) => {
        if (!previous) return null;
        return {
          ...previous,
          messages: previous.messages.map((message) =>
            message.id === optimisticId ? savedMessage : message,
          ),
        };
      });

      updateConversationPreview(conversationId, savedMessage);
    } catch {
      // Rollback local state on error
      setConversation((previous) => {
        if (!previous) return null;
        return {
          ...previous,
          messages: previous.messages.filter(
            (message) => message.id !== optimisticId,
          ),
        };
      });

      throw new Error("Unable to send message.");
    }
  };

  useEffect(() => {
    setLoading(true);
    setError("");

    getMessages(conversationId)
      .then(setConversation)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [conversationId]);

  return {
    conversation,
    messages: conversation?.messages ?? [],
    loading,
    error,
    send,
    setConversation,
  };
}
