import { apiFetch } from "../../../../../services/api/client";
import type {
  PaginatedResponse,
  Post,
} from "../../../../../models/Post.model";

export type FeedMode = "following" | "for-you";

export async function getFeed(
  mode: FeedMode,
  cursor?: string,
): Promise<PaginatedResponse<Post>> {
  let endpoint = `/posts/feed/?mode=${mode}`;

  if (cursor) {
    const url = new URL(cursor);

    endpoint = `${url.pathname.replace("/api", "")}${url.search}`;
  }

  return apiFetch<PaginatedResponse<Post>>(endpoint, {}, true);
}