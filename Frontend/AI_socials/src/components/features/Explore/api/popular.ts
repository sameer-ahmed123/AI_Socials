import { apiFetch } from "../../../../services/api/client";
import type { Post } from "../../../../models/Post.model";

export async function getPopularPosts(): Promise<Post[]> {
  return await apiFetch<Post[]>("/posts/popular/", {});
}
