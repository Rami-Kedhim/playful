
import React, { createContext, useContext, useState, useEffect } from 'react';
// Fix imports to use consistent casing with the actual files
import { authService } from '@/services/authService';
import { userService } from '@/services/userService';

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
        
        // Check for an existing user token
        const token = localStorage.getItem('ubx_auth_token'); 
        
        if (token && await authService.validateToken(token)) {
          // Get current user data
          const currentUser = await authService.getCurrentUser();
          if (currentUser) {
            setUser(currentUser);
            setIsAuthenticated(true);
          }
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
      
      // Call the auth service login
      const result = await authService.login(email, password);
      
      if (result.success) {
        // Store the token
        localStorage.setItem('ubx_auth_token', 'mock_token_' + Date.now());
        setUser(result.user);
        setIsAuthenticated(true);
        return true;
      } else {
        setError(result.message || 'Invalid credentials');
        return false;
      }
    } catch (err: any) {
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
      // Call auth service logout
      await authService.logout();
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
      
      // Call auth service register
      const result = await authService.register(userData);
      
      if (result.success) {
        // Store token
        localStorage.setItem('ubx_auth_token', 'mock_token_' + Date.now());
        setUser(result.user);
        setIsAuthenticated(true);
        return true;
      } else {
        setError(result.message || 'Failed to register');
        return false;
      }
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
      
      // Call user service updateUser
      const result = await userService.updateUser(user.id, userData);
      
      if (result.success) {
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
