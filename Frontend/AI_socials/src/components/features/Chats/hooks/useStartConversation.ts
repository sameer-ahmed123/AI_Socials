import { startConversation } from "../api/conversations";

export function useStartConversation() {
  async function createConversation(username: string) {
    return startConversation(username);
  }

  return {
    createConversation,
  };
}
