import { Bookmark } from "lucide-react";

import Card from "../../components/ui/card/Card";
import EmptyState from "../../components/ui/EmptyState";
import PageContent from "../../components/ui/PageContent";

const BookmarksPage = () => {
  return (
    <PageContent>
      <Card>
        <EmptyState
          className="empty-state--compact"
          icon={<Bookmark size={44} />}
          title="No bookmarks"
          description="Posts you save will appear here for easy access."
        />
      </Card>
    </PageContent>
  );
};

export default BookmarksPage;