import type { Post } from "../../../../../../models/Post.model";
import { usePosts } from "../../../../Posts";
import PostCard from "../../../../Timeline/components/PostCard/PostCard";

export interface SearchPostResultsProps {
  posts: Post[];
}

const SearchPostResults = ({ posts }: SearchPostResultsProps) => {
  const { toggleLike, toggleBookmark, toggleRepost, handleReply, deletePost } =
    usePosts();

  const handlers = {
    onReply: handleReply,
    onLike: toggleLike,
    onBookmark: toggleBookmark,
    onRepost: toggleRepost,
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
