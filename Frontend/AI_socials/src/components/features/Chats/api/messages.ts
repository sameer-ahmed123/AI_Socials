import { apiFetch } from "../../../../services/api/client";
import type { ConversationData } from "../types/conversation.model";
import type { Message } from "../types/message.model";

export async function getMessages(conversationId: number) {
  return apiFetch<ConversationData>(
    `/chat/conversations/${conversationId}/`,
    {},
    true,
  );
}

export async function sendMessage(conversationId: number, content: string) {
  return apiFetch<Message>(
    `/chat/conversations/${conversationId}/`,
    {
      method: "POST",
      body: JSON.stringify({
        content,
      }),
    },
    true,
  );
}
