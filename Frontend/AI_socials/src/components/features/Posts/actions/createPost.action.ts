import type { Post } from "../../../../models/Post.model";

interface CreatePostParams {
  posts: Post[];
  newPost: Post;
}

export const createPostAction = ({
  posts,
  newPost,
}: CreatePostParams): Post[] => {
  return [newPost, ...posts];
};
