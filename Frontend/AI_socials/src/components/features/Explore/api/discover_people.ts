import { apiFetch } from "../../../../services/api/client";
import type { SearchUser } from "../../Search/types/SearchUser.model";

export async function getDiscoverPeople(): Promise<SearchUser[]> {
  return await apiFetch<SearchUser[]>("/users/discover/", {}, true);
}
