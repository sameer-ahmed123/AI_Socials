import Card from "../../../../ui/card/Card";

import "./PostCard.css";

import type { PostCardProps } from "./PostCard.types";

import PostHeader from "./components/PostHeader/PostHeader";
import PostBody from "./components/PostBody/PostBody";
import PostFooter from "./components/PostFooter/PostFooter";

const PostCard = ({ post }: PostCardProps) => {
  return (
    <Card className="post-card">
      <PostHeader author={post.author} createdAt={post.createdAt} />

      <PostBody content={post.content} />

      <PostFooter post={post} />
    </Card>
  );
};

export default PostCard;
