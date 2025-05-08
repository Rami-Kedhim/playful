import { useState, useEffect, createContext, useContext } from 'react';
import type { UserProfile, AuthContextType } from '@/types/user';

// Create the context with default values
export const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  isAuthenticated: false,
  isLoading: true,
  signIn: async () => false,
  signOut: async () => {},
  signUp: async () => false,
  resetPassword: async () => false,
  updateProfile: async () => false,
  // Add missing methods needed by components
  login: async () => ({ success: false }),
  logout: async () => false,
  register: async () => ({ success: false }),
  sendPasswordResetEmail: async () => false,
  checkRole: () => false
});

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
            avatar_url: '/path/to/avatar.jpg', // Use avatar_url to match UserProfile type
            avatarUrl: '/path/to/avatar.jpg', // Keep avatarUrl for backward compatibility
            profileImageUrl: '/path/to/avatar.jpg', // Add profileImageUrl for backward compatibility
            region: 'US',
            aiPreferences: { theme: 'dark' },
            lastAiInteraction: new Date().toISOString(),
            aiConversationCount: 5,
            aiFavoriteTopics: ['travel', 'technology'],
            aiEnabled: true,
            role: 'user',
            roles: ['user'], // Add roles array
            email: 'test@example.com', // Add email
            is_verified: true, // Add verification status
            verified: true, // Add verification status (alternative name)
            website: 'https://example.com', // Add website property
            phone: '+1234567890', // Add phone property
            ubx_balance: 100, // Add UBX balance
            ubxBalance: 100, // Add alternative UBX balance
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

  // Main auth methods 
  const signIn = async (email: string, password: string): Promise<boolean> => {
    // Mock sign-in implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser: UserProfile = {
          id: '1',
          name: 'Test User',
          email: email,
          username: 'testuser',
          is_escort: false,
          is_verified: true,
          verified: true
        };
        setUserProfile(mockUser);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(mockUser));
        resolve(true);
      }, 500);
    });
  };

  const signOut = async (): Promise<void> => {
    // Mock sign-out implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        setUserProfile(null);
        setProfile(null);
        setIsAuthenticated(false);
        localStorage.removeItem('user');
        resolve();
      }, 500);
    });
  };

  const signUp = async (email: string, password: string, userData?: any): Promise<boolean> => {
    // Mock sign-up implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser: UserProfile = {
          id: '2',
          name: userData?.name || 'New User',
          email: email,
          username: userData?.username || 'newuser',
          is_escort: false,
          is_verified: false,
          verified: false
        };
        setUserProfile(mockUser);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(mockUser));
        resolve(true);
      }, 500);
    });
  };

  const resetPassword = async (email: string): Promise<boolean> => {
    // Mock reset password implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Password reset email sent to:', email);
        resolve(true);
      }, 500);
    });
  };

  const updateProfile = async (data: Partial<UserProfile>): Promise<boolean> => {
    // Mock update profile implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        setProfile(prevProfile => ({ ...prevProfile, ...data }));
        resolve(true);
      }, 500);
    });
  };

  const createUserProfile = async (userData: any) => {
    // Mock user profile creation
    return new Promise((resolve) => {
      setTimeout(() => {
        setProfile(userData);
        resolve(true);
      }, 500);
    });
  };

  // Add these methods to match other components expectations
  const login = async (email: string, password: string) => {
    const success = await signIn(email, password);
    return { success, user: success ? user : null };
  };

  const logout = async () => {
    await signOut();
    return true;
  };

  const register = async (email: string, password: string, confirmPassword: string) => {
    const success = await signUp(email, password, { confirmPassword });
    return { success, user: success ? user : null };
  };

  const sendPasswordResetEmail = async (email: string) => {
    return await resetPassword(email);
  };

  // Add role checking functionality
  const checkRole = (role: string): boolean => {
    if (!user) return false;
    
    // Check user.roles array first
    if (user.roles && Array.isArray(user.roles)) {
      return user.roles.includes(role);
    }
    
    // Then check user.role string
    if (user.role) {
      return user.role === role;
    }
    
    return false;
  };

  // Create the auth context value
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
    // Add the new methods to the context value
    login,
    logout,
    register,
    sendPasswordResetEmail,
    checkRole,
    setUser: setUserProfile  // Add this for components that need direct access
  };

  return authContextValue;
};

// Export the useAuth hook as an alias to useContext(AuthContext)
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default useAuth;
