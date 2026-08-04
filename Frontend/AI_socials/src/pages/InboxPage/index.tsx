import PageContent from "../../components/ui/PageContent";
import Card from "../../components/ui/card/Card";

import Inbox from "../../components/features/Chats/components/Inbox/Inbox";
import ProfileNavigation from "../../components/features/Profile/components/ProfileNavigation/ProfileNavigation";

const InboxPage = () => {
  return (
    <PageContent>
      <ProfileNavigation />
      <Card>
        <Inbox />
      </Card>
    </PageContent>
  );
};

export default InboxPage;
