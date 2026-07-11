import { Search } from "lucide-react";

import Card from "../../components/ui/card/Card";
import EmptyState from "../../components/ui/EmptyState";
import PageContent from "../../components/ui/PageContent";

const ExplorePage = () => {
  return (
    <PageContent>
      <Card>
        <EmptyState
          className="empty-state--compact"
          icon={<Search size={44} />}
          title="Explore"
          description="Search and discover trending conversations. This feature is coming soon."
        />
      </Card>
    </PageContent>
  );
};

export default ExplorePage;
