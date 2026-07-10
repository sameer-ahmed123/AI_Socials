import { Newspaper } from "lucide-react";
import EmptyState from "../../../../ui/EmptyState";
import PostCard from "../PostCard/PostCard";
import type { TimelineContentProps } from "./TimelineContent.types";

const TimelineContent = ({ posts, handlers }: TimelineContentProps) => {
  if (posts.length === 0) {
    return (
      <EmptyState
      
        icon={<Newspaper size={52} />}
        title="No posts yet"
        description="Be the first to share something with your community."
      />
    );
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
