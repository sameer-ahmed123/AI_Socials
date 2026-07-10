import { useState } from "react";

import "./Timeline.css";

import TimelineHeader from "./components/TimelineHeader/TimelineHeader";
import Composer from "./components/Composer/Composer";
import TimelineContent from "./components/TimelineContent/TimelineContent";

import type { TimelineTab } from "./Timeline.types";
import { usePosts } from "../Posts/idex";
const Timeline = () => {
  const [activeTab, setActiveTab] = useState<TimelineTab>("for-you");
  const {posts} = usePosts()
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
