import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import "./ConversationHeader.css";

import type { ConversationHeaderProps } from "./ConversationHeader.types";

const ConversationHeader = ({ user }: ConversationHeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="conversation-header">
      <button className="conversation-back-button" onClick={() => navigate(-1)}>
        <ArrowLeft size={22} />
      </button>

      <img
        className="conversation-avatar"
        src={user.avatar}
        alt={user.display_name}
      />

      <section className="conversation-user-info">
        <h3>{user.display_name}</h3>

        <p>@{user.username}</p>
      </section>

      <span className="conversation-status">●</span>
    </header>
  );
};

export default ConversationHeader;
