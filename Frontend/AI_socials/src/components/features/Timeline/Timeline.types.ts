export type TimelineTab = "for-you" | "following" | "ai-vid-and-filmmakers";

import type { Post, CreatePostInput } from "../../features/Posts";

export interface TimelineProps {
  posts: Post[];

  onCreatePost: (input: CreatePostInput) => void;
  onReply(postId: string): void;

  onLike(postId: string): void;

  onRepost(postId: string): void;

  onBookmark(postId: string): void;
}
