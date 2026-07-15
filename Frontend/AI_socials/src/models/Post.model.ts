import type { User } from "./User.model";

export interface Post {
  id: number;
  author: User;
  content: string;
  image: string | null;

  like_count: number;
  liked: boolean;

  bookmark_count: number;
  bookmarked: boolean;

  repost_count: number;
  reposted: boolean;

  created_at: string;
  updated_at: string;
}
