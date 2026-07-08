import "./PostBody.css";

import type { PostBodyProps } from "./PostBody.types";

const PostBody = ({ content }: PostBodyProps) => {
  return (
    <div className="post-body">
      <p>{content}</p>
    </div>
  );
};

export default PostBody;
