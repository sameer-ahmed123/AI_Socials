import "./PostBody.css";

import RichText from "../../../../../../ui/RichText";
import type { PostBodyProps } from "./PostBody.types";

const PostBody = ({ content }: PostBodyProps) => {
  return (
    <div className="post-body">
      <p>
        <RichText text={content} />
      </p>
    </div>
  );
};

export default PostBody;
