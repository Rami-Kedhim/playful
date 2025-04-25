
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email?: string;
  name?: string;
  role?: string;
  roles?: string[];
  username?: string;
  avatarUrl?: string;
  profileImageUrl?: string;
  avatar_url?: string;
  bio?: string;
  website?: string;
  ubxBalance?: number;
  created_at: string;
  user_metadata?: {
    verification_status?: string;
    verification_submitted?: boolean;
    verification_level?: string;
    verification_documents?: {
      submittedAt: string;
      documentUrls: string[];
    };
    username?: string;
    role?: string;
    avatar_url?: string;
    aiPreferences?: {
      model?: string;
      temperature?: number;
    };
    lastAiInteraction?: Date | string;
    aiConversationCount?: number;
    aiFavoriteTopics?: string[];
    aiEnabled?: boolean;
    aiContextCreated?: boolean;
  };
}

interface UserProfile {
  id: string;
  user_id: string;
  username?: string;
  avatarUrl?: string;
  avatar_url?: string;
  bio?: string;
  location?: string;
  website?: string;
  phone?: string;
  full_name?: string;
  created_at?: string;
  updated_at?: string;
  last_active?: string;
  is_verified?: boolean;
  verification_level?: string;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (email: string, password: string, name?: string) => Promise<void>;
  register: (email: string, password: string, username?: string) => Promise<AuthResult>;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signOut: () => Promise<boolean>;
  updateUser: (userData: Partial<User>) => Promise<boolean>;
  updateUserProfile: (profileData: any) => Promise<boolean>;
  updateProfile: (profileData: any) => Promise<boolean>;
  loadUserProfile: () => Promise<UserProfile | null>;
  refreshProfile: () => Promise<void>;
  sendPasswordResetEmail: (email: string) => Promise<boolean>;
  resetPassword: (token: string, password: string) => Promise<boolean>;
  requestPasswordReset: (email: string) => Promise<boolean>;
  verifyEmail: (token: string) => Promise<boolean>;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<boolean>;
  deleteAccount: () => Promise<boolean>;
  checkRole: (role: string) => boolean;
}

interface AuthResult {
  success: boolean;
  user?: User | null;
  error?: string;
}

// Create a mock implementation of the auth context for now
export const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  isAuthenticated: false,
  isLoading: false,
  login: async () => {},
  logout: async () => {},
  signup: async () => {},
  register: async () => ({ success: false }),
  signIn: async () => ({ success: false }),
  signOut: async () => false,
  updateUser: async () => false,
  updateUserProfile: async () => false,
  updateProfile: async () => false,
  loadUserProfile: async () => null,
  refreshProfile: async () => {},
  sendPasswordResetEmail: async () => false,
  resetPassword: async () => false,
  requestPasswordReset: async () => false,
  verifyEmail: async () => false,
  updatePassword: async () => false,
  deleteAccount: async () => false,
  checkRole: () => false
});

export const useAuthContext = () => useContext(AuthContext);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock user data for development
const mockUser: User = {
  id: 'mock-user-id',
  email: 'user@example.com',
  name: 'Demo User',
  username: 'demouser',
  avatarUrl: null,
  profileImageUrl: null,
  avatar_url: null,
  bio: 'This is a mock user bio',
  website: 'https://example.com',
  created_at: '2023-01-01T12:00:00Z',
  role: 'user',
  roles: ['user'],
  ubxBalance: 500,
  user_metadata: {
    verification_status: 'verified',
    verification_submitted: true,
    verification_level: 'basic',
    username: 'demouser',
    role: 'user',
    avatar_url: null,
    aiPreferences: {
      model: 'default',
      temperature: 0.7
    },
    lastAiInteraction: '2023-05-01T12:00:00Z',
    aiConversationCount: 5,
    aiFavoriteTopics: ['tech', 'design'],
    aiEnabled: true,
    aiContextCreated: true
  }
};

