import type { User } from "./User.model";

export interface Post {
  id: number;

  author: User;

  content: string;

  image: string | null;

  created_at: string;

  updated_at: string;
}