import type { Post } from "../../../../models/Post.model";

interface ToggleBookmarkPayload {
  bookmarked: boolean;
  bookmark_count: number;
}

export const toggleBookmarkAction = (
  posts: Post[],
  postId: number,
  payload: ToggleBookmarkPayload,
): Post[] => {
  return posts.map((post) => {
    if (post.id !== postId) {
      return post;
    }

    return {
      ...post,
      bookmarked: payload.bookmarked,
      bookmark_count: payload.bookmark_count,
    };
  });
};
