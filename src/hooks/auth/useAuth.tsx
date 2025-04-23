
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email?: string;
  name?: string;
}

interface Profile {
  subscription_tier: string;
  userId?: string;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkRole?: (role: string) => boolean;
  signOut?: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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
          name: 'Demo User'
        };
        
        const mockProfile = {
          subscription_tier: 'free',
          userId: 'user-123'
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
        name: 'Demo User'
      };
      
      const mockProfile = {
        subscription_tier: 'free',
        userId: 'user-123'
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

  const checkRole = (role: string) => {
    // Mock role check
    return false; // For now, no roles are implemented
  };

  // Add signOut as an alias for logout for compatibility
  const signOut = logout;

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      isAuthenticated: !!user,
      isLoading,
      login,
      logout,
      checkRole,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default useAuth;
