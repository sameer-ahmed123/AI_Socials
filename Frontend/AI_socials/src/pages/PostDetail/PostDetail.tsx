import { useParams } from "react-router-dom";

// import { usePost, useComments } from "../../components/features/Posts/hooks";
import "./PostDetail.css";
import { useNavigate } from "react-router-dom";
import { useComments } from "../../components/features/Comments";
import { usePost } from "../../components/features/Posts/hooks";
import LoadingScreen from "../../components/common/loadingScreen/LoadingScreen";
import ErrorState from "../../components/common/ErrorState";
import Button from "../../components/ui/Button/Button";
import PostCard from "../../components/features/Timeline/components/PostCard/PostCard";
import type { PostCardHandlers } from "../../components/features/Timeline/components/PostCard/PostCard.types";
import { useEffect } from "react";
import CommentComposer from "../../components/features/Comments/components/CommentComposer/CommentComposer";
import CommentList from "../../components/features/Comments/components/CommentList/CommentList";

const PostDetail = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

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
  const {
    comments,
    loading: commentsLoading,
    error: commentsError,

    createComment,
    deleteComment,
  } = useComments(id);

  const handlers: PostCardHandlers = {
    onReply: () => {},
    onLike: toggleLike,
    onRepost: toggleRepost,
    onBookmark: toggleBookmark,
    onDelete: deletePost,
  };
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

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

  // function refreshComments(): void {
  //   throw new Error("Could not Load Replies");
  // }

  return (
    <main className="post-detail">
      <Button variant="ghost" onClick={() => navigate(-1)}>
        ← Back
      </Button>
      <PostCard post={post} handlers={handlers} />
      <CommentComposer onSubmit={createComment} loading={commentsLoading} />
      {/* {commentsError && (
        <ErrorState
          title="Couldn't load replies"
          description={commentsError}
          action={<Button onClick={refreshComments}>Retry</Button>}
        />
      )} */}
      <CommentList
        comments={comments}
        loading={commentsLoading}
        onDelete={deleteComment}
      />
    </main>
  );
};

export default PostDetail;
