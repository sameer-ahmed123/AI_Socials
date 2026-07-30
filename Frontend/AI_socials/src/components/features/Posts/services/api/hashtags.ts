import { apiFetch } from "../../../../../services/api/client";
import type { Post } from "../../../../../models/Post.model";

export async function getHashtagPosts(hashtag: string): Promise<Post[]> {
  return apiFetch<Post[]>(
    `/posts/hashtag/${encodeURIComponent(hashtag)}/`,
    {},
    true,
  );
}
