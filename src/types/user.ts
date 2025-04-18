
export interface User {
  id: string;
  username: string;
  email: string;
  role: 'user' | 'admin' | 'moderator';
  name: string;
  isVerified: boolean;
  createdAt: string;
  phone?: string;
  website?: string;
}

export interface UserProfile {
  id: string;
  userId: string;
  username: string;
  email: string;
  displayName: string;
  location: string;
  bio: string;
  isVerified: boolean;
  website?: string; 
  avatarUrl: string;
  joinedDate: Date;
  avatar_url: string;
  phone?: string;
}

// Add AuthResult type needed for SignInForm and SignUpForm
export interface AuthResult {
  success: boolean;
  message?: string;
  user?: User;
  token?: string;
  error?: string;
}

// Add these types needed for Auth components
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

// Add UserRole enum for AuthPage
export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  MODERATOR = 'moderator'
}
