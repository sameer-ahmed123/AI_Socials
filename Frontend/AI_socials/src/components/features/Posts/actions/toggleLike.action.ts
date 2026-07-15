import type { Post } from "../../../../models/Post.model";

interface ToggleLikePayload {
  liked: boolean;
  like_count: number;
}

export const toggleLikeAction = (
  posts: Post[],
  postId: number,
  payload: ToggleLikePayload,
): Post[] => {
  return posts.map((post) => {
    if (post.id !== postId) return post;

    return {
      ...post,
      liked: payload.liked,
      like_count: payload.like_count,
    };
  });
};
