import type { Comment } from "../../types/Comment.model";

export interface CommentCardProps {
  comment: Comment;

  loading?: boolean;

  onDelete?: (commentId: number) => void;
}
