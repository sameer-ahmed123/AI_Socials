import "./Timeline.css";
import TimelineHeader from "./components/TimelineHeader/TimelineHeader";
import Composer from "./components/Composer/Composer";
import TimelineContent from "./components/TimelineContent/TimelineContent";
import type { TimelineProps } from "./Timeline.types";
import type { PostCardHandlers } from "./components/PostCard/PostCard.types";
const Timeline = ({
  activeTab,
  onTabChange,
  onCreatePost,
  posts,
  onBookmark,
  onLike,
  onReply,
  onRepost,
  onDelete,
  loading,
  error,
  onRetry,
}: TimelineProps) => {
  const handlers: PostCardHandlers = {
    onReply,
    onLike,
    onRepost,
    onBookmark,
    onDelete,
  };
  return (
    <section className="timeline">
      <TimelineHeader activeTab={activeTab} onTabChange={onTabChange} />

      <Composer onCreatePost={onCreatePost} />

      <TimelineContent
        handlers={handlers}
        posts={posts}
        loading={loading}
        error={error}
        onRetry={onRetry}
      />
    </section>
  );
};

export default Timeline;
