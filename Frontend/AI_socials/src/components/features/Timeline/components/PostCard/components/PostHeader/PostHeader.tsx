import Avatar from "../../../../../../ui/Avatar/Avatar";
import { formatRelativeTime } from "../../../../../../../utils/date/formatRelativeTime";

import "./PostHeader.css";
import PostMenu from "../PostMenu/PostMenu";
import type { PostHeaderProps } from "./PostHeader.types";

const PostHeader = ({ post }: PostHeaderProps) => {
  const avatarImage = post?.author?.avatar;
  const avatarInitials = post?.author?.display_name
    ? post.author.display_name.charAt(0).toUpperCase()
    : "";
  // console.log("created",post.created_at)
  return (
    <header className="post-header">
      <Avatar image={avatarImage} initials={avatarInitials} />

      <div className="post-header__info">
        <div className="post-header__top">
          <span className="post-header__name">{post?.author.display_name}</span>

          <span className="post-header__username">{post?.author.username}</span>

          <span className="post-header__time">
            • {post?.created_at ? formatRelativeTime(post.created_at) : ""}
          </span>
        </div>
      </div>
      {post?.id && <PostMenu postId={post.id} />}
    </header>
  );
};

export default PostHeader;
