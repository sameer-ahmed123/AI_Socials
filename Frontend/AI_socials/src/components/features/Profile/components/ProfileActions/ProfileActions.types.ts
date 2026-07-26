import type { Profile } from "../../types";

export interface ProfileActionsProps {
  profile: Profile;
  onProfileChange: (profile: Profile) => void;
}
