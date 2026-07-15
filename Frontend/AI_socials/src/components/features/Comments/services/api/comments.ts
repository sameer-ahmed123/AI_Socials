import type { Comment } from "../../types/Comment.model";
import { apiFetch } from "../../../../../services/api/client";
import type { CreateCommentInput } from "../../types/CreateCommentInput.types";

export async function getComments(postId: number): Promise<Comment[]> {
  return apiFetch<Comment[]>(`/posts/${postId}/comments/`, {}, true);
}

export async function createComment(
  postId: number,
  input: CreateCommentInput,
): Promise<Comment> {
  return apiFetch<Comment>(
    `/posts/${postId}/comments/`,
    {
      method: "POST",
      body: JSON.stringify(input),
    },
    true,
  );
}

export async function deleteComment(commentId: number): Promise<void> {
  return apiFetch<void>(
    `/comments/${commentId}/`,
    {
      method: "DELETE",
    },
    true,
  );
}
