
import { createContext, useContext } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  register: (email: string, password: string, userData: any) => Promise<boolean>;
  // Add missing properties that components are trying to use
  signOut: () => Promise<boolean>;
  isLoading: boolean;
  updateUserProfile: (data: any) => Promise<boolean>;
  deleteAccount: () => Promise<boolean>;
  updatePassword: (oldPassword: string, newPassword: string) => Promise<boolean>;
  checkRole: (role: string) => boolean;
  profile: any | null;
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
      login: async () => false,
      logout: async () => {},
      signOut: async () => false,
      register: async () => false,
      updateUserProfile: async () => false,
      deleteAccount: async () => false,
      updatePassword: async () => false,
      checkRole: () => false
    };
  }
  
  return context;
};

export const useAuth = useAuthContext;

export default useAuth;
