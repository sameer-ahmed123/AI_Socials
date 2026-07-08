import { useState } from "react";

import "./Timeline.css";

import TimelineHeader from "./components/TimelineHeader/TimelineHeader";
import Composer from "./components/Composer/Composer";
import TimelineContent from "./components/TimelineContent/TimelineContent";

import type { TimelineTab } from "./Timeline.types";
import { MOCK_POSTS } from "./data/mockPosts";

const Timeline = () => {
  const [activeTab, setActiveTab] = useState<TimelineTab>("for-you");
  const [posts,setPosts]=useState(MOCK_POSTS);

  const handleComposerSubmit=(content:string)=>{
    console.log(content);
  };
  return (
    <section className="timeline">
      <TimelineHeader activeTab={activeTab} onTabChange={setActiveTab} />

      <Composer onSubmit={handleComposerSubmit} />

      <TimelineContent posts={posts}/>

    </section>
  );
};

export default Timeline;
