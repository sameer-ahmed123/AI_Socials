import "./MessageBubble.css";
import type { MessageBubbleProps } from "../../types/messageBubble.model";

const MessageBubble = ({
  message,
  isOwnMessage,
  position,
}: MessageBubbleProps) => {
  const formattedTime = new Date(message.created_at).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <article
      className={`
        message-bubble
        ${isOwnMessage ? "message-bubble--own" : "message-bubble--other"}
        message-bubble--${position}
      `}
    >
      <div className="message-bubble__content">
        <p className="message-bubble__text">{message.content}</p>
      </div>

      {(position === "single" || position === "last") && (
        <span className="message-bubble__time">
          {message.optimistic ? "Sending..." : formattedTime}
        </span>
      )}
    </article>
  );
};

export default MessageBubble;
