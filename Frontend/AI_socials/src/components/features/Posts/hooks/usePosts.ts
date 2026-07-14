import { useState, useEffect } from "react";
import { MOCK_POSTS } from "../data/mockPosts";
import type { CreatePostInput } from "../types";

import {
  getPosts as getPostsApi,
  createPost as createPostApi,
  deletePost as deletePostRequest,
} from "../services/api/posts";
import {
  createPostAction,
  toggleLikeAction,
  toggleBookmarkAction,
  toggleRepostAction,
  deletePostAction,
} from "../actions";
import type { Post } from "../../../../models/Post.model";

export const usePosts = () => {
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
        setError(err.message);
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

  const toggleLike = (postId: number) => {
    setPosts((previous) => toggleLikeAction(previous, postId));
  };

  const toggleBookmark = (postId: number) => {
    setPosts((previous) => toggleBookmarkAction(previous, postId));
  };

  const toggleRepost = (postId: number) => {
    setPosts((previous) => toggleRepostAction(previous, postId));
  };
  const handleReply = (postId: number) => {
    console.log("Reply:", postId);
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
    refreshPosts();
  }, []);

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
