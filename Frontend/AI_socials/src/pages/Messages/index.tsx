import { Mail } from "lucide-react";

import Card from "../../components/ui/card/Card";
import EmptyState from "../../components/ui/EmptyState";
import PageContent from "../../components/ui/PageContent";

const MessagesPage = () => {
  return (
    <PageContent>
      <Card>
        <EmptyState
          className="empty-state--compact"
          icon={<Mail size={44} />}
          title="No messages"
          description="Private conversations will appear here."
        />
      </Card>
    </PageContent>
  );
};

export default MessagesPage;
