
import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthUser, AuthContextType } from '@/types/authTypes';

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  resetPassword: async () => {},
  error: null,
  userRoles: [],
  updateUserProfile: async () => {},
  clearError: () => {},
  profile: null,
  refreshProfile: async () => {},
  checkRole: () => false,
  updatePassword: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userRoles, setUserRoles] = useState<string[]>([]);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    // Check if there's a user in localStorage (mock authentication)
    const storedUser = localStorage.getItem('uberEscortsUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        
        // Add required AuthUser properties if they don't exist
        if (!parsedUser.app_metadata) parsedUser.app_metadata = {};
        if (!parsedUser.user_metadata) parsedUser.user_metadata = {};
        if (!parsedUser.aud) parsedUser.aud = 'authenticated';
        
        setUser(parsedUser);
        setIsAuthenticated(true);
        
        // Set default role if none exists
        const roles = parsedUser.role ? [parsedUser.role] : ['user'];
        setUserRoles(roles);
        
        // Set default profile
        setProfile({
          username: parsedUser.username || parsedUser.email?.split('@')[0],
          avatar_url: parsedUser.profileImageUrl,
          full_name: parsedUser.username || parsedUser.email?.split('@')[0],
        });
      } catch (e) {
        console.error("Error parsing stored user:", e);
        localStorage.removeItem('uberEscortsUser');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // For demo purposes, always succeed with mock user
      const mockUser: AuthUser = { 
        id: '1', 
        email, 
        username: email.split('@')[0],
        role: 'user',
        app_metadata: {},
        user_metadata: {},
        aud: 'authenticated',
        created_at: new Date().toISOString(),
      };
      
      localStorage.setItem('uberEscortsUser', JSON.stringify(mockUser));
      setUser(mockUser);
      setIsAuthenticated(true);
      setUserRoles(['user']);
      
      // Set default profile
      setProfile({
        username: mockUser.username,
        avatar_url: mockUser.profileImageUrl,
        full_name: mockUser.username,
      });
    } catch (error) {
      console.error("Login error:", error);
      setError("Failed to login. Please check your credentials.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, username?: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, always succeed with mock user
      const mockUser: AuthUser = { 
        id: String(Date.now()), 
        email, 
        username: username || email.split('@')[0],
        role: 'user',
        app_metadata: {},
        user_metadata: {},
        aud: 'authenticated',
        created_at: new Date().toISOString(),
      };
      
      localStorage.setItem('uberEscortsUser', JSON.stringify(mockUser));
      setUser(mockUser);
      setIsAuthenticated(true);
      setUserRoles(['user']);
      
      // Set default profile
      setProfile({
        username: mockUser.username,
        avatar_url: mockUser.profileImageUrl,
        full_name: mockUser.username,
      });
    } catch (error) {
      console.error("Registration error:", error);
      setError("Failed to register. Please try again.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      localStorage.removeItem('uberEscortsUser');
      setUser(null);
      setIsAuthenticated(false);
      setUserRoles([]);
      setProfile(null);
    } catch (error) {
      console.error("Logout error:", error);
      setError("Failed to logout. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const resetPassword = async (email: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // In a real app, this would send a password reset email
    } catch (error) {
      console.error("Password reset error:", error);
      setError("Failed to send password reset email. Please try again.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const updateUserProfile = async (userData: Partial<AuthUser>) => {
    setIsLoading(true);
    try {
      if (!user) {
        throw new Error("No user logged in");
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const updatedUser = { ...user, ...userData };
      localStorage.setItem('uberEscortsUser', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      // Update roles if role changed
      if (userData.role && userData.role !== user.role) {
        setUserRoles([userData.role]);
      }
      
      // Update profile
      setProfile(prev => ({
        ...prev,
        username: updatedUser.username,
        avatar_url: updatedUser.profileImageUrl,
        full_name: updatedUser.username,
      }));
    } catch (error) {
      console.error("Profile update error:", error);
      setError("Failed to update profile. Please try again.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const clearError = () => {
    setError(null);
  };
  
  const refreshProfile = async () => {
    if (!user) return;
    
    try {
      // In a real app, this would fetch the latest profile data from the API
      // For demo, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 300));
    } catch (error) {
      console.error("Profile refresh error:", error);
    }
  };
  
  const checkRole = (role: string) => {
    return userRoles.includes(role);
  };
  
  const updatePassword = async (oldPassword: string, newPassword: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      // In a real app, this would update the user's password
    } catch (error) {
      console.error("Password update error:", error);
      setError("Failed to update password. Please try again.");
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
      register,
      logout,
      resetPassword,
      error,
      userRoles,
      updateUserProfile,
      clearError,
      profile,
      refreshProfile,
      checkRole,
      updatePassword
    }}>
      {children}
    </AuthContext.Provider>
  );
};
