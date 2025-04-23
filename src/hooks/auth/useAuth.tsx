
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email?: string;
  name?: string;
  username?: string;
  avatarUrl?: string;
  profileImageUrl?: string;
  avatar_url?: string;
  roles?: string[] | { name: string }[];
  role?: string;
  ubxBalance?: number;
  website?: string;
  bio?: string;
  user_metadata?: Record<string, any>;
  created_at?: string;
}

interface Profile {
  userId?: string;
  subscription_tier: string;
  is_verified?: boolean;
  username?: string;
  is_boosted?: boolean;
}

export interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signOut: () => Promise<void>;
  checkRole: (role: string) => boolean;
  updateUserProfile: (userData: Partial<User>) => Promise<boolean>;
  refreshProfile: () => Promise<void>;
  sendPasswordResetEmail?: (email: string) => Promise<{ success: boolean; error?: string }>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading auth state
    const loadAuth = async () => {
      setIsLoading(true);
      try {
        // Mock user data for development
        const mockUser = {
          id: 'user-123',
          email: 'user@example.com',
          name: 'Demo User',
          username: 'demouser',
          avatarUrl: 'https://i.pravatar.cc/150?u=user123',
          profileImageUrl: 'https://i.pravatar.cc/150?u=user123',
          roles: ['user'],
          ubxBalance: 1000
        };
        
        const mockProfile = {
          subscription_tier: 'free',
          userId: 'user-123',
          is_verified: true
        };
        
        // Uncomment for testing authenticated state
        // setUser(mockUser);
        // setProfile(mockProfile);
        
        setUser(null);
        setProfile(null);
      } catch (error) {
        console.error("Auth loading error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock login for development
      const mockUser = {
        id: 'user-123',
        email,
        name: 'Demo User',
        username: 'demouser',
        avatarUrl: 'https://i.pravatar.cc/150?u=user123',
        profileImageUrl: 'https://i.pravatar.cc/150?u=user123',
        roles: ['user'],
        ubxBalance: 1000
      };
      
      const mockProfile = {
        subscription_tier: 'free',
        userId: 'user-123',
        is_verified: true
      };
      
      setUser(mockUser);
      setProfile(mockProfile);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      // Mock logout
      setUser(null);
      setProfile(null);
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Add signOut as an alias for logout for compatibility
  const signOut = logout;

  const checkRole = (role: string) => {
    if (!user) return false;

    // Check if user has the role directly assigned
    if (user.role === role) return true;

    // Check in roles array if it exists
    if (user.roles && Array.isArray(user.roles)) {
      return user.roles.some(userRole => {
        if (typeof userRole === 'string') {
          return userRole === role;
        }
        // Handle case where role is an object with a name property
        return userRole?.name === role;
      });
    }

    return false;
  };

  const updateUserProfile = async (userData: Partial<User>): Promise<boolean> => {
    try {
      setIsLoading(true);
      // Mock updating user profile
      setUser(prev => prev ? { ...prev, ...userData } : null);
      return true;
    } catch (error) {
      console.error("Error updating user profile:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const refreshProfile = async (): Promise<void> => {
    try {
      setIsLoading(true);
      // Mock refreshing profile
      console.log("Refreshing profile...");
      // In a real app, you would fetch the updated profile from the server
    } catch (error) {
      console.error("Error refreshing profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const sendPasswordResetEmail = async (email: string) => {
    // Mock implementation
    console.log(`Password reset email sent to ${email}`);
    return { success: true };
  };

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      isAuthenticated: !!user,
      isLoading,
      login,
      logout,
      signOut,
      checkRole,
      updateUserProfile,
      refreshProfile,
      sendPasswordResetEmail
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default useAuth;
