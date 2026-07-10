import type { Post } from "../models";

export const toggleRepostAction = (posts: Post[], postId: string): Post[] => {
  return posts.map((post) => {
    if (post.id !== postId) return post;

    const reposted = !post.reposted;

    return {
      ...post,

      reposted,

      reposts: reposted ? post.reposts + 1 : post.reposts - 1,
    };
  });
};
