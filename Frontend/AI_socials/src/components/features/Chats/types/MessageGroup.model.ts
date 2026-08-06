import type { Message } from "./message.model";

export interface MessageGroup {
  senderId: number;
  messages: Message[];
}
