import "./ConversationCard.css";
import { Link } from "react-router-dom";
import type { InboxConversation } from "../../types/inboxConversation.model";

interface Props {
  conversation: InboxConversation;
}

const ConversationCard = ({ conversation }: Props) => {
  return (
    <Link to={`/messages/${conversation.id}`} className="conversation-card">
      <img
        className="conversation-card__avatar"
        src={conversation.other_user.avatar}
        alt={conversation.other_user.display_name}
      />

      <div className="conversation-card__content">
        <div className="conversation-card__header">
          <span className="conversation-card__display-name">
            {conversation.other_user.display_name}
          </span>

          <span className="conversation-card__username">
            @{conversation.other_user.username}
          </span>
        </div>

        <p className="conversation-card__preview">
          {conversation.last_message?.content ?? "No messages yet"}
        </p>
      </div>
    </Link>
  );
};

export default ConversationCard;
