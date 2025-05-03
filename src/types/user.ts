
// User types for the application

export interface User {
  id: string;
  email?: string;
  username?: string;
  avatarUrl?: string;
  profileImageUrl?: string;
  name?: string;
  roles?: string[];
  role?: string;
  created_at?: string;
  user_metadata?: {
    username?: string;
    avatar_url?: string;
    [key: string]: any;
  };
  ubxBalance?: number;
  // Add missing properties used in components
  website?: string;
  bio?: string;
  isVerified?: boolean;
  avatar_url?: string; // For backward compatibility
}

export interface UserProfile {
  id: string;
  userId: string; // Changed from optional to required to match auth.UserProfile
  username?: string;
  bio?: string;
  avatar_url?: string;
  phone?: string;
  website?: string;
  verification_level?: string;
  verification_status?: string;
  is_verified?: boolean;
  services?: string[];
  rates?: Record<string, any>;
  availability?: Record<string, any>;
  languages?: string[];
  location?: string;
  gallery_images?: string[];
  social_links?: Record<string, string>;
  createdAt?: string; // Added to match auth.UserProfile
}

// Add missing credential interfaces
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
