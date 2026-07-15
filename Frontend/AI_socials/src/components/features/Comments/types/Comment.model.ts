import type { User } from "../../../../models/User.model";

export interface Comment {
  id: number;

  author: User;

  content: string;

  created_at: string;

  updated_at: string;
}

