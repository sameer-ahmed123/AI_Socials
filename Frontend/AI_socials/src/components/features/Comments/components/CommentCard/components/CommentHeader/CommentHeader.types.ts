import type { Comment } from "../../../../types/Comment.model";

export interface CommentHeaderProps {
  comment: Comment;

  loading?: boolean;
}