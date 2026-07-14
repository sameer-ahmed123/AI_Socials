import { apiFetch } from "../../../../../services/api/client";

import type { Post } from "../../../../../models/Post.model";
import type { CreatePostInput } from "../../types/CreatePostInput";

// Pass true if these endpoints require the Firebase auth token

export async function getPosts(): Promise<Post[]> {
  return apiFetch<Post[]>("/posts/");
}

export async function getPost(postId: number): Promise<Post> {
  return apiFetch<Post>(`/posts/${postId}/`);
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
