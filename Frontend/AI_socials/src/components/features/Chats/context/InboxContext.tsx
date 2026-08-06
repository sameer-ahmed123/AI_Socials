/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { getInbox } from "../api/inbox";
import type { InboxConversation } from "../types/inboxConversation.model";
import type { Message } from "../types/message.model";

interface InboxContextType {
  conversations: InboxConversation[];
  loading: boolean;
  error: string;
  refreshInbox: () => Promise<void>;
  updateConversationPreview: (conversationId: number, message: Message) => void;
}

const InboxContext = createContext<InboxContextType | null>(null);

export function InboxProvider({ children }: { children: ReactNode }) {
  const [conversations, setConversations] = useState<InboxConversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function refreshInbox() {
    try {
      const inbox = await getInbox();
      setConversations(inbox);
      setError("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refreshInbox();
  }, []);

  function updateConversationPreview(conversationId: number, message: Message) {
    setConversations((previous) => {
      // If conversation exists, update its last message metadata
      const updated = previous.map((conversation) =>
        conversation.id === conversationId
          ? {
              ...conversation,
              last_message: {
                content: message.content,
                sender: message.sender.username,
              },
              last_message_at: message.created_at,
            }
          : conversation,
      );

      // Sort by newest message time
      return updated.sort((a, b) => {
        const timeA = a.last_message_at
          ? new Date(a.last_message_at).getTime()
          : 0;
        const timeB = b.last_message_at
          ? new Date(b.last_message_at).getTime()
          : 0;
        return timeB - timeA;
      });
    });
  }

  return (
    <InboxContext.Provider
      value={{
        conversations,
        loading,
        error,
        refreshInbox,
        updateConversationPreview,
      }}
    >
      {children}
    </InboxContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useInbox() {
  const context = useContext(InboxContext);

  if (!context) {
    throw new Error("useInbox must be used inside InboxProvider");
  }

  return context;
}
