import { apiFetch } from "../../../../services/api/client";

export async function startConversation(username: string) {
  return apiFetch<{ conversation_id: number }>(
    "/chat/conversations/start/",
    {
      method: "POST",
      body: JSON.stringify({
        username,
      }),
    },
    true,
  );
}
