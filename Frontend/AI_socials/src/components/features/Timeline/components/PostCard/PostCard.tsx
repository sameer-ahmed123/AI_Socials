import Card from "../../../../ui/card/Card";

import "./PostCard.css";

import type { PostCardProps } from "./PostCard.types";

import PostHeader from "./components/PostHeader/PostHeader";
import PostBody from "./components/PostBody/PostBody";
import PostActions from "./components/PostActions/PostActions";

const PostCard = ({ post, handlers }: PostCardProps) => {
  return (
    <Card className="post-card">
      <PostHeader
        postId={post.id}
        author={post.author}
        createdAt={post.createdAt}
      />

      <PostBody content={post.content} />

      <PostActions post={post} handlers={handlers} />
    </Card>
  );
};

export default PostCard;
