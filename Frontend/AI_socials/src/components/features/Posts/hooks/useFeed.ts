import { useEffect, useState } from "react";
import { getFeed, type FeedMode } from "../services/api/feed";
import type { Post } from "../../../../models/Post.model";
import { useAuth } from "../../../../hooks/useAuth";

import {
  deletePost as deletePostRequest,
  toggleLike as toggleLikeRequest,
  toggleBookmark as toggleBookmarkRequest,
  toggleRepost as toggleRepostRequest,
} from "../services/api/posts";

import {
  deletePostAction,
  toggleLikeAction,
  toggleBookmarkAction,
  toggleRepostAction,
} from "../actions";

export const useFeed = (mode: FeedMode) => {
  const { initializing } = useAuth();

  const [posts, setPosts] = useState<Post[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshFeed = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getFeed(mode);

      setPosts(response.results);
      setNextCursor(response.next);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Couldn't load feed.");
      }
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    if (!nextCursor || loadingMore) return;

    setLoadingMore(true);

    try {
      const response = await getFeed(mode, nextCursor);

      setPosts((previous) => [...previous, ...response.results]);

      setNextCursor(response.next);
    } finally {
      setLoadingMore(false);
    }
  };
  const deletePost = async (postId: number) => {
    setError(null);

    try {
      await deletePostRequest(postId);

      setPosts((previous) => deletePostAction(previous, postId));
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to delete post.");
      }
    }
  };

  const toggleLike = async (postId: number) => {
    try {
      const response = await toggleLikeRequest(postId);

      setPosts((previous) => toggleLikeAction(previous, postId, response));
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to like post.");
      }
    }
  };

  const toggleBookmark = async (postId: number) => {
    try {
      const response = await toggleBookmarkRequest(postId);

      setPosts((previous) => toggleBookmarkAction(previous, postId, response));
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to bookmark post.");
      }
    }
  };

  const toggleRepost = async (postId: number) => {
    try {
      const response = await toggleRepostRequest(postId);

      setPosts((previous) => toggleRepostAction(previous, postId, response));
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to repost post.");
      }
    }
  };

  useEffect(() => {
    if (initializing) return;

    refreshFeed();
  }, [initializing, mode]);

  return {
    posts,
    setPosts,
    loading,
    loadMore,
    error,
    refreshFeed,
    toggleLike,
    toggleBookmark,
    toggleRepost,
    deletePost,
  };
};