// Mock profile for development
const mockProfile: UserProfile = {
  id: 'mock-profile-id',
  user_id: 'mock-user-id',
  username: 'demouser',
  avatarUrl: null,
  avatar_url: null,
  bio: 'This is a mock user bio',
  location: 'Mock City',
  website: 'https://example.com',
  phone: '+1234567890',
  full_name: 'Demo User',
  created_at: '2023-01-01T12:00:00Z',
  updated_at: '2023-05-01T12:00:00Z',
  last_active: '2023-05-10T12:00:00Z',
  is_verified: true,
  verification_level: 'basic'
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock authentication for development purposes
  useEffect(() => {
    // Check for existing auth in localStorage
    const hasAuth = localStorage.getItem('authenticated');
    if (hasAuth === 'true') {
      setUser(mockUser);
      setProfile(mockProfile);
    }
    
    setIsLoading(false);
  }, []);
  
  const isAuthenticated = !!user;
  
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock login implementation
      setUser(mockUser);
      setProfile(mockProfile);
      localStorage.setItem('authenticated', 'true');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      // Mock logout implementation
      setUser(null);
      setProfile(null);
      localStorage.removeItem('authenticated');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const signup = async (email: string, password: string, name?: string) => {
    setIsLoading(true);
    try {
      // Mock signup implementation
      const newUser = {...mockUser, email, name: name || mockUser.name};
      setUser(newUser);
      setProfile({...mockProfile, user_id: newUser.id});
      localStorage.setItem('authenticated', 'true');
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Implementation for additional methods to match the interface
  const register = async (email: string, password: string, username?: string): Promise<AuthResult> => {
    try {
      await signup(email, password, username);
      return { success: true, user: mockUser };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const signIn = async (email: string, password: string): Promise<AuthResult> => {
    try {
      await login(email, password);
      return { success: true, user: mockUser };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const signOut = async (): Promise<boolean> => {
    try {
      await logout();
      return true;
    } catch (error) {
      return false;
    }
  };

  const updateUser = async (): Promise<boolean> => {
    return true; // Mock implementation
  };

  const updateUserProfile = async (): Promise<boolean> => {
    return true; // Mock implementation
  };

  const updateProfile = async (): Promise<boolean> => {
    return true; // Mock implementation
  };

  const loadUserProfile = async (): Promise<UserProfile | null> => {
    return mockProfile; // Mock implementation
  };

  const refreshProfile = async (): Promise<void> => {
    setProfile(mockProfile); // Mock implementation
  };

  const sendPasswordResetEmail = async (): Promise<boolean> => {
    return true; // Mock implementation
  };

  const resetPassword = async (): Promise<boolean> => {
    return true; // Mock implementation
  };

  const requestPasswordReset = async (): Promise<boolean> => {
    return true; // Mock implementation
  };

  const verifyEmail = async (): Promise<boolean> => {
    return true; // Mock implementation
  };

  const updatePassword = async (): Promise<boolean> => {
    return true; // Mock implementation
  };

  const deleteAccount = async (): Promise<boolean> => {
    return true; // Mock implementation
  };

  const checkRole = (role: string): boolean => {
    if (!user) return false;
    
    // Check if the user has the specified role either in the role property or roles array
    if (user.role === role) return true;
    
    if (user.roles && Array.isArray(user.roles)) {
      return user.roles.some(userRole => {
        if (typeof userRole === 'string') {
          return userRole === role;
        }
        return false;
      });
    }
    
    return false;
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      profile,
      isAuthenticated, 
      isLoading,
      login,
      logout,
      signup,
      register,
      signIn,
      signOut,
      updateUser,
      updateUserProfile,
      updateProfile,
      loadUserProfile,
      refreshProfile,
      sendPasswordResetEmail,
      resetPassword,
      requestPasswordReset,
      verifyEmail,
      updatePassword,
      deleteAccount,
      checkRole
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// These are the additional hooks that were missing
export const useAuthState = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  return { user, isAuthenticated, isLoading };
};

export const useAuthActions = () => {
  const { 
    login, 
    logout, 
    signup, 
    register, 
    signIn, 
    signOut,
    updateUser,
    updateUserProfile,
    updateProfile,
    loadUserProfile,
    refreshProfile,
    sendPasswordResetEmail,
    resetPassword,
    requestPasswordReset,
    verifyEmail,
    updatePassword,
    deleteAccount 
  } = useAuth();
  
  return { 
    login, 
    logout, 
    signup, 
    register, 
    signIn, 
    signOut,
    updateUser,
    updateUserProfile,
    updateProfile,
    loadUserProfile,
    refreshProfile,
    sendPasswordResetEmail,
    resetPassword,
    requestPasswordReset,
    verifyEmail,
    updatePassword,
    deleteAccount 
  };
};

export const useRole = () => {
  const { user, checkRole } = useAuth();
  return {
    role: user?.role || 'user',
    roles: user?.roles || [],
    checkRole,
    isAdmin: checkRole('admin'),
    isModerator: checkRole('moderator'),
    isUser: checkRole('user')
  };
};

export default useAuth;
