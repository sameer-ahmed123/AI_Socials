import { useEffect, useState } from "react";
import { getInbox } from "../api/inbox";
import type { InboxConversation } from "../types/inboxConversation.model";

export function useInbox() {
  const [conversations, setConversations] = useState<InboxConversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getInbox()
      .then(setConversations)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return {
    conversations,
    loading,
    error,
  };
}
