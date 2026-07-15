import { useCallback, useEffect, useState } from "react";

import type { Comment } from "../types/Comment.model";
import type { CreateCommentInput } from "../types/CreateCommentInput.types";

import {
  getComments as getCommentsRequest,
  createComment as createCommentRequest,
  deleteComment as deleteCommentRequest,
} from "../services/api/comments";

import { createCommentAction, deleteCommentAction } from "../actions";
import { useAuth } from "../../../../hooks/useAuth";

export const useComments = (postId: number) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const { initializing } = useAuth();
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const createComment = async (input: CreateCommentInput) => {
    setError(null);

    try {
      const newComment = await createCommentRequest(postId, input);

      setComments((previous) =>
        createCommentAction({
          comments: previous,
          newComment,
        }),
      );
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to create comment.");
      }
    }
  };

  const deleteComment = async (commentId: number) => {
    setError(null);

    try {
      await deleteCommentRequest(commentId);

      setComments((previous) => deleteCommentAction(previous, commentId));
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to delete comment.");
      }
    }
  };

  const refreshComments = useCallback(async () => {
    setLoading(true);

    setError(null);

    try {
      const response = await getCommentsRequest(postId);

      setComments(response);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to load comments.");
      }
    } finally {
      setLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    if (initializing) return;

    refreshComments();
  }, [initializing, refreshComments]);

  return {
    comments,

    loading,
    error,

    createComment,
    deleteComment,

    refreshComments,
  };
};
