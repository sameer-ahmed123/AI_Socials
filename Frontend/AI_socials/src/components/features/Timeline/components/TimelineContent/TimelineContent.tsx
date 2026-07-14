import { Newspaper } from "lucide-react";
import EmptyState from "../../../../ui/EmptyState";
import PostCard from "../PostCard/PostCard";
import type { TimelineContentProps } from "./TimelineContent.types";
import ErrorState from "../../../../common/ErrorState";
import Button from "../../../../ui/Button/Button";
import { usePosts } from "../../../Posts";
import PostCardSkeleton from "../../../../common/PostCardSkeleton";

const TimelineContent = ({ posts, handlers }: TimelineContentProps) => {
  const { error, refreshPosts, loading } = usePosts();
  if (loading) {
    return <PostCardSkeleton count={3} />;
  }

  if (error) {
    return (
      <ErrorState
        title="Couldn't load posts"
        description={error}
        action={<Button onClick={refreshPosts}>Retry</Button>}
      />
    );
  }

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
