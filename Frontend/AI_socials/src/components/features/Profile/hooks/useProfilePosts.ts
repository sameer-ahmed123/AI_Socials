import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../../../hooks/useAuth";
import type { Post } from "../../../../models/Post.model";
import { getProfilePosts as getProfilePostsRequest } from "../services/api/profile";
import {
  toggleLike as toggleLikeRequest,
  toggleBookmark as toggleBookmarkRequest,
  toggleRepost as toggleRepostRequest,
  deletePost as deletePostRequest,
} from "../../Posts/services/api/posts";
import {
  toggleLikeAction,
  toggleBookmarkAction,
  toggleRepostAction,
  deletePostAction,
} from "../../Posts/actions";
export const useProfilePosts = (username?: string) => {
  const { initializing } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        setError("Failed to repost.");
      }
    }
  };

  const deletePost = async (postId: number) => {
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

  const refresh = useCallback(async () => {
    if (!username) return;
    setLoading(true);
    setError(null);

    try {
      const response = await getProfilePostsRequest(username);
      setPosts(response);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to load profile posts.");
      }
    } finally {
      setLoading(false);
    }
  }, [username]);

  useEffect(() => {
    if (initializing) return;
    refresh();
  }, [initializing, refresh]);

  return {
    posts,
    loading,
    error,
    refresh,
    toggleLike,
    toggleRepost,
    toggleBookmark,
    deletePost
  };
};
