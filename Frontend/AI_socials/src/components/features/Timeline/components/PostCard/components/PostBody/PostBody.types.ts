import type { PostMedia } from "../../../../../../../models/PostMedia.model";

export interface PostBodyProps {
  content: string;
  loading?: boolean;
  media?:PostMedia[]
}
