import { sendMessage } from "../api/messages";

export function useSendMessage() {
  async function createMessage(conversation: number, content: string) {
    return sendMessage(conversation, content);
  }

  return {
    createMessage,
  };
}
