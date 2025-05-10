
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
  avatarUrl?: string;
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
  profileImageUrl?: string;
}

export interface UserProfile {
  id: string;
  user_id: string;
  name?: string;
  username?: string;
  bio?: string;
  avatar_url?: string;
  avatarUrl?: string;
  email?: string;
  phone?: string;
  website?: string;
  location?: string;
  verified?: boolean;
  is_verified?: boolean;
  role?: string;
  roles?: string[];
  verification_level?: string;
  displayName?: string;
  services?: string[];
  languages?: string[];
  availability?: any;
  rates?: any;
  gender?: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  profile: UserProfile | null;
  login: (email: string, password: string) => Promise<AuthResult>;
  logout: () => Promise<boolean>;
  register: (email: string, password: string, confirmPassword?: string) => Promise<AuthResult>;
  loading: boolean;
  isLoading: boolean; // Added for compatibility
  isAdmin: boolean;
  isEscort: boolean;
  isClient: boolean;
  error: string | null;
  initialized: boolean;
  updateUser: (userData: Partial<User>) => Promise<boolean>;
  updateUserProfile: (profileData: Partial<UserProfile>) => Promise<boolean>;
  updateProfile: (profileData: Partial<UserProfile>) => Promise<boolean>;
  sendPasswordResetEmail: (email: string) => Promise<boolean>;
  resetPassword: (password: string, token: string) => Promise<boolean>;
  checkRole: (role: string) => boolean;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signOut: () => Promise<boolean>;
  refreshProfile: () => Promise<void>;
}
