
export interface UserProfile {
  id: string;
  name: string;
  avatar_url?: string;  // Make this optional to avoid errors
  email?: string;       // Make this optional to avoid errors
  phone_number?: string;
  location?: string;
  bio?: string;
  is_escort?: boolean;
  is_verified?: boolean;
  verified?: boolean;
  created_at?: string;
  updated_at?: string;
  username?: string;    // Add this for EscortDashboard
  ubx_balance?: number; // Add this for useBoostPurchase
  ubxBalance?: number;  // Add this for useBoostPurchase (alternative naming)
}

export interface AuthContextType {
  user: UserProfile | null;
  profile?: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string, userData?: any) => Promise<boolean>;
  resetPassword: (email: string) => Promise<boolean>;
  updateProfile: (data: Partial<UserProfile>) => Promise<boolean>;
  setUser?: (user: UserProfile | null) => void; // Add this for useAuthContext
}
