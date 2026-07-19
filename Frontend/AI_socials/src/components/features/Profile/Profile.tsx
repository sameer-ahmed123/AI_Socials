import "./Profile.css";

import type { ProfileProps } from "./Profile.types";
import ProfileHeader from "./components/ProfileHeader/ProfileHeader";
import ProfileStats from "./components/ProfileStats/ProfileStats";
import ProfileActions from "./components/ProfileActions/ProfileActions";
import ProfileTimeline from "./components/ProfileTimeline/ProfileTimeline";
import ProfileNavigation from "./components/ProfileNavigation/ProfileNavigation";

const Profile = ({
  profile,
  posts,
  loading = false,
  handlers,
}: ProfileProps) => {
  return (
    <section className="profile">
      <ProfileNavigation />
      <ProfileHeader profile={profile} />
      <ProfileStats profile={profile} />
      <ProfileActions profile={profile} />
      <ProfileTimeline posts={posts} loading={loading} handlers={handlers} />
    </section>
  );
};

export default Profile;
