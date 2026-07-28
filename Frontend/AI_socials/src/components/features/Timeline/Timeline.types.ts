import type { CreatePostInput } from "../../features/Posts";
import type { Post } from "../../../models/Post.model";
import type { FeedMode } from "../Posts/services/api/feed";
// export type TimelineTab = "for-you" | "following" | "ai-vid-and-filmmakers";

export interface TimelineProps {
  activeTab: FeedMode;
  onTabChange: (tab: FeedMode) => void;
  posts: Post[];
  onCreatePost: (input: CreatePostInput) => void;
  onReply(postId: number): void;
  onLike(postId: number): void;
  onRepost(postId: number): void;
  onBookmark(postId: number): void;
  onDelete(postId: number): Promise<void>;
  loading: boolean;
  error: string | null;
  onRetry: () => void;
}
