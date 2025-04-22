
export interface User {
  id: string;
  email: string;
  name?: string;
  role?: string;
  isVerified?: boolean;
  profileId?: string;
  avatarUrl?: string;
  preferences?: Record<string, any>;
  metadata?: Record<string, any>;
  createdAt?: string;
  updatedAt?: string;
  session?: any; // Add session property
  password?: string; // Add password property
  username?: string;
  roles?: UserRole[];
  website?: string;
  bio?: string;
  profileImageUrl?: string;
  avatar_url?: string;
  user_metadata?: Record<string, any>;
  ubxBalance?: number;
  created_at?: string;
}

export interface AuthResult {
  success: boolean;
  user?: User;
  error?: string;
  redirectTo?: string;
  token?: string;
  session?: any; // Add session property
  password?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  initialized: boolean;
}

export type UserRole = string | { name: string };

export interface AuthUser extends User {
  // Additional properties needed for auth
}
