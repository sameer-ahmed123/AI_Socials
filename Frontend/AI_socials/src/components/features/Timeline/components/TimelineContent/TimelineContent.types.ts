import type { Post } from "../../../../features/Posts";
import type { PostCardHandlers } from "../PostCard/PostCard.types";

export interface TimelineContentProps {
  posts: Post[];
  handlers : PostCardHandlers
}