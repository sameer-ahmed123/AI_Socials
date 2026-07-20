import { apiFetch } from "../../../../services/api/client";
import type { UploadedMedia } from "../types/UploadedMedia";

export async function uploadMedia(file: File): Promise<UploadedMedia> {
  const formData = new FormData();
  formData.append("file", file);

  return apiFetch<UploadedMedia>(
    "/media/upload/",
    {
      method: "POST",
      body: formData,
    },
    true,
  );
}
