import { MoreHorizontal } from "lucide-react";

import Card from "../../components/ui/card/Card";
import EmptyState from "../../components/ui/EmptyState";
import PageContent from "../../components/ui/PageContent";

const MorePage = () => {
  return (
    <PageContent>
      <Card>
        <EmptyState
          className="empty-state--compact"
          icon={<MoreHorizontal size={44} />}
          title="More"
          description="Additional features and settings will appear here."
        />
      </Card>
    </PageContent>
  );
};

export default MorePage;
