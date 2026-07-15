import "./CommentList.css";

import type { CommentListProps } from "./CommentList.types";

import CommentCard from "../CommentCard/CommentCard";
import EmptyState from "../../../../../components/ui/EmptyState";

const SKELETON_COUNT = 3;

const CommentList = ({
  comments,
  loading = false,
  onDelete,
}: CommentListProps) => {
  if (loading) {
    return (
      <section className="comment-list">
        {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
          <CommentCard
            key={index}
            loading
            comment={{
              id: 0,
              author: {
                id: 0,
                username: "",
                display_name: "",
                avatar: "",
                bio: "",
                is_verified: false,
              },
              content: "",
              created_at: "",
              updated_at: "",
            }}
          />
        ))}
      </section>
    );
  }

  if (comments.length === 0) {
    return (
      <EmptyState title="No replies yet" description="Be the first to reply." />
    );
  }

  return (
    <section className="comment-list">
      {comments.map((comment) => (
        <CommentCard key={comment.id} comment={comment} onDelete={onDelete} />
      ))}
    </section>
  );
};

export default CommentList;
