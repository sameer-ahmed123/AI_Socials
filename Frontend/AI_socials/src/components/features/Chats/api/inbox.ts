import { apiFetch } from "../../../../services/api/client";
import type { InboxConversation } from "../types/inboxConversation.model";

export async function getInbox() {
  return apiFetch<InboxConversation[]>("/chat/inbox/", {}, true);
}
