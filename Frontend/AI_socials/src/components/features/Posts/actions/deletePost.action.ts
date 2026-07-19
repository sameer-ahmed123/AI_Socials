import type { Post } from "../../../../models/Post.model";

export const deletePostAction = (posts: Post[], postId: number): Post[] => {
  return posts.filter((post) => post.id !== postId);
};
