import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../hooks/useAuth";
import Card from "../../../ui/card/Card";
import EditProfileForm from "./components/EditProfileForm";
import { useUpdateProfile } from "./hooks/useUpdateProfile";
import type { UpdateProfileInput } from "./types/UpdateProfileInput.types";
import { useProfile } from "../hooks";
import LoadingScreen from "../../../common/loadingScreen/LoadingScreen";

const EditProfile = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const { updateProfile, loading, error } = useUpdateProfile();
  if (!user) {
    return null;
  }
  const { profile} = useProfile(user?.username);

  console.log("inside EditProfile.tsx", profile);
  const initialValues: UpdateProfileInput = {
    display_name: profile?.display_name ?? "",
    bio: profile?.bio ?? "",
    website: profile?.website ?? "",
    location: profile?.location ?? "",
  };

  if (!profile) {
    return <LoadingScreen />;
  }
  const handleSubmit = async (values: UpdateProfileInput) => {
    const updatedProfile = await updateProfile(values);

    if (!updatedProfile) {
      return;
    }

    updateUser({
      ...user,
      ...updateProfile
    });

    navigate(`/profile/${updatedProfile.username}`);
  };

  return (
    <Card>
      <h2>Edit Profile</h2>

      {error && <p className="edit-profile-form__error">{error}</p>}

      <EditProfileForm
        initialValues={initialValues}
        loading={loading}
        onSubmit={handleSubmit}
      />
    </Card>
  );
};

export default EditProfile;
