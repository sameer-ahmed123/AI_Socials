import { useState } from "react";

import { MOCK_POSTS } from "../data/mockPosts";
import type { CreatePostInput } from "../types";

import {
  createPostAction,
  toggleLikeAction,
  toggleBookmarkAction,
  toggleRepostAction,
} from "../actions";

const CURRENT_USER = {
  id: "user-me",

  name: "Sameer",

  username: "@sameer",
};

export const usePosts = () => {
  const [posts, setPosts] = useState(MOCK_POSTS);

  const createPost = (input: CreatePostInput) => {
    setPosts((previous) =>
      createPostAction({
        posts: previous,
        input,
        currentUser: CURRENT_USER,
      }),
    );
  };

  const toggleLike = (postId: string) => {
    setPosts((previous) => toggleLikeAction(previous, postId));
  };

  const toggleBookmark = (postId: string) => {
    setPosts((previous) => toggleBookmarkAction(previous, postId));
  };

  const toggleRepost = (postId: string) => {
    setPosts((previous) => toggleRepostAction(previous, postId));
  };
  const handleReply = (postId: string) => {
    console.log("Reply:", postId);
  };

  return {
    posts,

    createPost,

    toggleLike,

    toggleBookmark,

    toggleRepost,
    handleReply,
  };
};
