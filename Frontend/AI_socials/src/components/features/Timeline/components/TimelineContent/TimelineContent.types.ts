import type { Post } from "../../../../../models/Post.model";
import type { PostCardHandlers } from "../PostCard/PostCard.types";

export interface TimelineContentProps {
  posts: Post[];
  handlers: PostCardHandlers;
}
