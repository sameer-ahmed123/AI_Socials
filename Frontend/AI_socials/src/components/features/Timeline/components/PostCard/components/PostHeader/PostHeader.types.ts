import type { User } from "../../../../models";

export interface PostHeaderProps {
  author: User;

  createdAt: string;
  postId: string;
}
