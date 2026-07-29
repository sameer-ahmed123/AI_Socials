import type { FeedMode } from "../../../Posts/services/api/feed";

export interface TimelineHeaderProps {
  activeTab: FeedMode;
  onTabChange: (tab: FeedMode) => void;
}
