import type { Comment } from "../../../../types/Comment.model";

export interface CommentFooterProps {
  comment: Comment;

  loading?: boolean;

  onDelete?: (commentId: number) => void;
}