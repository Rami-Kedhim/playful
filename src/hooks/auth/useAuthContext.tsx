
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '@/types/user';

// Define AuthUser type for components using it
export interface AuthUser {
  id: string;
  email: string;
  username?: string;
  name?: string;
  role: UserRole;
  isVerified: boolean;
  avatarUrl?: string;
  created_at?: string;
  phone_number?: string;
  phone?: string;
  website?: string;
  full_name?: string;
}

export interface AuthContextType {
  user: AuthUser | null;
  profile: any | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (email: string, password: string, username: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
  signIn: async () => false,
  signUp: async () => false,
  signOut: async () => {},
  refreshUser: async () => {},
});

// Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        setIsLoading(true);
        // Mock auth logic - in a real app this would check with your backend
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setProfile(parsedUser); // Simplified for this example
        }
      } catch (err) {
        console.error("Error checking session:", err);
        setError("Session check failed");
      } finally {
        setIsLoading(false);
      }
    };
    
    checkSession();
  }, []);

  // Sign in function
  const signIn = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Mock authentication - replace with actual auth logic
      const mockUser: AuthUser = {
        id: '1',
        email,
        username: email.split('@')[0],
        name: email.split('@')[0],
        role: UserRole.USER,
        isVerified: true,
        avatarUrl: '',
      };
      
      setUser(mockUser);
      setProfile(mockUser); // Simplified
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      return true;
    } catch (err: any) {
      console.error("Sign in error:", err);
      setError(err.message || "Failed to sign in");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign up function
  const signUp = async (email: string, password: string, username: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Mock user registration
      const mockUser: AuthUser = {
        id: '1',
        email,
        username,
        name: username,
        role: UserRole.USER,
        isVerified: false,
        avatarUrl: '',
      };
      
      setUser(mockUser);
      setProfile(mockUser); // Simplified
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      return true;
    } catch (err: any) {
      console.error("Sign up error:", err);
      setError(err.message || "Failed to sign up");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Sign out function
  const signOut = async (): Promise<void> => {
    try {
      setIsLoading(true);
      
      // Clear authentication state
      localStorage.removeItem('user');
      setUser(null);
      setProfile(null);
    } catch (err: any) {
      console.error("Sign out error:", err);
      setError(err.message || "Failed to sign out");
    } finally {
      setIsLoading(false);
    }
  };

  // Refresh user data
  const refreshUser = async (): Promise<void> => {
    try {
      setIsLoading(true);
      
      // In a real app, fetch updated user data
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setProfile(parsedUser); // Simplified
      }
    } catch (err: any) {
      console.error("Refresh user error:", err);
      setError(err.message || "Failed to refresh user data");
    } finally {
      setIsLoading(false);
    }
  };

  // Auth context value
  const value: AuthContextType = {
    user,
    profile,
    isAuthenticated: !!user,
    isLoading,
    error,
    signIn,
    signUp,
    signOut,
    refreshUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);
