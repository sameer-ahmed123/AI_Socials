import {
  Bookmark,
  Heart,
  MessageCircle,
  Repeat2,
} from "lucide-react";

import ActionButton from "./ActionButton";

import "./PostActions.css";

import type { PostActionsProps } from "./PostActions.type";

const PostActions = ({
  post,
  handlers,
}: PostActionsProps) => {
  return (
    <footer className="post-actions">

      <ActionButton
        icon={<MessageCircle size={18} />}
        label="Reply"
        count={post.replies}
        onClick={() => handlers.onReply(post.id)}
      />

      <ActionButton
        icon={<Repeat2 size={18} />}
        label="Repost"
        count={post.reposts}
        active={post.reposted}
        activeClassName="action-button--repost"
        onClick={() => handlers.onRepost(post.id)}
      />

      <ActionButton
        icon={<Heart size={18} />}
        label="Like"
        count={post.likes}
        active={post.liked}
        activeClassName="action-button--like"
        onClick={() => handlers.onLike(post.id)}
      />

      <ActionButton
        icon={<Bookmark size={18} />}
        label="Bookmark"
        active={post.bookmarked}
        activeClassName="action-button--bookmark"
        onClick={() => handlers.onBookmark(post.id)}
      />

    </footer>
  );
};

export default PostActions;