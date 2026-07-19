import "./ProfileTimeline.css";

import type { ProfileTimelineProps } from "./ProfileTimeline.types";

import EmptyState from "../../../../ui/EmptyState";
import PostCard from "../../../Timeline/components/PostCard/PostCard";
import { useAuth } from "../../../../../hooks/useAuth";
import { PencilLine } from "lucide-react";

const ProfileTimeline = ({
  posts,
  loading = false,
  handlers,
}: ProfileTimelineProps) => {
  const { user } = useAuth();
  if (!loading && posts.length === 0) {
    return (
      <EmptyState
        icon={<PencilLine size={44} />}
        title="No posts yet"
        description={`${user?.username} hasn't posted anything yet.`}
      />
    );
  }

  return (
    <section className="profile-timeline">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          loading={loading}
          handlers={handlers}
        />
      ))}
    </section>
  );
};

export default ProfileTimeline;
