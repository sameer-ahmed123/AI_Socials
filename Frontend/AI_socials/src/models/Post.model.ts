import type { PostMedia } from "./PostMedia.model";
import type { User } from "./User.model";

export interface Post {
  id: number;
  author: User;
  content: string;
  media: PostMedia[];

  reply_count: number;

  like_count: number;
  liked: boolean;

  bookmark_count: number;
  bookmarked: boolean;

  repost_count: number;
  reposted: boolean;

  created_at: string;
  updated_at: string;
}
