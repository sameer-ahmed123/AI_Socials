import type { Message } from "./message.model";
import type { SearchUser } from "../../Search/types/SearchUser.model";

export interface Conversation {
  id: number;
  messages: Message[];
  last_message_at: string | null;
}

export interface ConversationData {
  conversation: {
    id: number;
    other_user: SearchUser;
  };

  messages: Message[];
}
