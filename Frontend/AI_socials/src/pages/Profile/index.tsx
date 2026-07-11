import { User } from "lucide-react";
import { useParams } from "react-router-dom";

import Card from "../../components/ui/card/Card";
import EmptyState from "../../components/ui/EmptyState";
import PageContent from "../../components/ui/PageContent";

const ProfilePage = () => {
  const { username } = useParams();

  return (
    <PageContent>
      <Card>
        <EmptyState
          className="empty-state--compact"
          icon={<User size={44} />}
          title={`@${username}`}
          description="This profile page is under construction."
        />
      </Card>
    </PageContent>
  );
};

export default ProfilePage;
