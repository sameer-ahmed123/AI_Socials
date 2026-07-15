import type { Comment } from "../types/Comment.model";

interface CreateCommentActionParams {
  comments: Comment[];
  newComment: Comment;
}

export const createCommentAction = ({
  comments,
  newComment,
}: CreateCommentActionParams): Comment[] => {
  return [...comments, newComment];
};
