import type { UploadedMedia } from "../../Media/types/UploadedMedia";

export interface CreatePostInput {
  content: string;
  media?: File | null;
  uploadedMedia?: UploadedMedia | null;
}
