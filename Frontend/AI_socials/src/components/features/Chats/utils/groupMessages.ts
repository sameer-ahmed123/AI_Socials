import type { Message } from "../types/message.model";
import type { MessageGroup } from "../types/MessageGroup.model";

export function groupMessages(messages: Message[]): MessageGroup[] {
  const groups: MessageGroup[] = [];

  for (const message of messages) {
    const lastGroup = groups.at(-1);

    if (lastGroup && lastGroup.senderId === message.sender.id) {
      lastGroup.messages.push(message);
    } else {
      groups.push({
        senderId: message.sender.id,
        messages: [message],
      });
    }
  }

  return groups;
}
