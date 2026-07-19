import { useParams } from "react-router-dom";

import PageContent from "../../components/ui/PageContent";
import LoadingScreen from "../../components/common/loadingScreen/LoadingScreen";
import ErrorState from "../../components/common/ErrorState";
import Button from "../../components/ui/Button/Button";
import Profile from "../../components/features/Profile/Profile";

import {
  useProfile,
  useProfilePosts,
} from "../../components/features/Profile/hooks";

import { usePosts } from "../../components/features/Posts";

import type { PostCardHandlers } from "../../components/features/Timeline/components/PostCard/PostCard.types";

const ProfilePage = () => {
  const { username } = useParams();
  const { handleReply } = usePosts();
  const { profile, loading, error, refresh } = useProfile(username);
  const {
    posts,
    loading: postsLoading,
    toggleLike,
    toggleBookmark,
    toggleRepost,
    deletePost,
  } = useProfilePosts(username);


  const handlers: PostCardHandlers = {
    onReply: handleReply,
    onLike: toggleLike,
    onBookmark: toggleBookmark,
    onRepost: toggleRepost,
    onDelete: deletePost,
  };
  if (!username) {
    return (
      <ErrorState title="Profile not found" description="Invalid profile." />
    );
  }

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <ErrorState
        title="Couldn't load profile"
        description={error}
        action={<Button onClick={refresh}>Retry</Button>}
      />
    );
  }

  if (!profile) {
    return (
      <ErrorState
        title="Profile not found"
        description="This user does not exist."
      />
    );
  }

  return (
    <PageContent>
      <Profile
        profile={profile}
        posts={posts}
        loading={postsLoading}
        handlers={handlers}
      />
    </PageContent>
  );
};

export default ProfilePage;
