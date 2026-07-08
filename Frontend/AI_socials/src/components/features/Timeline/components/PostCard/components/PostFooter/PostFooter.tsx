import "./PostFooter.css";

import type { PostFooterProps } from "./PostFooter.types";

const PostFooter = ({ post }: PostFooterProps) => {
  return (
    <footer className="post-footer">
      <button>💬 {post.replies}</button>

      <button>🔁 {post.reposts}</button>

      <button>❤️ {post.likes}</button>

      <button>🔖</button>
    </footer>
  );
};

export default PostFooter;
