
import React, { createContext, useContext, useState, useEffect } from 'react';
// Fix imports to use proper casing and consistent naming
import authService from '@/services/authService';
import userService from '@/services/userService';

// Define the context type
interface UberEcosystemContextType {
  isInitialized: boolean;
  isAuthenticated: boolean;
  user: any | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  register: (userData: any) => Promise<boolean>;
  updateUser: (userData: any) => Promise<boolean>;
}

// Create the context with default values
const UberEcosystemContext = createContext<UberEcosystemContextType>({
  isInitialized: false,
  isAuthenticated: false,
  user: null,
  loading: true,
  error: null,
  login: async () => false,
  logout: async () => {},
  register: async () => false,
  updateUser: async () => false,
});

// Provider component
export const UberEcosystemProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize the ecosystem
  useEffect(() => {
    const initializeEcosystem = async () => {
      try {
        setLoading(true);
        
        // Check for an existing user token instead of using getCurrentUser
        const token = localStorage.getItem('ubx_auth_token'); 
        
        if (token && await authService.validateToken(token)) {
          // Mock user data since getCurrentUser doesn't exist
          setUser({ id: 'current-user', email: 'user@example.com' });
          setIsAuthenticated(true);
        }
        
        setIsInitialized(true);
        setError(null);
      } catch (err) {
        console.error('Failed to initialize UberEcosystem:', err);
        setError('Failed to initialize the application');
      } finally {
        setLoading(false);
      }
    };
    
    initializeEcosystem();
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      
      // Implement mock login using the auth validation
      const token = `mock_token_${Date.now()}`;
      const isValid = await authService.validateToken(token);
      
      if (isValid) {
        localStorage.setItem('ubx_auth_token', token);
        setUser({ id: 'user-123', email });
        setIsAuthenticated(true);
        return true;
      } else {
        setError('Invalid credentials');
        return false;
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An unexpected error occurred during login');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async (): Promise<void> => {
    try {
      setLoading(true);
      // Mock logout
      localStorage.removeItem('ubx_auth_token');
      setUser(null);
      setIsAuthenticated(false);
      setError(null);
    } catch (err) {
      console.error('Logout error:', err);
      setError('An error occurred during logout');
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (userData: any): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      
      // Mock registration
      const token = `mock_token_${Date.now()}`;
      localStorage.setItem('ubx_auth_token', token);
      
      setUser({ id: `user-${Date.now()}`, ...userData });
      setIsAuthenticated(true);
      return true;
    } catch (err) {
      console.error('Registration error:', err);
      setError('An unexpected error occurred during registration');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Update user function
  const updateUser = async (userData: any): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      
      if (!user || !user.id) {
        setError('No user is currently authenticated');
        return false;
      }
      
      // Use updateUserProfile instead of updateUser
      const result = await userService.updateUserProfile(user.id, userData);
      
      if (result) {
        setUser({ ...user, ...userData });
        return true;
      } else {
        setError('Failed to update user');
        return false;
      }
    } catch (err) {
      console.error('Update user error:', err);
      setError('An unexpected error occurred while updating user');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Context value
  const value = {
    isInitialized,
    isAuthenticated,
    user,
    loading,
    error,
    login,
    logout,
    register,
    updateUser,
  };

  return (
    <UberEcosystemContext.Provider value={value}>
      {children}
    </UberEcosystemContext.Provider>
  );
};

// Custom hook to use the context
export const useUberEcosystem = () => useContext(UberEcosystemContext);

export default UberEcosystemContext;
