import "./ChatWindow.css";
import MessageComposer from "./MessageComposer";
import { useConversation } from "../../hooks/useConversation";
import LoadingScreen from "../../../../common/loadingScreen/LoadingScreen";
import EmptyState from "../../../../ui/EmptyState";
import { useAuth } from "../../../../../hooks/useAuth";
import ConversationHeader from "../ConversationHeader/ConversationHeader";
import MessageList from "./MessageList";

interface Props {
  conversationId: number;
}

const ChatWindow = ({ conversationId }: Props) => {
  const { user } = useAuth();
  const { conversation, messages, loading, error } =
    useConversation(conversationId);
  console.log(conversation);
  if (loading) {
    return <LoadingScreen />;
  }

  if (error || !conversation) {
    return (
      <EmptyState
        title="Conversation unavailable"
        description={error || "Conversation not found"}
      />
    );
  }

  return (
    <div className="chat-window">
      <ConversationHeader user={conversation.conversation.other_user} />
      <MessageList messages={messages} currentUserId={user!.id} />

      <MessageComposer conversationId={conversationId} />
    </div>
  );
};

export default ChatWindow;
