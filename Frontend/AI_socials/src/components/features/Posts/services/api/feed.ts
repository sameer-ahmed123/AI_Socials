import { apiFetch } from "../../../../../services/api/client";

import type { Post, PaginatedResponse } from "../../../../../models/Post.model";
export type FeedMode = "following" | "for-you";

export async function getFeed(mode:FeedMode): Promise<Post[]> {
  const response = await apiFetch<PaginatedResponse<Post>>(
    `/posts/feed/?mode=${mode}`,
    {},
    true,
  );
  return response.results;
}
