import { useEffect, useState } from "react";
import { getMessages } from "../api/messages";
import type { ConversationData } from "../types/conversation.model";
export function useConversation(conversationId: number) {
  const [conversation, setConversation] = useState<ConversationData | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
    setConversation,
  };
}
