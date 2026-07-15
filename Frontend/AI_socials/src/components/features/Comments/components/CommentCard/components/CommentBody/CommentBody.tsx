import RichText from "../../../../../../ui/RichText";
import Skeleton from "../../../../../../ui/Skeleton/Skeleton";

import "./CommentBody.css";

import type { CommentBodyProps } from "./CommentBody.type";

const CommentBody = ({ content, loading }: CommentBodyProps) => {
  if (loading) {
    return (
      <div className="comment-body">
        <Skeleton className="comment-body__line" />
        <Skeleton className="comment-body__line" />
        <Skeleton className="comment-body__line comment-body__line--short" />
      </div>
    );
  }

  return (
    <div className="comment-body">
      <p>
        {" "}
        <RichText text={content} />
      </p>
    </div>
  );
};

export default CommentBody;
