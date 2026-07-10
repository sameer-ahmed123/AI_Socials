import { useState } from "react";

import "./Timeline.css";

import TimelineHeader from "./components/TimelineHeader/TimelineHeader";
import Composer from "./components/Composer/Composer";
import TimelineContent from "./components/TimelineContent/TimelineContent";

import type { TimelineProps, TimelineTab } from "./Timeline.types";
import type { PostCardHandlers } from "./components/PostCard/PostCard.types";
const Timeline = ({
  onCreatePost,
  posts,
  onBookmark,
  onLike,
  onReply,
  onRepost,
}: TimelineProps) => {
  const [activeTab, setActiveTab] = useState<TimelineTab>("for-you");
  const handlers: PostCardHandlers = {
    onReply,
    onLike,
    onRepost,
    onBookmark,
  };
  return (
    <section className="timeline">
      <TimelineHeader activeTab={activeTab} onTabChange={setActiveTab} />

      <Composer onCreatePost={onCreatePost} />

      <TimelineContent handlers={handlers} posts={posts} />
    </section>
  );
};

export default Timeline;
