import "./PostBody.css";

import RichText from "../../../../../../ui/RichText";
import type { PostBodyProps } from "./PostBody.types";
import Skeleton from "../../../../../../ui/Skeleton/Skeleton";

const PostBody = ({ content, loading = false }: PostBodyProps) => {
  if (loading) {
    return (
      <>
        <Skeleton className="post-body__line" />

        <Skeleton className="post-body__line" />

        <Skeleton className="post-body__line post-body__line--short" />
      </>
    );
  }

  return (
    <div className="post-body">
      <p>
        <RichText text={content} />
      </p>
    </div>
  );
};

export default PostBody;
