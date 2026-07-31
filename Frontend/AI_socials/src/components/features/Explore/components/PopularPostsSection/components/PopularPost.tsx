import { Link } from "react-router-dom";

import Avatar from "../../../../../ui/Avatar/Avatar";
import type { Post } from "../../../../../../models/Post.model";
import { formatRelativeTime } from "../../../../../../utils/date/formatRelativeTime";

import "./PopularPost.css";

interface PopularPostProps {
  post: Post;
}

const PopularPost = ({ post }: PopularPostProps) => {
  return (
    <Link to={`/posts/${post.id}`} className="popular-post">
      <div className="popular-post__header">
        <Avatar
          size="sm"
          image={post.author.avatar}
          alt={post.author.username}
        />

        <div className="popular-post__meta">
          <span className="popular-post__display-name">
            {post.author.display_name}
          </span>
          <span className="popular-post__username">
            @{post.author.username}
          </span>
          <span className="popular-post__dot">·</span>
          <span className="popular-post__time">
            {formatRelativeTime(post.created_at)}
          </span>
        </div>
      </div>

      <p className="popular-post__content">{post.content}</p>

      <div className="popular-post__stats">
        <span className="popular-post__stat">💬 {post.reply_count}</span>
        <span className="popular-post__stat">🔁 {post.repost_count}</span>
        <span className="popular-post__stat">❤️ {post.like_count}</span>
        <span className="popular-post__stat">🔖 {post.bookmark_count}</span>
      </div>
    </Link>
  );
};

export default PopularPost;
