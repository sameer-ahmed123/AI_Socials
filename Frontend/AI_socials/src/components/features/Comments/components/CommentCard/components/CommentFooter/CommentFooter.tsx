import { Trash2 } from "lucide-react";

import "./CommentFooter.css";

import type { CommentFooterProps } from "./CommentFooter.types";

import { useAuth } from "../../../../../../../hooks/useAuth";
import Skeleton from "../../../../../../ui/Skeleton/Skeleton";

const CommentFooter = ({ comment, loading, onDelete }: CommentFooterProps) => {
  const { user } = useAuth();

  if (loading) {
    return (
      <footer className="comment-footer">
        <Skeleton className="comment-footer__button" />
      </footer>
    );
  }

  const canDelete = user?.id === comment.author.id;

  if (!canDelete) {
    return null;
  }

  return (
    <footer className="comment-footer">
      <button
        type="button"
        className="comment-footer__delete"
        onClick={() => {
          if (!window.confirm("Delete this comment?")) {
            return;
          }
          console.log(
            "comment delete id ",
            comment.id,
            "--",
            typeof comment.id,
          );
          onDelete?.(comment.id);
        }}
      >
        <Trash2 size={16} />

        <span>Delete</span>
      </button>
    </footer>
  );
};

export default CommentFooter;
