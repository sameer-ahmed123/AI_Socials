import "./ProfileActions.css";

import type { ProfileActionsProps } from "./ProfileActions.types";

import Button from "../../../../ui/Button/Button";
import { Link } from "react-router-dom";

const ProfileActions = ({ profile }: ProfileActionsProps) => {
  if (profile.is_me) {
    return (
      <section className="profile-actions">
        <Link to={"/profile/edit"}>
          <Button>Edit Profile</Button>
        </Link>
      </section>
    );
  }

  return (
    <section className="profile-actions">
      <Button>Follow</Button>
    </section>
  );
};

export default ProfileActions;
