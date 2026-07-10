import type { CreatePostInput } from "../../../../features/Posts";

export interface ComposerProps {
  onCreatePost: (input: CreatePostInput) => void;
}
