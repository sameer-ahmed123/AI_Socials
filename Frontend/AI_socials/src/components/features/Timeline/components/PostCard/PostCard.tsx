import Card from "../../../../ui/card/Card";

import "./PostCard.css";

import type { PostCardProps } from "./PostCard.types";

import PostHeader from "./components/PostHeader/PostHeader";
import PostBody from "./components/PostBody/PostBody";
import PostActions from "./components/PostActions/PostActions";

const PostCard = ({ post, loading = false, handlers }: PostCardProps) => {
  return (
    <Card className="post-card">
      <PostHeader loading={loading} post={post} />

      <PostBody media={post?.media} loading={loading} content={post?.content ?? ""} />

      <PostActions loading={loading} post={post} handlers={handlers} />
    </Card>
  );
};

export default PostCard;
