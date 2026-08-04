import { Navigate, useParams } from "react-router-dom";
import "../../components/features/Chats/components/chatwindow/ChatWindow.css"
import PageContent from "../../components/ui/PageContent";
import Card from "../../components/ui/card/Card";
import ChatWindow from "../../components/features/Chats/components/chatwindow/ChatWindow";

const ConversationPage = () => {
  const { conversationId } = useParams();

  if (!conversationId) {
    return <Navigate to="/messages" replace />;
  }

  return (
    <PageContent className="inbox_area">
      <Card>
        <ChatWindow conversationId={Number(conversationId)} />
      </Card>
    </PageContent>
  );
};

export default ConversationPage;
