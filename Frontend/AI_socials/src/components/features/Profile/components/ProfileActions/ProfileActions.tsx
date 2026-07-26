import { useState } from "react";
import { Link } from "react-router-dom";

import Button from "../../../../ui/Button/Button";
import FollowButton from "../../../../ui/FollowButton/FollowButton";

import {
  followUser,
  unfollowUser,
} from "../../services/api/follow";

import "./ProfileActions.css";

import type { ProfileActionsProps } from "./ProfileActions.types";

const ProfileActions = ({
  profile,
  onProfileChange,
}: ProfileActionsProps) => {
  const [loading, setLoading] = useState(false);

  async function handleFollow() {
    if (loading) return;

    setLoading(true);

    try {
      const response = profile.is_following
        ? await unfollowUser(profile.id)
        : await followUser(profile.id);

      onProfileChange({
        ...profile,
        is_following: response.following,
        followers_count: response.followers_count,
      });
    } finally {
      setLoading(false);
    }
  }

  if (profile.is_me) {
    return (
      <section className="profile-actions">
        <Link to="/profile/edit">
          <Button>Edit Profile</Button>
        </Link>
      </section>
    );
  }

  return (
    <section className="profile-actions">
      <FollowButton
        isFollowing={profile.is_following}
        loading={loading}
        onClick={handleFollow}
      />
    </section>
  );
};

export default ProfileActions;