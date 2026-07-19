export interface Profile {
  id: number;

  username: string;
  display_name: string;
  avatar: string;
  bio: string;
  website: string;
  location: string;

  is_verified: boolean;

  joined_at: string;

  posts_count: number;
  followers_count: number;
  following_count: number;

  is_following: boolean;
  is_me: boolean;
}