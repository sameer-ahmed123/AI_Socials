import { useState } from "react";

import { uploadMedia } from "../services/uploadMedia";

export function useUploadMedia() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function upload(file: File) {
    setLoading(true);
    setError(null);

    try {
      return await uploadMedia(file);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Upload failed.");
      }

      return null;
    } finally {
      setLoading(false);
    }
  }

  return {
    upload,
    loading,
    error,
  };
}
