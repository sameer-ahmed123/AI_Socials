import { useState } from "react";

import "./Timeline.css";

import TimelineHeader from "./components/TimelineHeader/TimelineHeader";
import Composer from "./components/Composer/Composer";
import TimelineContent from "./components/TimelineContent/TimelineContent";

import type { TimelineProps, TimelineTab } from "./Timeline.types";
const Timeline = ({ onCreatePost, posts }: TimelineProps) => {
  const [activeTab, setActiveTab] = useState<TimelineTab>("for-you");
  return (
    <section className="timeline">
      <TimelineHeader activeTab={activeTab} onTabChange={setActiveTab} />

      <Composer onCreatePost={onCreatePost} />

      <TimelineContent posts={posts} />
    </section>
  );
};

export default Timeline;
