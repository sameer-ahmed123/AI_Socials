import type { Post } from "../../../../../../features/Posts";

export interface PostActionHandlers {
  onReply: (postId: string) => void;

  onLike: (postId: string) => void;

  onRepost: (postId: string) => void;

  onBookmark: (postId: string) => void;
}

export interface PostActionsProps {
  post: Post;

  handlers: PostActionHandlers;
}
