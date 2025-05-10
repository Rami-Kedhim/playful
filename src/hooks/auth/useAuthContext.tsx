import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthResult, UserProfile } from '@/types/auth';

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null; 
  isLoading: boolean;
  isLoggedIn: boolean;
  isInitialized: boolean;
  login: (email: string, password: string) => Promise<AuthResult>;
  logout: () => Promise<boolean>;
  register: (email: string, password: string, username: string) => Promise<AuthResult>;
}

// Create a context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  userProfile: null,
  isLoading: true,
  isLoggedIn: false,
  isInitialized: false,
  login: () => Promise.resolve({ success: false }),
  logout: () => Promise.resolve(false),
  register: () => Promise.resolve({ success: false }),
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        
        // Check if there's a stored token
        const token = localStorage.getItem('auth_token');
        
        if (token) {
          // Validate token with backend
          const response = await fetch('/api/auth/validate', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (response.ok) {
            const userData = await response.json();
            
            // Set user data
            const user: User = {
              id: userData.id,
              name: userData.name,
              username: userData.username,
              email: userData.email,
              avatar_url: userData.avatar_url,
              avatarUrl: userData.avatarUrl,
              profileImageUrl: userData.profileImageUrl,
              is_escort: userData.is_escort,
              is_verified: userData.is_verified,
              verified: userData.verified
            };
            
            // Set user profile data
            const userProfile: UserProfile = {
              id: userData.id,
              name: userData.name,
              username: userData.username,
              email: userData.email,
              avatar_url: userData.avatar_url,
              avatarUrl: userData.avatarUrl,
              profileImageUrl: userData.profileImageUrl,
              is_escort: userData.is_escort,
              is_verified: userData.is_verified,
              verified: userData.verified,
              user_id: userData.id
            };
            
            setUser(user);
            setUserProfile(userProfile);
          } else {
            // Token is invalid, clear it
            localStorage.removeItem('auth_token');
            setUser(null);
            setUserProfile(null);
          }
        } else {
          setUser(null);
          setUserProfile(null);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setUser(null);
        setUserProfile(null);
      } finally {
        setIsLoading(false);
        setIsInitialized(true);
      }
    };
    
    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<AuthResult> => {
    try {
      setIsLoading(true);
      
      // Call login API
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Store token
        localStorage.setItem('auth_token', data.token);
        
        // Create user object
        const user: User = {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          username: data.user.username,
          is_escort: false,
          is_verified: true,
          verified: true
        };
        
        // Create user profile object
        const userProfile: UserProfile = {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          username: data.user.username,
          is_escort: false,
          is_verified: true,
          verified: true,
          user_id: data.user.id
        };
        
        setUser(user);
        setUserProfile(userProfile);
        
        return {
          success: true,
          message: 'Login successful',
          user,
          token: data.token
        };
      } else {
        return {
          success: false,
          message: data.message || 'Login failed'
        };
      }
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: 'An error occurred during login'
      };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Call logout API if needed
      // await fetch('/api/auth/logout', ...);
      
      // Clear token and user data
      localStorage.removeItem('auth_token');
      setUser(null);
      setUserProfile(null);
      
      return true;
    } catch (error) {
      console.error('Logout error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, username: string): Promise<AuthResult> => {
    try {
      setIsLoading(true);
      
      // Call register API
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, username })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        // Store token
        localStorage.setItem('auth_token', data.token);
        
        // Create user object
        const user: User = {
          id: data.user.id,
          name: data.user.name || username,
          email: email,
          username: username,
          is_escort: false,
          is_verified: false,
          verified: false
        };
        
        // Create user profile object
        const userProfile: UserProfile = {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          username: data.user.username,
          is_escort: false,
          is_verified: false,
          verified: false,
          user_id: data.user.id
        };
        
        setUser(user);
        setUserProfile(userProfile);
        
        return {
          success: true,
          message: 'Registration successful',
          user,
          token: data.token
        };
      } else {
        return {
          success: false,
          message: data.message || 'Registration failed'
        };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        message: 'An error occurred during registration'
      };
    } finally {
      setIsLoading(false);
    }
  };

  // Ensure all values match the context type
  const contextValue: AuthContextType = {
    user,
    userProfile,
    isLoading,
    isLoggedIn: !!user,
    isInitialized,
    login,
    logout,
    register
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
