import type { Post } from "../../../../../../models/Post.model";
import { usePosts } from "../../../../Posts";
import PostCard from "../../../../Timeline/components/PostCard/PostCard";
import { useFeed } from "../../../../Posts/hooks/useFeed";
import type { PostCardHandlers } from "../../../../Timeline/components/PostCard/PostCard.types";

export interface SearchPostResultsProps {
  posts: Post[];
}

const SearchPostResults = ({ posts }: SearchPostResultsProps) => {
  const { handleReply } = usePosts();
  const { deletePost, toggleBookmark, toggleLike, toggleRepost } =
    useFeed("for-you");

  const handlers: PostCardHandlers = {
    onReply: handleReply,
    onLike: toggleLike,
    onRepost: toggleRepost,
    onBookmark: toggleBookmark,
    onDelete: deletePost,
  };

  return (
    <>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} handlers={handlers} />
      ))}
    </>
  );
};

export default SearchPostResults;
