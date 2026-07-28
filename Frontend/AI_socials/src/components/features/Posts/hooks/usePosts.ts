import { useNavigate } from "react-router-dom";
import type { Post } from "../../../../models/Post.model";
import type { CreatePostInput } from "../types";
import { useUploadMedia } from "../../Media/hooks/useUploadMedia";
import { createPost as createPostApi } from "../services/api/posts";

interface UsePostsOptions {
  onPostCreated?: (post: Post) => void;
}

export const usePosts = ({ onPostCreated }: UsePostsOptions = {}) => {
  const navigate = useNavigate();
  const { upload } = useUploadMedia();

  const createPost = async (input: CreatePostInput) => {
    let uploadedMedia = null;

    if (input.media) {
      uploadedMedia = await upload(input.media);
    }

    const payload = {
      content: input.content,
      uploaded_media: uploadedMedia ?? undefined,
    };

    const newPost = await createPostApi(payload);

    onPostCreated?.(newPost);

    return newPost;
  };

  const handleReply = (postId: number) => {
    navigate(`/posts/${postId}`);
  };

  return {
    createPost,
    handleReply,
  };
};
