import { useContext, useState, useEffect, createContext } from 'react';
import { UserProfile, AuthContextType } from '@/types/user';

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  signIn: async () => false,
  signOut: async () => {},
  signUp: async () => false,
  resetPassword: async () => false,
  updateProfile: async () => false
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useAuthContext = () => {
  const [user, setUserProfile] = useState<UserProfile | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        // Check if user is logged in
        const token = localStorage.getItem('auth_token');
        if (token) {
          // Mock user data for development
          const mockUser = {
            id: 'mock-user-1',
            name: 'Test User',
            username: 'testuser',
            avatarUrl: '/path/to/avatar.jpg',  // Use avatarUrl instead of avatar_url
            region: 'US',
            aiPreferences: { theme: 'dark' },
            lastAiInteraction: new Date().toISOString(),
            aiConversationCount: 5,
            aiFavoriteTopics: ['travel', 'technology'],
            aiEnabled: true,
            role: 'user'
          };
          
          setUserProfile(mockUser as UserProfile);
          setProfile(mockUser as UserProfile);
          setIsAuthenticated(true);
        } else {
          setUserProfile(null);
          setProfile(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setUserProfile(null);
        setProfile(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const signIn = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Mock authentication
      if (email && password) {
        // Store token
        localStorage.setItem('auth_token', 'mock-token');
        
        // Mock user data
        const mockUser = {
          id: 'mock-user-1',
          name: 'Test User',
          username: 'testuser',
          avatarUrl: '/path/to/avatar.jpg',  // Use avatarUrl instead of avatar_url
          region: 'US',
          aiPreferences: { theme: 'dark' },
          lastAiInteraction: new Date().toISOString(),
          aiConversationCount: 5,
          aiFavoriteTopics: ['travel', 'technology'],
          aiEnabled: true,
          role: 'user'
        };
        
        setUserProfile(mockUser as UserProfile);
        setProfile(mockUser as UserProfile);
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Sign in failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      // Remove token
      localStorage.removeItem('auth_token');
      
      // Clear user data
      setUserProfile(null);
      setProfile(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  const signUp = async (email: string, password: string, userData?: any): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Mock sign up
      if (email && password) {
        // Create user profile
        const newProfile = await createUserProfile(userData);
        
        // Store token
        localStorage.setItem('auth_token', 'mock-token');
        
        setUserProfile(newProfile as UserProfile);
        setProfile(newProfile as UserProfile);
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Sign up failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string): Promise<boolean> => {
    try {
      // Mock password reset
      console.log(`Password reset requested for ${email}`);
      return true;
    } catch (error) {
      console.error('Password reset failed:', error);
      return false;
    }
  };

  const updateProfile = async (data: Partial<UserProfile>): Promise<boolean> => {
    try {
      // Mock profile update
      setUserProfile(prev => prev ? { ...prev, ...data } : null);
      setProfile(prev => prev ? { ...prev, ...data } : null);
      return true;
    } catch (error) {
      console.error('Profile update failed:', error);
      return false;
    }
  };

  const createUserProfile = async (userData: any) => {
    // Use emailAddress instead of email
    return {
      id: 'new-user-123',
      name: userData.name || 'New User',
      emailAddress: userData.emailAddress || '',
      // ... other profile properties
    };
  };

  // Add setUser to auth context
  const authContextValue: AuthContextType = {
    user,
    profile,
    isAuthenticated,
    isLoading,
    signIn,
    signOut,
    signUp,
    resetPassword,
    updateProfile,
    setUser: setUserProfile  // Add this line to match AuthContextType
  };

  return authContextValue;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuthContext();
  
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

export default useAuth;
