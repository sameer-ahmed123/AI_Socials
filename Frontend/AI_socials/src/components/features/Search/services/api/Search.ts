import { apiFetch } from "../../../../../services/api/client";
import type { Post } from "../../../../../models/Post.model";
import type { SearchUser } from "../../types/SearchUser.model";
import type { SearchHashtag } from "../../types/SearchHashtag.model";

export async function searchUsers(query: string): Promise<SearchUser[]> {
  return apiFetch<SearchUser[]>(
    `/search/?q=${encodeURIComponent(query)}&scope=users`,
    {},
    true,
  );
}

export async function searchPosts(query: string): Promise<Post[]> {
  return apiFetch<Post[]>(
    `/search/?q=${encodeURIComponent(query)}&scope=posts`,
    {},
    true,
  );
}

export async function searchHashtags(query: string): Promise<SearchHashtag[]> {
  return apiFetch<SearchHashtag[]>(
    `/search/?q=${encodeURIComponent(query)}&scope=hashtags`,
    {},
    true,
  );
}
