import type { Post } from "../models";

export const deletePostAction = (posts: Post[], postId: number): Post[] => {
  return posts.filter((post) => post.id !== postId);
};
