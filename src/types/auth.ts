
export interface AuthResult {
  success: boolean;
  message?: string;
  user?: User | null;
  token?: string;
}

export interface User {
  id: string;
  name?: string;
  username?: string;
  email: string;
  avatar_url?: string;
  avatarUrl?: string;
  profileImageUrl?: string;
  is_escort?: boolean;
  is_verified?: boolean;
  verified?: boolean;
  user_id?: string; // Adding this to resolve type errors
}

export interface UserProfile extends Omit<User, 'email'> {
  email?: string;
  user_id: string;
}
