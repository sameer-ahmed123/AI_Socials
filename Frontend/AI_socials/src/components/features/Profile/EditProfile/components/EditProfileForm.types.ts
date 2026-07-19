import type { UpdateProfileInput } from "../types/UpdateProfileInput.types";

export interface EditProfileFormProps {
  initialValues: UpdateProfileInput;
  loading?: boolean;
  onSubmit: (values: UpdateProfileInput) => Promise<void>;
}
