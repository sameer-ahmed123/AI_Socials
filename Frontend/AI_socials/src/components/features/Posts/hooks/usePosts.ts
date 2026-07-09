import { useState } from "react";

import { MOCK_POSTS } from "../data/mockPosts";

export const usePosts = () => {
  const [posts, setPosts] = useState(MOCK_POSTS);

  return {
    posts,
    setPosts,
  };
};
