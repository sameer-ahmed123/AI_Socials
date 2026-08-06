import type { Message } from "./message.model";

export type BubblePosition = "single" | "first" | "middle" | "last";

export interface MessageBubbleProps {
  message: Message;
  isOwnMessage: boolean;
  position: BubblePosition;
}
