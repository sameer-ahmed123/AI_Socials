import type { TimelineTab } from "../../Timeline.types";

export interface TimelineHeaderProps {
  activeTab: TimelineTab;

  onTabChange: (tab: TimelineTab) => void;
}
