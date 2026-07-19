import { useState } from "react";

import Card from "../../../../ui/card/Card";
import Button from "../../../../ui/Button/Button";
import TextArea from "../../../../ui/Textarea/TextArea";

import type { EditProfileFormProps } from "./EditProfileForm.types";

import "./EditProfileForm.css";

const MAX_BIO_LENGTH = 280;

const isValidUrl = (url: string) => {
  if (!url) return true;

  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return false;
  }

  try {
    const parsed = new URL(url);
    return parsed.hostname.includes(".") && !parsed.hostname.startsWith(".");
  } catch {
    return false;
  }
};
const EditProfileForm = ({
  initialValues,
  loading = false,
  onSubmit,
}: EditProfileFormProps) => {
  const [displayName, setDisplayName] = useState(
    initialValues.display_name || "",
  );
  const [bio, setBio] = useState(initialValues.bio || "");
  const [website, setWebsite] = useState(initialValues.website || "");
  const [location, setLocation] = useState(initialValues.location || "");

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // 1. CLEAR ERROR HELPER: Instantly removes a specific field error
  const clearFieldError = (fieldName: string) => {
    if (errors[fieldName]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[fieldName];
        return updated;
      });
    }
  };

  // 2. VALIDATION FUNCTION: Uses a local reference for instant, synchronous validation checks
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!displayName.trim()) {
      newErrors.displayName = "Display name is required.";
    } else if (displayName.trim().length < 2) {
      newErrors.displayName = "Display name must be at least 2 characters.";
    } else if (displayName.trim().length > 50) {
      newErrors.displayName = "Display name cannot exceed 50 characters.";
    }

    if (bio.length > MAX_BIO_LENGTH) {
      newErrors.bio = `Bio cannot exceed ${MAX_BIO_LENGTH} characters.`;
    }

    if (website.trim() && !isValidUrl(website.trim())) {
      newErrors.website = "Please enter a valid website URL. must start with https:// or http://";
    }

    if (location.trim().length > 100) {
      newErrors.location = "Location cannot exceed 100 characters.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    await onSubmit({
      display_name: displayName.trim(),
      bio: bio.trim(),
      website: website.trim(),
      location: location.trim(),
    });
  };

  return (
    <Card>
      <form className="edit-profile-form" onSubmit={handleSubmit}>
        {/* Display Name Field */}
        <div className="edit-profile-form__field">
          <label htmlFor="display-name">Display Name</label>
          <input
            id="display-name"
            type="text"
            className={errors.displayName ? "input--error" : ""}
            value={displayName}
            disabled={loading}
            onChange={(e) => {
              setDisplayName(e.target.value);
              clearFieldError("displayName");
            }}
          />
          {errors.displayName && (
            <span className="edit-profile-form__error">
              {errors.displayName}
            </span>
          )}
        </div>

        {/* Bio Field */}
        <div className="edit-profile-form__field">
          <label htmlFor="bio">Bio</label>
          <TextArea
            id="bio"
            value={bio}
            maxLength={MAX_BIO_LENGTH}
            disabled={loading}
            onChange={(e) => {
              setBio(e.target.value);
              clearFieldError("bio");
            }}
          />
          <div className="edit-profile-form__bio-footer">
            {errors.bio && (
              <span className="edit-profile-form__error">{errors.bio}</span>
            )}
            <span className="edit-profile-form__counter">
              {bio.length}/{MAX_BIO_LENGTH}
            </span>
          </div>
        </div>

        {/* Website Field */}
        <div className="edit-profile-form__field">
          <label htmlFor="website">Website</label>
          <input
            id="website"
            type="text"
            className={errors.website ? "input--error" : ""}
            value={website}
            disabled={loading}
            onChange={(e) => {
              setWebsite(e.target.value);
              clearFieldError("website");
            }}
          />
          {errors.website && (
            <span className="edit-profile-form__error">{errors.website}</span>
          )}
        </div>

        {/* Location Field */}
        <div className="edit-profile-form__field">
          <label htmlFor="location">Location</label>
          <input
            id="location"
            type="text"
            className={errors.location ? "input--error" : ""}
            value={location}
            disabled={loading}
            onChange={(e) => {
              setLocation(e.target.value);
              clearFieldError("location");
            }}
          />
          {errors.location && (
            <span className="edit-profile-form__error">{errors.location}</span>
          )}
        </div>

        <Button size="sm" type="submit" disabled={loading}>
          Save Profile Changes
        </Button>
      </form>
    </Card>
  );
};

export default EditProfileForm;
