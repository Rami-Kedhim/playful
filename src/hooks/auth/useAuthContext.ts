
import { createContext, useContext } from 'react';

export interface AuthContextType {
  isAuthenticated: boolean;
  user: any | null;
  profile: any | null;
  loading: boolean;
  isLoading: boolean;
  error: string | null;
  initialized: boolean;
  
  // Authentication methods
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<boolean>;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<boolean>;
  register: (email: string, password: string, userData: any) => Promise<boolean>;
  
  // Profile management
  updateUser: (data: any) => Promise<boolean>;
  updateUserProfile: (data: any) => Promise<boolean>;
  updateProfile: (data: any) => Promise<boolean>;
  loadUserProfile: () => Promise<any>;
  refreshProfile: () => Promise<any>;
  
  // Password management
  sendPasswordResetEmail: (email: string) => Promise<boolean>;
  resetPassword: (token: string, newPassword: string) => Promise<boolean>;
  requestPasswordReset: (email: string) => Promise<boolean>;
  verifyEmail: (token: string) => Promise<boolean>;
  updatePassword: (oldPassword: string, newPassword: string) => Promise<boolean>;
  
  // Account management
  deleteAccount: () => Promise<boolean>;
  
  // Authorization
  checkRole: (role: string) => boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (!context) {
    // Instead of throwing an error which breaks the app, provide a mock implementation
    // This allows components to work even when the AuthProvider is not present
    console.warn('useAuthContext must be used within an AuthProvider');
    return {
      isAuthenticated: false,
      user: null,
      profile: null,
      isLoading: false,
      loading: false,
      error: null,
      initialized: false,
      login: async () => false,
      logout: async () => false,
      signIn: async () => false,
      signOut: async () => false,
      register: async () => false,
      updateUser: async () => false,
      updateUserProfile: async () => false,
      updateProfile: async () => false,
      loadUserProfile: async () => null,
      refreshProfile: async () => null,
      sendPasswordResetEmail: async () => false,
      resetPassword: async () => false,
      requestPasswordReset: async () => false,
      verifyEmail: async () => false,
      updatePassword: async () => false,
      deleteAccount: async () => false,
      checkRole: () => false
    };
  }
  
  return context;
};

export const useAuth = useAuthContext;

export default useAuth;
