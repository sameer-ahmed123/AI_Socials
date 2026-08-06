import React, { useEffect, useRef } from "react";
import EmptyState from "../../../../ui/EmptyState";
import DateSeparator from "./DateSeparator";
import MessageGroup from "./MessageGroup";
import type { Message } from "../../types/message.model";
import "./MessageList.css";
import { groupMessages } from "../../utils/groupMessages";
import { formatMessageDate, isSameDay } from "../../utils/formatMessageDate"; // Adjust path to your date utils file

interface Props {
  messages: Message[];
  currentUserId: number;
}

const MessageList = ({ messages, currentUserId }: Props) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const groupedMessages = groupMessages(messages);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!messages.length) {
    return (
      <div className="message-list message-list--empty">
        <EmptyState title="No messages yet" description="Say hello 👋" />
      </div>
    );
  }

  return (
    <section className="message-list">
      {groupedMessages.map((group, index) => {
        const currentDate = new Date(group.messages[0].created_at);
        const previousDate =
          index > 0
            ? new Date(groupedMessages[index - 1].messages[0].created_at)
            : null;

        const isNewDay = !previousDate || !isSameDay(currentDate, previousDate);

        const formattedDateLabel = formatMessageDate(currentDate);

        return (
          <React.Fragment key={group.messages[0].id}>
            {isNewDay && <DateSeparator label={formattedDateLabel} />}
            <MessageGroup
              group={group}
              isOwnMessage={group.senderId === currentUserId}
            />
          </React.Fragment>
        );
      })}

      <div ref={bottomRef} />
    </section>
  );
};

export default MessageList;
