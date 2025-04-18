
export interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  name: string;
  isVerified?: boolean;
  createdAt: string;
}

export interface UserProfile {
  id: string | number;
  userId?: string | number;
  email?: string;
  name: string;
  avatar_url?: string;
  location?: string;
  bio?: string;
  verified?: boolean;
  website?: string;
  phone?: string;
  phone_number?: string;
}

// Add missing auth types
export enum UserRole {
  USER = 'user',
  ESCORT = 'escort',
  CREATOR = 'creator',
  ADMIN = 'admin',
  MODERATOR = 'moderator'
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
