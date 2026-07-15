import "./CommentCard.css";

import type { CommentCardProps } from "./CommentCard.type";

import CommentHeader from "./components/CommentHeader/CommentHeader";
import CommentBody from "./components/CommentBody/CommentBody";
import CommentFooter from "./components/CommentFooter/CommentFooter";

const CommentCard = ({
  comment,
  loading = false,
  onDelete,
}: CommentCardProps) => {
  return (
    <article className="comment-card">
      <CommentHeader loading={loading} comment={comment} />

      <CommentBody loading={loading} content={comment.content} />

      <CommentFooter loading={loading} comment={comment} onDelete={onDelete} />
    </article>
  );
};

export default CommentCard;
