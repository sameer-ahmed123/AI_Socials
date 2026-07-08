import Avatar from "../../../../../../ui/Avatar/Avatar";

import "./PostHeader.css";

import type { PostHeaderProps } from "./PostHeader.types";

const PostHeader = ({ author, createdAt }: PostHeaderProps) => {
  return (
    <header className="post-header">
      <Avatar initials={author.name.charAt(0)} />

      <div className="post-header__info">
        <div className="post-header__top">
          <span className="post-header__name">{author.name}</span>

          <span className="post-header__username">{author.username}</span>

          <span className="post-header__time">• {createdAt}</span>
        </div>
      </div>
    </header>
  );
};

export default PostHeader;
