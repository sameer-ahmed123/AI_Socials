import { apiFetch } from "../../../../../services/api/client";
import type { PaginatedResponse, Post } from "../../../../../models/Post.model";

export type FeedMode = "following" | "for-you";

export async function getFeed(
  mode: FeedMode,
  cursor?: string,
): Promise<PaginatedResponse<Post>> {
  const endpoint = cursor ? cursor : `/posts/feed/?mode=${mode}`;

  return await apiFetch<PaginatedResponse<Post>>(endpoint, {}, true);
}
