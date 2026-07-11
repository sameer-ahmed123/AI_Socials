import { Bell } from "lucide-react";

import Card from "../../components/ui/card/Card";
import EmptyState from "../../components/ui/EmptyState";
import PageContent from "../../components/ui/PageContent";

const NotificationsPage = () => {
  return (
    <PageContent>
      <Card>
        <EmptyState
          className="empty-state--compact"
          icon={<Bell size={44} />}
          title="No notifications"
          description="When someone interacts with your posts, you'll see it here."
        />
      </Card>
    </PageContent>
  );
};

export default NotificationsPage;
