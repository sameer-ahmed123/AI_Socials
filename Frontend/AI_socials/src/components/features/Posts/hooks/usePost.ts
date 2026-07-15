import { useCallback, useEffect, useState } from "react";
import type { Post } from "../../../../models/Post.model";
import { useAuth } from "../../../../hooks/useAuth";

import {
  getPost as getPostRequest,
  deletePost as deletePostRequest,
  toggleLike as toggleLikeRequest,
  toggleBookmark as toggleBookmarkRequest,
  toggleRepost as toggleRepostRequest,
} from "../services/api/posts";

export const usePost = (postId: number) => {
  const { initializing } = useAuth();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const toggleLike = async () => {
    if (!post) return;

    try {
      const response = await toggleLikeRequest(post.id);

      setPost((previous) => {
        if (!previous) return previous;

        return {
          ...previous,
          liked: response.liked,
          like_count: response.like_count,
        };
      });
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to like post.");
      }
    }
  };

  const toggleBookmark = async () => {
    if (!post) return;

    try {
      const response = await toggleBookmarkRequest(post.id);

      setPost((previous) => {
        if (!previous) return previous;

        return {
          ...previous,
          bookmarked: response.bookmarked,
          bookmark_count: response.bookmark_count,
        };
      });
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to bookmark post.");
      }
    }
  };

  const toggleRepost = async () => {
    if (!post) return;

    try {
      const response = await toggleRepostRequest(post.id);

      setPost((previous) => {
        if (!previous) return previous;

        return {
          ...previous,
          reposted: response.reposted,
          repost_count: response.repost_count,
        };
      });
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to repost.");
      }
    }
  };

  const deletePost = async () => {
    if (!post) return;

    try {
      await deletePostRequest(post.id);

      setPost(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to delete post.");
      }
    }
  };

  const refreshPost = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getPostRequest(postId);
      console.log(response);

      setPost(response);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to load post.");
      }
    } finally {
      setLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    if (initializing) return;
    refreshPost();
  }, [initializing, refreshPost]);

  return {
    post,
    loading,
    error,

    refreshPost,
    toggleLike,
    toggleBookmark,
    toggleRepost,
    deletePost,
  };
};
