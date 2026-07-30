import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TimelineContent from "../../components/features/Timeline/components/TimelineContent/TimelineContent";
import { getHashtagPosts } from "../../components/features/Posts/services/api/hashtags";

import type { Post } from "../../models/Post.model";
import type { PostCardHandlers } from "../../components/features/Timeline/components/PostCard/PostCard.types";
import HashtagHeader from "./components/HashtagHeader";

const emptyHandlers: PostCardHandlers = {
  onReply: () => {},
  onLike: () => {},
  onRepost: () => {},
  onBookmark: () => {},
  onDelete: async () => {},
};

const HashtagPage = () => {
  const { hashtag_name } = useParams();

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!hashtag_name) return;

    async function load() {
      try {
        setLoading(true);

        const data = await getHashtagPosts(hashtag_name);

        setPosts(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to load hashtag.");
        }
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [hashtag_name]);

  return (
    <>
      <HashtagHeader hashtag={hashtag_name!} postCount={posts.length} />

      <TimelineContent
        posts={posts}
        handlers={emptyHandlers}
        loading={loading}
        loadingMore={false}
        error={error}
        onRetry={() => {}}
        hasMore={false}
        onLoadMore={() => {}}
      />
    </>
  );
};

export default HashtagPage;
