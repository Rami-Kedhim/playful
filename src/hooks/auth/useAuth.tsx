
import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthUser, AuthContextType } from '@/types/authTypes';
import { mockLoginRequest, mockRegisterRequest, mockResetPasswordRequest, getUserRoles } from '@/utils/authUtils';
import { toast } from "@/components/ui/use-toast";

// Create the auth context
export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState<boolean>(false);

  // Check if user is authenticated on component mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Try to get user from local storage (for demo purposes)
        const storedUser = localStorage.getItem('auth_user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser) as AuthUser;
          setUser(parsedUser);
          
          // Fetch the user profile (mock for now)
          const mockProfile = {
            id: parsedUser.id,
            username: parsedUser.username || parsedUser.email.split('@')[0],
            avatarUrl: parsedUser.avatarUrl || null,
            bio: 'No bio set',
          };
          setProfile(mockProfile);
        }
      } catch (err) {
        console.error('Error checking authentication:', err);
        setError('Failed to authenticate');
      } finally {
        setIsLoading(false);
        setInitialized(true);
      }
    };

    checkAuth();
  }, []);

  // Mock login function for demonstration
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const authUser = await mockLoginRequest(email, password);
      
      // Convert User to AuthUser format
      const convertedUser: AuthUser = {
        id: authUser.id,
        email: authUser.email || email, // Ensure email is always set
        name: authUser.name,
        role: authUser.role,
        user_metadata: authUser.user_metadata,
        created_at: authUser.created_at,
      };

      setUser(convertedUser);
      
      // Store in local storage (only for demo)
      localStorage.setItem('auth_user', JSON.stringify(convertedUser));
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${convertedUser.name || convertedUser.email.split('@')[0]}!`,
      });
      
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to log in');
      
      toast({
        title: "Login failed",
        description: err.message || 'Invalid credentials',
        variant: "destructive",
      });
      
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Alias for login for naming consistency
  const signIn = login;

  // Mock register function
  const register = async (email: string, password: string, username?: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const authUser = await mockRegisterRequest(email, password, username || '');
      
      // Convert to AuthUser format
      const convertedUser: AuthUser = {
        id: authUser.id,
        email: authUser.email || email, // Ensure email is always set
        name: authUser.name,
        username: username || authUser.username,
        role: authUser.role,
        user_metadata: authUser.user_metadata,
        created_at: authUser.created_at,
      };
      
      setUser(convertedUser);
      
      // Store in local storage (only for demo)
      localStorage.setItem('auth_user', JSON.stringify(convertedUser));
      
      toast({
        title: "Registration successful",
        description: `Welcome, ${username || email.split('@')[0]}!`,
      });
      
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to register');
      
      toast({
        title: "Registration failed",
        description: err.message || 'Registration failed',
        variant: "destructive",
      });
      
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Mock logout function
  const logout = async (): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Clear user data
      setUser(null);
      setProfile(null);
      
      // Remove from local storage
      localStorage.removeItem('auth_user');
      
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
      
      return true;
    } catch (err) {
      console.error('Error logging out:', err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Alias for logout for naming consistency
  const signOut = logout;

  // Update the user
  const updateUser = async (userData: Partial<AuthUser>): Promise<boolean> => {
    if (!user) return false;
    
    try {
      // Update the user data
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      
      // Update in local storage
      localStorage.setItem('auth_user', JSON.stringify(updatedUser));
      
      return true;
    } catch (err) {
      console.error('Error updating user:', err);
      return false;
    }
  };

  // Update the user profile
  const updateProfile = async (profileData: any): Promise<boolean> => {
    if (!profile) return false;
    
    try {
      // Update the profile data
      const updatedProfile = { ...profile, ...profileData };
      setProfile(updatedProfile);
      
      return true;
    } catch (err) {
      console.error('Error updating profile:', err);
      return false;
    }
  };

  // Load the user profile
  const loadUserProfile = async (): Promise<any> => {
    if (!user) return null;
    
    try {
      // For demo, just return the current profile
      return profile;
    } catch (err) {
      console.error('Error loading profile:', err);
      return null;
    }
  };

  // Refresh the profile
  const refreshProfile = async (): Promise<void> => {
    if (!user) return;
    
    try {
      // In a real app, fetch the profile from API
      // For demo, just use the existing profile
      const mockProfile = {
        id: user.id,
        username: user.username || user.email.split('@')[0],
        avatarUrl: user.avatarUrl || null,
        bio: 'No bio set',
      };
      
      setProfile(mockProfile);
    } catch (err) {
      console.error('Error refreshing profile:', err);
    }
  };

  // Password reset request
  const sendPasswordResetEmail = async (email: string): Promise<boolean> => {
    try {
      await mockResetPasswordRequest(email);
      
      toast({
        title: "Password Reset Email Sent",
        description: `If ${email} exists in our system, you will receive a password reset link shortly.`,
      });
      
      return true;
    } catch (err) {
      console.error('Error sending password reset:', err);
      return false;
    }
  };

  // Alias for sendPasswordResetEmail
  const resetPassword = sendPasswordResetEmail;
  const requestPasswordReset = sendPasswordResetEmail;

  // Update password
  const updatePassword = async (oldPassword: string, newPassword: string): Promise<boolean> => {
    // In a real app, this would verify the old password and update to the new one
    // For demo purposes, just return true
    return true;
  };

  // Verify email
  const verifyEmail = async (token: string): Promise<boolean> => {
    // In a real app, this would verify the email token
    // For demo purposes, just return true
    return true;
  };

  // Delete account
  const deleteAccount = async (): Promise<boolean> => {
    if (!user) return false;
    
    try {
      // Clear user data
      setUser(null);
      setProfile(null);
      
      // Remove from local storage
      localStorage.removeItem('auth_user');
      
      toast({
        title: "Account Deleted",
        description: "Your account has been successfully deleted.",
      });
      
      return true;
    } catch (err) {
      console.error('Error deleting account:', err);
      return false;
    }
  };

  // Check if user has a specific role
  const checkRole = (role: string): boolean => {
    if (!user) return false;
    
    if (user.role === role) {
      return true;
    }
    
    // Check in user_metadata.roles if it exists (could be an array)
    if (user.user_metadata?.roles) {
      if (Array.isArray(user.user_metadata.roles)) {
        return user.user_metadata.roles.includes(role);
      } else if (typeof user.user_metadata.roles === 'string') {
        return user.user_metadata.roles === role;
      }
    }
    
    return false;
  };

  // Alias for updateProfile for naming consistency
  const updateUserProfile = updateProfile;

  // Create context value object
  const contextValue: AuthContextType = {
    user,
    profile,
    loading: isLoading,
    isLoading,
    error,
    isAuthenticated: !!user,
    initialized,
    login,
    logout,
    signIn,
    signOut,
    register,
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
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
