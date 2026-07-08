import type { User } from "./User.model";

export interface Post {
  id: string;

  author: User;

  content: string;

  createdAt: string;

  likes: number;

  replies: number;

  reposts: number;

  liked: boolean;

  bookmarked: boolean;
}
