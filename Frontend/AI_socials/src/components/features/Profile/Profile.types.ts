import type { Profile } from "./types";
import type { Post } from "../../../models/Post.model";
import type { PostCardHandlers } from "../Timeline/components/PostCard/PostCard.types";

export interface ProfileProps {
  profile: Profile;

  posts: Post[];

  loading?: boolean;

  handlers: PostCardHandlers;
}
