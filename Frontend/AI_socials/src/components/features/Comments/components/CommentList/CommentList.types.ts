import type { Comment } from "../../types/Comment.model";

export interface CommentListProps {
  comments: Comment[];

  loading?: boolean;

  onDelete?: (commentId: number) => void;
}
