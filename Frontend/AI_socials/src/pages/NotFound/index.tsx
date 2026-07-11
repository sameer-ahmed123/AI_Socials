import { FileQuestion } from "lucide-react";

import Card from "../../components/ui/card/Card";
import EmptyState from "../../components/ui/EmptyState";
import PageContent from "../../components/ui/PageContent";

const MorePage = () => {
  return (
    <PageContent>
      <Card>
        <EmptyState
          className="empty-state--compact"
          icon={<FileQuestion size={44} />}
          title="Not Found"
          description="This is not the  Page you are looking for."
        />
      </Card>
    </PageContent>
  );
};

export default MorePage;
