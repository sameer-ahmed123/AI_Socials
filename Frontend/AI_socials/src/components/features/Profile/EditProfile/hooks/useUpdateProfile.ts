import { useState } from "react";

import type { Profile } from "../../../../features/Profile/types/Profile.model";
import type { UpdateProfileInput } from "../types/UpdateProfileInput.types";

import { updateProfile as updateProfileRequest } from "../services/api/profile";

import { updateProfileAction } from "../actions/updateProfile.action";

export const useUpdateProfile = () => {
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const updateProfile = async (
    input: UpdateProfileInput,
  ): Promise<Profile | null> => {
    setLoading(true);

    setError(null);

    try {
      const response = await updateProfileRequest(input);

      return updateProfileAction(response);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to update profile.");
      }

      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    updateProfile,

    loading,

    error,
  };
};
