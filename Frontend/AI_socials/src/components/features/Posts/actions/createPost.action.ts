import type { Post, User } from "../models";
import type { CreatePostInput } from "../types";

interface CreatePostParams {
  posts: Post[];
  input: CreatePostInput;
  currentUser: User;
}

export const createPostAction = ({
  posts,
  input,
  currentUser,
}: CreatePostParams): Post[] => {
  const newPost: Post = {
    id: crypto.randomUUID(),

    author: currentUser,

    content: input.content,

    createdAt: new Date().toISOString(),

    likes: 0,

    replies: 0,

    reposts: 0,

    liked: false,

    reposted: false,

    bookmarked: false,
  };

  return [newPost, ...posts];
};
