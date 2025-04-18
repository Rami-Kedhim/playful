
// Define user role types
export enum UserRole {
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  ESCORT = 'escort',
  USER = 'user',
  CREATOR = 'creator',
  PREMIUM = 'premium'
}

export interface User {
  id: string;
  username?: string; // Made optional to match auth.User
  email: string;
  role: UserRole | string;
  avatar?: string;
  isVerified?: boolean;
  createdAt: string;
  updatedAt?: string;
  name?: string; // Added to support ProfileHeader component
}

export interface UserProfile {
  id: string;
  userId?: string;
  email: string;
  name: string;
  avatar_url?: string;
  phone_number?: string; // Changed from phone
  location?: string;
  bio?: string;
  is_escort?: boolean;
  created_at?: string;
  updated_at?: string;
  verified?: boolean;
  website?: string; // Added to support ProfileEditForm
  phone?: string; // Alternative field for phone_number
}

export interface AuthState {
  user: User | null;
  profile: UserProfile | null;
  isLoading: boolean;
  userRoles: string[];
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
  email: string;
  password: string;
  name?: string;
}
