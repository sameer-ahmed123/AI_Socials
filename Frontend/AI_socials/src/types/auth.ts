export interface AuthUser {
  id: number;

  email: string;

  username: string;

  display_name: string;

  avatar: string;

  is_verified: boolean;
}

export interface AuthContextType {
  user: AuthUser | null;

  loading: boolean;

  initializing: boolean;

  login(): Promise<void>;

  logout(): Promise<void>;
}