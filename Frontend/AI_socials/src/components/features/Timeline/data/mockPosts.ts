import type { Post } from "../models";

export const MOCK_POSTS: Post[] = [
  {
    id: "1",

    author: {
      id: "1",

      name: "Sketch AI",

      username: "@sketch_ai",
    },

    content: "Welcome to AI Social.",

    createdAt: "2m",

    likes: 42,

    replies: 8,

    reposts: 5,

    liked: false,

    bookmarked: false,
  },
  {
    id: "1",

    author: {
      id: "2",

      name: "Sketchi-boi_2000",

      username: "@sketchi_2000",
    },

    content: "how's it going my bois.",

    createdAt: "56m",

    likes: 152,

    replies: 10,

    reposts: 12,

    liked: false,

    bookmarked: true,
  },
];
