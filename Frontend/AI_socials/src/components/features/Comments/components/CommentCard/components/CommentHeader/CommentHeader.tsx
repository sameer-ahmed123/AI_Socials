import Skeleton from "../../../../../../ui/Skeleton/Skeleton";
import Avatar from "../../../../../../ui/Avatar/Avatar";

import "./CommentHeader.css";

import type { CommentHeaderProps } from "./CommentHeader.types";
import { formatRelativeTime } from "../../../../../../../utils/date/formatRelativeTime";
import { Link } from "react-router-dom";

const CommentHeader = ({ comment, loading }: CommentHeaderProps) => {
  if (loading) {
    return (
      <header className="comment-header">
        <Skeleton className="comment-header__avatar" />

        <div className="comment-header__content">
          <Skeleton className="comment-header__name" />
          <Skeleton className="comment-header__meta" />
        </div>
      </header>
    );
  }

  return (
    <header className="comment-header">
      <Link to={`/profile/${comment.author.username}`}>
        <Avatar
          image={comment.author.avatar}
          alt={comment.author.display_name}
          size="sm"
        />
      </Link>
      <div className="comment-header__content">
        <div className="comment-header__name-row">
          <span className="comment-header__display-name">
            {comment.author.display_name}
          </span>

          {comment.author.is_verified && (
            <span className="comment-header__verified">✓</span>
          )}
        </div>

        <div className="comment-header__meta">
          @{comment.author.username}
          {" · "}
          {comment?.created_at ? formatRelativeTime(comment.created_at) : ""}
        </div>
      </div>
    </header>
  );
};

export default CommentHeader;
