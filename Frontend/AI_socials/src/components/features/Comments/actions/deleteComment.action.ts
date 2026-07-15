import type { Comment } from "../types/Comment.model";

export const deleteCommentAction = (
  comments: Comment[],
  commentId: number,
): Comment[] => {
  return comments.filter((comment) => comment.id !== commentId);
};
