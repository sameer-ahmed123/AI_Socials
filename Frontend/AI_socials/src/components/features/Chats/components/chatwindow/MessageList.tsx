import { useEffect, useRef } from "react";
import EmptyState from "../../../../ui/EmptyState";
import MessageBubble from "./MessageBubble";
import "./MessageList.css";
import type { Message } from "../../types/message.model";

interface MessageListProps {
  messages: Message[];
  currentUserId: number;
}

const MessageList = ({ messages, currentUserId }: MessageListProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
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
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          message={message}
          isOwnMessage={message.sender.id === currentUserId}
        />
      ))}

      <div ref={bottomRef} />
    </section>
  );
};

export default MessageList;
