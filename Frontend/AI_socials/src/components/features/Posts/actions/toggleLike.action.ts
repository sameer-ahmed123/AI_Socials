import type { Post } from "../models";

export const toggleLikeAction = (posts: Post[], postId: string): Post[] => {
  return posts.map((post) => {
    if (post.id !== postId) return post;

    const liked = !post.liked;

    return {
      ...post,

      liked,

      likes: liked ? post.likes + 1 : post.likes - 1,
    };
  });
};
