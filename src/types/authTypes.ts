
export interface AuthUser {
  id: string;
  username: string;
  email: string;
  profileImageUrl?: string;
  lucoinsBalance: number;
  role?: string;
  isVerified?: boolean;
}

export interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  userRoles: string[];
  register: (email: string, password: string, username: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (userData: Partial<AuthUser>) => Promise<void>;
  clearError: () => void;
}
