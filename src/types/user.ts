export interface User {
  id: string;
  username?: string;
  email: string;
  role?: 'user' | 'admin' | 'moderator' | 'escort' | 'creator';
  name?: string;
  isVerified?: boolean;
  createdAt?: string;
  created_at?: string;
  phone?: string;
  website?: string;
  profileImageUrl?: string;
  avatar_url?: string;
  avatarUrl?: string;
  user_metadata?: Record<string, any>;
  lucoinsBalance?: number;
  roles?: UserRole[];
  ubxBalance?: number;
  bio?: string;
}

export interface UserProfile {
  id: string;
  userId?: string;
  username?: string;
  email?: string;
  displayName?: string;
  location?: string;
  bio?: string;
  isVerified?: boolean;
  website?: string; 
  avatarUrl?: string;
  joinedDate?: Date;
  avatar_url?: string;
  phone?: string;
  profileImageUrl?: string;
  sexual_orientation?: string;
  roles?: UserRole[];
  is_escort?: boolean;
  subscription_tier?: string;
  full_name?: string;
  verification_status?: string;
  is_boosted?: boolean;
  isBoosted?: boolean;
}

export interface AuthResult {
  success: boolean;
  message?: string;
  user?: User;
  token?: string;
  error?: string;
  session?: any;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export type UserRole = string | { name: string };

export interface AIAvatarSettings {
  gender: "male" | "female" | "non-binary" | string;
  style: string;
  ageRange: string;
  age: number;
  ethnicity: string;
  hairColor: string;
  hairStyle: string;
  bodyType: string;
  skinTone: string;
  background: string;
}
