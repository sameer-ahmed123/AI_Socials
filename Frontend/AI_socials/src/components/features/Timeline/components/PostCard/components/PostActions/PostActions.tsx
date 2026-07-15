import { Bookmark, Heart, MessageCircle, Repeat2, Trash2 } from "lucide-react";
import Skeleton from "../../../../../../ui/Skeleton/Skeleton";
import ActionButton from "../PostActions/ActionButton";

import "./PostActions.css";

import type { PostActionsProps } from "./PostActions.type";
import { useAuth } from "../../../../../../../hooks/useAuth";
const PostActions = ({ post, loading, handlers }: PostActionsProps) => {
  const { user } = useAuth();
  if (loading) {
    return (
      <footer className="post-actions">
        <Skeleton className="post-action-skeleton" />
        <Skeleton className="post-action-skeleton" />
        <Skeleton className="post-action-skeleton" />
        <Skeleton className="post-action-skeleton" />
      </footer>
    );
  }
  return (
    <footer className="post-actions">
      <ActionButton
        icon={<MessageCircle size={18} />}
        variant="reply"
        ariaLabel="Reply to post"
        onClick={() => handlers.onReply(post.id)}
      />

      <ActionButton
        icon={<Repeat2 size={18} />}
        count={post.repost_count}
        active={post.reposted}
        variant="repost"
        ariaLabel="Repost post"
        onClick={() => handlers.onRepost(post.id)}
      />

      <ActionButton
        icon={<Heart size={18} />}
        count={post.like_count}
        active={post.liked}
        variant="like"
        ariaLabel="Like post"
        onClick={() => handlers.onLike(post.id)}
      />

      <ActionButton
        icon={<Bookmark size={18} />}
        variant="bookmark"
        count={post.bookmark_count}
        active={post.bookmarked}
        ariaLabel="Bookmark post"
        onClick={() => handlers.onBookmark(post.id)}
      />

      {user?.id === post?.author.id && (
        <ActionButton
          icon={<Trash2 size={18} />}
          variant="delete"
          ariaLabel="delete post"
          onClick={async () => {
            if (!window.confirm("Delete this post?")) return;

            try {
              await handlers.onDelete(post.id);
            } catch {
              alert("Couldn't delete post.");
            }
          }}
        />
      )}
    </footer>
  );
};

export default PostActions;
