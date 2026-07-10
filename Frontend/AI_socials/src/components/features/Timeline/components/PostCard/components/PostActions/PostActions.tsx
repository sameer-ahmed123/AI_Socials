import {
  Bookmark,
  Heart,
  MessageCircle,
  Repeat2,
} from "lucide-react";

import ActionButton from "../PostActions/ActionButton";

import "./PostActions.css";

import type { PostActionsProps } from "./PostActions.type";

const PostActions = ({ post, handlers }: PostActionsProps) => {
  return (
    <footer className="post-actions">
      <ActionButton
        icon={<MessageCircle size={18} />}
        count={post.replies}
        variant="reply"
        ariaLabel="Reply to post"
        onClick={() => handlers.onReply(post.id)}
      />

      <ActionButton
        icon={<Repeat2 size={18} />}
        count={post.reposts}
        active={post.reposted}
        variant="repost"
        ariaLabel="Repost post"
        onClick={() => handlers.onRepost(post.id)}
      />

      <ActionButton
        icon={<Heart size={18} />}
        count={post.likes}
        active={post.liked}
        variant="like"
        ariaLabel="Like post"
        onClick={() => handlers.onLike(post.id)}
      />

      <ActionButton
        icon={<Bookmark size={18} />}
        variant="bookmark"
        active={post.bookmarked}
        ariaLabel="Bookmark post"
        onClick={() => handlers.onBookmark(post.id)}
      />
    </footer>
  );
};

export default PostActions;