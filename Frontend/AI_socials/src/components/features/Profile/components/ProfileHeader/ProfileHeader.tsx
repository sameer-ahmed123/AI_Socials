import {
  BadgeCheck,
  CalendarDays,
  Link as LinkIcon,
  MapPin,
} from "lucide-react";
import "./ProfileHeader.css";

import type { ProfileHeaderProps } from "./ProfileHeader.types";

import Avatar from "../../../../ui/Avatar/Avatar";
import RichText from "../../../../ui/RichText";

const ProfileHeader = ({ profile }: ProfileHeaderProps) => {
  const joined = new Date(profile.joined_at).toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  });

  return (
    <header className="profile-header">
      <Avatar image={profile.avatar} alt={profile.display_name} size="lg" />

      <div className="profile-header__identity">
        <div className="profile-header__display-name">
          <h1> {profile.display_name || profile.username}</h1>

          {profile.is_verified && (
            <BadgeCheck size={20} className="profile-header__verified" />
          )}
        </div>

        <p className="profile-header__username">@{profile.username}</p>
      </div>

      {profile.bio && <RichText text={profile.bio} />}

      <div className="profile-header__meta">
        {profile.location && (
          <div className="profile-header__meta-item">
            <MapPin size={16} />

            <span>{profile.location}</span>
          </div>
        )}

        {profile.website && (
          <div className="profile-header__meta-item">
            <LinkIcon size={16} />

            <a href={profile.website} target="_blank" rel="noopener noreferrer">
              {profile.website}
            </a>
          </div>
        )}

        <div className="profile-header__meta-item">
          <CalendarDays size={16} />

          <span>Joined {joined}</span>
        </div>
      </div>
    </header>
  );
};

export default ProfileHeader;
