import "./MessageGroup.css";
import MessageBubble from "./MessageBubble";
import type { BubblePosition } from "../../types/messageBubble.model";
import type { MessageGroup as MessageGroupModel } from "../../types/MessageGroup.model";

interface Props {
  group: MessageGroupModel;
  isOwnMessage: boolean;
}

const MessageGroup = ({ group, isOwnMessage }: Props) => {
  return (
    <section
      className={`message-group ${
        isOwnMessage ? "message-group--own" : "message-group--other"
      }`}
    >
      {/* Only show sender name for other users */}
      {!isOwnMessage && (
        <span className="message-group__sender">
          {group.messages[0].sender.display_name}
        </span>
      )}

      {group.messages.map((message, index) => {
        let position: BubblePosition = "single";

        if (group.messages.length > 1) {
          if (index === 0) {
            position = "first";
          } else if (index === group.messages.length - 1) {
            position = "last";
          } else {
            position = "middle";
          }
        }

        return (
          <MessageBubble
            key={message.id}
            message={message}
            isOwnMessage={isOwnMessage}
            position={position}
          />
        );
      })}
    </section>
  );
};

export default MessageGroup;
