
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
}

export interface AuthResult {
  success: boolean;
  user?: User;
  error?: string;
  redirectTo?: string;
  token?: string;
  session?: any; // Add session property
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  initialized: boolean;
}
