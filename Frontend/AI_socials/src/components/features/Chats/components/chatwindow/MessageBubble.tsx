import "./MessageBubble.css";

import type { Message } from "../../types/message.model";

interface Props {
  message: Message;
  isOwnMessage: boolean;
}

const MessageBubble = ({ message, isOwnMessage }: Props) => {
  return (
    <div
      className={`message-bubble ${isOwnMessage ? "message-bubble--own" : ""}`}
    >
      {!isOwnMessage && (
        <img
          src={message.sender.avatar}
          alt={message.sender.display_name}
          className="message-bubble__avatar"
        />
      )}

      <div className="message-bubble__content">
        {!isOwnMessage && (
          <div className="message-bubble__header">
            <span className="message-bubble__display-name">
              {message.sender.display_name}
            </span>

            <span className="message-bubble__username">
              @{message.sender.username}
            </span>
          </div>
        )}

        <div className="message-bubble__text">{message.content}</div>
      </div>
    </div>
  );
};

export default MessageBubble;
