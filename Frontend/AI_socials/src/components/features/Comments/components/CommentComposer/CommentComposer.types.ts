import type { CreateCommentInput } from "../../types/CreateCommentInput.types";

export interface CommentComposerProps {
  loading?: boolean;

  onSubmit: (input: CreateCommentInput) => Promise<void>;
}
