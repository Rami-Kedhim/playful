
import { createContext, useContext } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  register: (email: string, password: string, userData: any) => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (!context) {
    // Instead of throwing an error which breaks the app, provide a mock implementation
    // This allows components to work even when the AuthProvider is not present
    console.warn('useAuthContext must be used within an AuthProvider');
    return {
      isAuthenticated: false,
      user: null,
      login: async () => false,
      logout: async () => {},
      register: async () => false
    };
  }
  
  return context;
};

export default useAuth;
