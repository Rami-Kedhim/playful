
import React, { createContext, useState, useEffect, ReactNode } from 'react';
// Fix imports to use lowercase consistently, matching the actual implementation files
import authService from '@/services/authService';
import userService from '@/services/userService';
import { UberPersona } from '@/types/uberPersona';

// Create the context
export interface UberEcosystemContextValue {
  currentUser: any;
  isAuthenticated: boolean;
  selectedPersona: UberPersona | null;
  setSelectedPersona: (persona: UberPersona | null) => void;
  validateToken: (token: string) => Promise<boolean>;
  loading: boolean;
  error: string | null;
}

const UberEcosystemContext = createContext<UberEcosystemContextValue | undefined>(undefined);

// Provider component
interface UberEcosystemProviderProps {
  children: ReactNode;
}

export const UberEcosystemProvider: React.FC<UberEcosystemProviderProps> = ({ 
  children 
}) => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState<UberPersona | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setLoading(true);
        
        // Check for an existing token
        const token = localStorage.getItem('auth_token');
        
        if (token) {
          const isValid = await validateToken(token);
          if (isValid) {
            // If token is valid, get the user data
            const userData = { id: 'user-123', name: 'Test User' }; // Mock user data
            setCurrentUser(userData);
            setIsAuthenticated(true);
          } else {
            // If token is not valid, clear it
            localStorage.removeItem('auth_token');
            setCurrentUser(null);
            setIsAuthenticated(false);
          }
        } else {
          // No token found
          setCurrentUser(null);
          setIsAuthenticated(false);
        }
        setError(null);
      } catch (err: any) {
        console.error('Auth initialization error:', err);
        setError(err.message || 'Failed to initialize authentication');
        setCurrentUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    
    initializeAuth();
  }, []);
  
  // Validate JWT token - Fixed the return type to boolean
  const validateToken = async (token: string): Promise<boolean> => {
    try {
      // Use authService to validate token and return a boolean result
      const response = await authService.validateToken(token);
      // Return true if we get a valid response
      return !!response;
    } catch (error) {
      console.error('Token validation error:', error);
      return false;
    }
  };
  
  const value = {
    currentUser,
    isAuthenticated,
    selectedPersona,
    setSelectedPersona,
    validateToken,
    loading,
    error
  };

  return (
    <UberEcosystemContext.Provider value={value}>
      {children}
    </UberEcosystemContext.Provider>
  );
};

export default UberEcosystemContext;
