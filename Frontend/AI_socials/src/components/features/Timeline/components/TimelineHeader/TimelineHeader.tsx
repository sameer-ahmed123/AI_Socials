import Tabs from "../../../../ui/Tabs/Tabs";

import { TIMELINE_TABS } from "../../constants/tabs";

import type { TimelineHeaderProps } from "./TimelineHeader.types";

const TimelineHeader = ({ activeTab, onTabChange }: TimelineHeaderProps) => {
  return (
    <Tabs
      items={TIMELINE_TABS}
      activeTab={activeTab}
      onChange={(id) => onTabChange(id as typeof activeTab)}
    />
  );
};

export default TimelineHeader;
