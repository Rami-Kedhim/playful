
export interface UserProfile {
  id: string;
  username: string;
  email: string;
  displayName: string;
  bio?: string;
  avatarUrl?: string;
  location?: string;
  joinedDate: Date;
  lastActive?: Date;
  isVerified: boolean;
  preferences?: Record<string, any>;
  notifications?: Record<string, boolean>;
  website?: string;
  // Added missing properties used in components
  phone?: string;
  userId?: string;
  avatar_url?: string; // For backward compatibility
  name?: string; // Added for backward compatibility
  is_verified?: boolean; // Added for backward compatibility
  created_at?: string; // Added for backward compatibility
  full_name?: string; // Added for backward compatibility
  verified?: boolean; // Added for backward compatibility
}

// Add User type that was missing
export interface User {
  id: string;
  username?: string;
  email: string;
  name?: string;
  role?: string;
  isVerified?: boolean;
  createdAt?: string;
  profileImageUrl?: string;
  avatarUrl?: string;
  created_at?: string;
  full_name?: string;
}

// Add AuthResult type for authentication components
export interface AuthResult {
  success: boolean;
  error?: string | null;
  user?: User;
  session?: any;
}
