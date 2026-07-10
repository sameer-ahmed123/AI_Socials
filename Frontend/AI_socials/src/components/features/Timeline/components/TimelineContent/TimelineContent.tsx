import PostCard from "../PostCard/PostCard";
import type { TimelineContentProps } from "./TimelineContent.types";

const TimelineContent = ({ posts, handlers }: TimelineContentProps) => {
  if (posts.length === 0) {
    return <div>No posts yet.</div>;
  }

  return (
    <>
      {posts.map((post) => (
        <PostCard handlers={handlers} key={post.id} post={post} />
      ))}
    </>
  );
};

export default TimelineContent;
