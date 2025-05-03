
export interface User {
  id: string;
  email?: string;
  username?: string;
  name?: string;
  roles?: string[];
  created_at?: string;
  avatarUrl?: string | null;
  profileImageUrl?: string | null;
  user_metadata?: {
    username?: string;
    avatar_url?: string | null;
  };
  ubxBalance?: number;
}
