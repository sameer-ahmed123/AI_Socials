import { useState, useEffect } from "react";
import { useAuth } from "../../../../hooks/useAuth";
import type { CreatePostInput } from "../types";

import {
  getPosts as getPostsApi,
  createPost as createPostApi,
  deletePost as deletePostRequest,
  toggleLike as toggleLikeRequest,
  toggleBookmark as toggleBookmarkRequest,
  toggleRepost as toggleRepostRequest,
} from "../services/api/posts";
import {
  createPostAction,
  toggleLikeAction,
  toggleBookmarkAction,
  toggleRepostAction,
  deletePostAction,
} from "../actions";
import type { Post } from "../../../../models/Post.model";
import { useNavigate } from "react-router-dom";

export const usePosts = () => {
  const navigate = useNavigate();
  const { initializing } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const createPost = async (input: CreatePostInput) => {
    setError(null);
    try {
      const newPost = await createPostApi(input);

      setPosts((previous) =>
        createPostAction({
          posts: previous,
          newPost,
        }),
      );
    } catch (err) {
      if (err instanceof Error) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to create post.";
        setError(errorMessage);
        throw new Error(errorMessage, { cause: err });
      } else {
        setError("Failed to create post.");
      }
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
        setError("Failed to Like post.");
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
        setError("Failed to bookmark post.");
      }
    }
  };
  const handleReply = (postId: number) => {
    navigate(`/posts/${postId}`);
  };

  const refreshPosts = async () => {
    setLoading(true);
    setError(null);

    try {
      const posts = await getPostsApi();
      setPosts(posts);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initializing) return;

    refreshPosts();
  }, [initializing]);

  return {
    posts,

    loading,
    error,
    createPost,
    deletePost,
    toggleLike,

    toggleBookmark,
    toggleRepost,
    handleReply,
    refreshPosts,
  };
};
