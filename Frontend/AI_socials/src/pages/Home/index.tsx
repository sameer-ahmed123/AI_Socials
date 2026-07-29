import Timeline from "../../components/features/Timeline/Timeline";
import { createPostAction, usePosts } from "../../components/features/Posts";
import PageContent from "../../components/ui/PageContent";
import { useFeed } from "../../components/features/Posts/hooks/useFeed";
import { useState } from "react";
const HomePage = () => {
  const [feedMode, setFeedMode] = useState<"for-you" | "following">("for-you");
  const feed = useFeed(feedMode);

  const postsApi = usePosts({
    onPostCreated: (newPost) => {
      feed.setPosts((previous) =>
        createPostAction({
          posts: previous,
          newPost,
        }),
      );
    },
  });
  return (
    <PageContent>
      <Timeline
        activeTab={feedMode}
        onTabChange={setFeedMode}
        posts={feed.posts}
        onCreatePost={postsApi.createPost}
        onBookmark={feed.toggleBookmark}
        onLike={feed.toggleLike}
        onRepost={feed.toggleRepost}
        onReply={postsApi.handleReply}
        onDelete={feed.deletePost}
        loading={feed.loading}
        error={feed.error}
        onRetry={feed.refreshFeed}
        loadingMore={feed.loadingMore}
        hasMore={feed.hasMore}
        onLoadMore={feed.loadMore}
      />
    </PageContent>
  );
};

export default HomePage;
