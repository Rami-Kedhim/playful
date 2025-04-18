
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
  username: string;
  email: string;
  role: UserRole | string;
  avatar?: string;
  isVerified?: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface UserProfile {
  id: string;
  userId?: string;
  email: string;
  name: string;
  avatar_url?: string;
  phone_number?: string;
  location?: string;
  bio?: string;
  is_escort?: boolean;
  created_at?: string;
  updated_at?: string;
  verified?: boolean;
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
