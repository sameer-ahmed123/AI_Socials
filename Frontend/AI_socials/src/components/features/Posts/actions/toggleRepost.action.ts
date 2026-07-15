import type { Post } from "../../../../models/Post.model";

interface ToggleRepostPayload {
  reposted: boolean;
  repost_count: number;
}

export const toggleRepostAction = (
  posts: Post[],
  postId: number,
  payload: ToggleRepostPayload,
): Post[] => {
  return posts.map((post) => {
    if (post.id !== postId) {
      return post;
    }

    return {
      ...post,
      reposted: payload.reposted,
      repost_count: payload.repost_count,
    };
  });
};