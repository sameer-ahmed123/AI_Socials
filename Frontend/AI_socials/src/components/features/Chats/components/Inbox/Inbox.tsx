import "./Inbox.css";
import ConversationCard from "./ConversationCard";
import { useInbox } from "../../hooks/useInbox";
import LoadingScreen from "../../../../common/loadingScreen/LoadingScreen";
import EmptyState from "../../../../ui/EmptyState";

const Inbox = () => {
  const { conversations, loading, error } = useInbox();

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <EmptyState title="Inbox unavailable" description={error} />;
  }

  if (!conversations.length) {
    return (
      <EmptyState
        title="No conversations"
        description="Start chatting with someone."
      />
    );
  }

  return (
    <div className="inbox">
      {conversations.map((conversation) => (
        <ConversationCard key={conversation.id} conversation={conversation} />
      ))}
    </div>
  );
};

export default Inbox;
