
export interface User {
  id: string;
  username: string;
  email: string;
  name?: string;
  role?: 'user' | 'admin' | 'moderator';
  isVerified?: boolean;
  createdAt?: string;
  // Additional fields for compatibility
  created_at?: string;
  full_name?: string;
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
  // Additional fields
  avatar_url?: string;
  name?: string;
  full_name?: string;
  is_verified?: boolean;
  phone?: string; // Added missing phone field
}

// Add AuthResult interface that's imported in signin/signup forms
export interface AuthResult {
  success: boolean;
  user?: User;
  token?: string;
  error?: string;
}
