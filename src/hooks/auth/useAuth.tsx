
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email?: string;
  name?: string;
  role?: string;
  avatarUrl?: string;
  created_at: string;
  user_metadata?: {
    verification_status?: string;
    verification_submitted?: boolean;
    verification_documents?: {
      submittedAt: string;
      documentUrls: string[];
    };
  };
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (email: string, password: string, name?: string) => Promise<void>;
}

// Create a mock implementation of the auth context for now
export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  login: async () => {},
  logout: async () => {},
  signup: async () => {}
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
  avatarUrl: null,
  created_at: '2023-01-01T12:00:00Z',
  user_metadata: {
    verification_status: 'verified',
    verification_submitted: true
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock authentication for development purposes
  useEffect(() => {
    // Check for existing auth in localStorage
    const hasAuth = localStorage.getItem('authenticated');
    if (hasAuth === 'true') {
      setUser(mockUser);
    }
    
    setIsLoading(false);
  }, []);
  
  const isAuthenticated = !!user;
  
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock login implementation
      setUser(mockUser);
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
      localStorage.setItem('authenticated', 'true');
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      isLoading,
      login,
      logout,
      signup
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
  const { login, logout, signup } = useAuth();
  return { login, logout, signup };
};

export const useRole = () => {
  const { user } = useAuth();
  return user?.role || 'user';
};

export default useAuth;
