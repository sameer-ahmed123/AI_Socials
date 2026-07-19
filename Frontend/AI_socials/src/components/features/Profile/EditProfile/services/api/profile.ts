import { apiFetch } from "../../../../../../services/api/client";

import type { UpdateProfileInput } from "../../types/UpdateProfileInput.types";
import type { Profile } from "../../../types";

export const updateProfile = async (
  input: UpdateProfileInput,
): Promise<Profile> => {
  return apiFetch<Profile>(
    "/users/me/",
    {
      method: "PATCH",
      body: JSON.stringify(input),
    },
    true,
  );
};
