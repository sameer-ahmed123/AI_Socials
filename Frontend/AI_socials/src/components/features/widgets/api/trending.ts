import { apiFetch } from "../../../../services/api/client";
import type { Trending } from "../models/Trend.model";

export async function getTrendingHashtags(): Promise<Trending[]> {
  return await apiFetch<Trending[]>("/posts/trending/", {});
}
