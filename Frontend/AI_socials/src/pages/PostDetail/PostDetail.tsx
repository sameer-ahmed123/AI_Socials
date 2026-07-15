import { useParams } from "react-router-dom";

import "./PostDetail.css";

import { usePosts } from "../../components/features/Posts";
import { usePost } from "../../components/features/Posts/hooks";
import LoadingScreen from "../../components/common/loadingScreen/LoadingScreen";
import ErrorState from "../../components/common/ErrorState";
import Button from "../../components/ui/Button/Button";
import PostCard from "../../components/features/Timeline/components/PostCard/PostCard";
import type { PostCardHandlers } from "../../components/features/Timeline/components/PostCard/PostCard.types";

const PostDetail = () => {
  const { postId } = useParams();
  const id = Number(postId);
  const {
    post,
    loading,
    error,
    refreshPost,
    toggleLike,
    toggleBookmark,
    toggleRepost,
    deletePost,
  } = usePost(id);

  const handlers: PostCardHandlers = {
    onReply: () => {},
    onLike: toggleLike,
    onRepost: toggleRepost,
    onBookmark: toggleBookmark,
    onDelete: deletePost,
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <ErrorState
        title="Couldn't load post"
        description={error}
        action={<Button onClick={refreshPost}>Retry</Button>}
      />
    );
  }

  if (!post) {
    return (
      <ErrorState
        title="Post not found"
        description="The requested post doesn't exist."
      />
    );
  }

  return (
    <main className="post-detail">
      <PostCard post={post} handlers={handlers} />
    </main>
  );
};

export default PostDetail;
