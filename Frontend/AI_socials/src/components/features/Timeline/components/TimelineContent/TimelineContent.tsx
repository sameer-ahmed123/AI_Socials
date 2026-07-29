import { useEffect, useRef } from "react";
import { Newspaper } from "lucide-react";

import EmptyState from "../../../../ui/EmptyState";
import ErrorState from "../../../../common/ErrorState";
import Button from "../../../../ui/Button/Button";
import PostCardSkeleton from "../../../../common/PostCardSkeleton";

import PostCard from "../PostCard/PostCard";

import type { TimelineContentProps } from "./TimelineContent.types";

const TimelineContent = ({
  posts,
  handlers,
  loading,
  loadingMore,
  error,
  onRetry,
  hasMore,
  onLoadMore,
}: TimelineContentProps) => {
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasMore) return;

    const sentinel = sentinelRef.current;

    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        console.log("Observer fired:", entries[0].isIntersecting);

        if (entries[0].isIntersecting && !loadingMore) {
          console.log("Loading more...");
          onLoadMore();
        }
      },
      {
        root: null,
        rootMargin: "200px",
        threshold: 0,
      },
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [hasMore, loadingMore, onLoadMore]);

  if (loading) {
    return <PostCardSkeleton count={3} />;
  }

  if (error) {
    return (
      <ErrorState
        title="Couldn't load posts"
        description={error}
        action={<Button onClick={onRetry}>Retry</Button>}
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
        <PostCard key={post.id} post={post} handlers={handlers} />
      ))}

      {hasMore && <div ref={sentinelRef} />}

      {loadingMore && <PostCardSkeleton count={2} />}
    </>
  );
};

export default TimelineContent;
