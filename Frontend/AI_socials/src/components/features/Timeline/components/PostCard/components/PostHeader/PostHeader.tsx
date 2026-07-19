import Avatar from "../../../../../../ui/Avatar/Avatar";
import { formatRelativeTime } from "../../../../../../../utils/date/formatRelativeTime";

import "./PostHeader.css";
import PostMenu from "../PostMenu/PostMenu";
import type { PostHeaderProps } from "./PostHeader.types";
import { Link } from "react-router-dom";

const PostHeader = ({ post }: PostHeaderProps) => {
  const avatarImage = post?.author?.avatar;
  const avatarInitials = post?.author?.display_name
    ? post.author.display_name.charAt(0).toUpperCase()
    : "";
  // console.log("created",post.created_at)
  return (
    <header className="post-header">
      <Link to={`/profile/${post?.author.username}`}>
        <Avatar image={avatarImage} initials={avatarInitials} />
      </Link>

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
