export interface Post {
  id: string;

  author: {
    id: string;

    name: string;

    username: string;

    avatar?: string;
  };

  content: string;

  createdAt: string;

  likes: number;

  replies: number;

  reposts: number;

  bookmarked: boolean;

  liked: boolean;
}
