export type TimelineTab = "for-you" | "following" | "ai-vid-and-filmmakers";

import type { CreatePostInput } from "../../features/Posts";
import type { Post } from "../../../models/Post.model";

export interface TimelineProps {
  posts: Post[];

  onCreatePost: (input: CreatePostInput) => void;
  onReply(postId: number): void;

  onLike(postId: number): void;

  onRepost(postId: number): void;

  onBookmark(postId: number): void;
  onDelete(postId: number): Promise<void>;
}
