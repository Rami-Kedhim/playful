
// User authentication types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  confirmPassword?: string;
  name?: string;
}

export interface AuthResult {
  success: boolean;
  error?: string;
  user?: any;
  token?: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
  username?: string;
  bio?: string;
  website?: string;
  phone?: string;
  user_metadata?: Record<string, any>;
  app_metadata?: Record<string, any>;
  role?: string;
  roles?: string[];
  created_at?: string;
  updated_at?: string;
}

export interface UserProfile {
  id: string;
  user_id: string;
  name?: string;
  username?: string;
  bio?: string;
  avatar_url?: string;
  email?: string;
  phone?: string;
  website?: string;
  location?: string;
  verified?: boolean;
  is_verified?: boolean;
  role?: string;
  roles?: string[];
  verification_level?: string;
}
