import type { Post } from "../../../../../../../models/Post.model";

export interface PostActionHandlers {
  onReply: (postId: number) => void;

  onLike: (postId: number) => void;

  onRepost: (postId: number) => void;

  onBookmark: (postId: number) => void;
  onDelete(postId: number): Promise<void>;
}

export interface PostActionsProps {
  post: Post;
  loading?: boolean;
  handlers: PostActionHandlers;
}
