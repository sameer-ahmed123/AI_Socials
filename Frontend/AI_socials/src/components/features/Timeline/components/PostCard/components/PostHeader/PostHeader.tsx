import Avatar from "../../../../../../ui/Avatar/Avatar";
import { formatRelativeTime } from "../../../../../../../utils/date/formatRelativeTime";

import "./PostHeader.css";
import PostMenu from "../PostMenu/PostMenu";
import type { PostHeaderProps } from "./PostHeader.types";

const PostHeader = ({ author, createdAt,postId }: PostHeaderProps) => {
  return (
    <header className="post-header">
      <Avatar initials={author.name.charAt(0)} />

      <div className="post-header__info">
        <div className="post-header__top">
          <span className="post-header__name">{author.name}</span>

          <span className="post-header__username">{author.username}</span>

          <span className="post-header__time">• {formatRelativeTime(createdAt)}</span>
        </div>
      </div>
       <PostMenu postId={postId} />
    </header>
  );
};

export default PostHeader;
