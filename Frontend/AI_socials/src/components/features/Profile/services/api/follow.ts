import { apiFetch } from "../../../../../services/api/client";
import type { FollowUser } from "../../types/FollowUser.model";

export interface FollowResponse {
  following: boolean;
  followers_count: number;
}

export async function followUser(userId: number): Promise<FollowResponse> {
  return await apiFetch<FollowResponse>(
    `/users/${userId}/follow/`,
    { method: "POST" },
    true,
  );
}

export async function unfollowUser(userId: number): Promise<FollowResponse> {
  return await apiFetch<FollowResponse>(
    `/users/${userId}/follow/`,
    { method: "DELETE" },
    true,
  );
}

export async function getFollowers(userId: number): Promise<FollowUser[]> {
  return await apiFetch<FollowUser[]>(`/users/${userId}/followers/`, {}, true);
}

export async function getFollowing(userId: number): Promise<FollowUser[]> {
  return await apiFetch<FollowUser[]>(`/users/${userId}/following/`, {}, true);
}
