import "./ProfileStats.css";

import type { ProfileStatsProps } from "./ProfileStats.types";

const ProfileStats = ({ profile }: ProfileStatsProps) => {
  return (
    <section className="profile-stats">
      <div className="profile-stats__item">
        <span className="profile-stats__value">{profile.posts_count}</span>

        <span className="profile-stats__label">Posts</span>
      </div>

      <div className="profile-stats__item">
        <span className="profile-stats__value">{profile.following_count}</span>

        <span className="profile-stats__label">Following</span>
      </div>

      <div className="profile-stats__item">
        <span className="profile-stats__value">{profile.followers_count}</span>

        <span className="profile-stats__label">Followers</span>
      </div>
    </section>
  );
};

export default ProfileStats;
