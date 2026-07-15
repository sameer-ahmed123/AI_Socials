import { apiFetch } from "../../../../../services/api/client";

import type { Post } from "../../../../../models/Post.model";
import type { CreatePostInput } from "../../types/CreatePostInput";

// Pass true if these endpoints require the Firebase auth token

export async function getPosts(): Promise<Post[]> {
  return apiFetch<Post[]>("/posts/", {}, true);
}

export async function getPost(postId: number): Promise<Post> {
  return apiFetch<Post>(`/posts/${postId}/`, {}, true);
}

export async function createPost(input: CreatePostInput): Promise<Post> {
  return apiFetch<Post>(
    "/posts/",
    {
      method: "POST",
      body: JSON.stringify(input),
    },
    true,
  );
}

export async function deletePost(postId: number): Promise<void> {
  return apiFetch<void>(`/posts/${postId}/`, { method: "DELETE" }, true);
}

export interface ToggleLikeResponse {
  liked: boolean;
  like_count: number;
}

export async function toggleLike(postId: number): Promise<ToggleLikeResponse> {
  return apiFetch<ToggleLikeResponse>(
    `/posts/${postId}/like/`,
    {
      method: "POST",
    },
    true,
  );
}

export interface ToggleBookmarkResponse {
  bookmarked: boolean;
  bookmark_count: number;
}

export async function toggleBookmark(
  postId: number,
): Promise<ToggleBookmarkResponse> {
  return apiFetch<ToggleBookmarkResponse>(
    `/posts/${postId}/bookmark/`,
    {
      method: "POST",
    },
    true,
  );
}

export interface ToggleRepostResponse {
  reposted: boolean;
  repost_count: number;
}

export async function toggleRepost(
  postId: number,
): Promise<ToggleRepostResponse> {
  return apiFetch<ToggleRepostResponse>(
    `/posts/${postId}/repost/`,
    {
      method: "POST",
    },
    true,
  );
}
