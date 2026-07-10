import type { Post } from "../models";

export const toggleBookmarkAction = (posts: Post[], postId: string): Post[] => {
  return posts.map((post) => {
    if (post.id !== postId) return post;

    return {
      ...post,

      bookmarked: !post.bookmarked,
    };
  });
};
