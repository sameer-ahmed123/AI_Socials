import type { Post } from "../../../../../models/Post.model";
import type { PostCardHandlers } from "../../../Timeline/components/PostCard/PostCard.types";

export interface ProfileTimelineProps {
  posts: Post[];

  loading?: boolean;

  handlers: PostCardHandlers;
}
