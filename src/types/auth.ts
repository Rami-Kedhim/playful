
export interface AuthUser {
  id: string;
  email: string;
  username?: string;
  role?: string;
  profileImageUrl?: string;
  app_metadata?: Record<string, any>;
  user_metadata?: Record<string, any>;
  aud?: string;
  created_at?: string;
}

export type UserRole = 'admin' | 'moderator' | 'escort' | 'creator' | 'user';
