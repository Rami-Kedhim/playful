
export enum UserRole {
  USER = 'user',
  ESCORT = 'escort',
  ADMIN = 'admin',
  MODERATOR = 'moderator'
}

export interface User {
  id: string;
  email: string;
  name?: string;
  role: UserRole;
  isVerified: boolean;
  createdAt: string;
  updatedAt?: string;
  avatar?: string;
}

export interface UserProfile {
  id: string;
  userId: string;
  bio: string;
  location: string;
  phone?: string;
  website?: string;
  avatar_url?: string;
  verified: boolean;
  verification_level?: string;
  lucoin_balance: number;
  is_boosted?: boolean;
  isBoosted?: boolean;
  created_at: string;
  updated_at?: string;
  sexual_orientation?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
}

export interface AuthResult {
  success: boolean;
  message?: string;
  user?: User;
  token?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}
