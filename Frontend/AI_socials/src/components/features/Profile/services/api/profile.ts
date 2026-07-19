import { apiFetch } from '../../../../../services/api/client';

import type { Profile } from '../../types/Profile.model';
import type { Post } from '../../../../../models/Post.model';

export async function getProfile(
  username: string,
): Promise<Profile> {
  return apiFetch<Profile>(
    `/users/${username}/`,
    {},
    true,
  );
}

export async function getProfilePosts(
  username: string,
): Promise<Post[]> {
  return apiFetch<Post[]>(
    `/users/${username}/posts/`,
    {},
    true,
  );
}