
import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContextType, AuthUser, AuthResult } from '@/types/authTypes';
import { supabase } from '@/integrations/supabase/client';
import { useAuthState } from './useAuthState';
import { toast } from 'sonner';

// Create Auth Context
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create Auth Provider
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [initialized, setInitialized] = useState<boolean>(false);
  const { 
    authState, 
    setIsLoading: setAuthStateLoading, 
    setUser, 
    setProfile, 
    refreshProfile 
  } = useAuthState();

  // Extract values from authState
  const { user, profile, userRoles } = authState;
  
  /**
   * Check if user has specific role
   */
  const checkRole = (role: string): boolean => {
    return userRoles.includes(role);
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setIsLoading(true);
        
        if (session) {
          // Convert Supabase user to AuthUser format
          const authUser: AuthUser = {
            id: session.user.id,
            email: session.user.email || '',
            username: session.user.user_metadata?.username,
            profileImageUrl: session.user.user_metadata?.avatar_url,
            role: session.user.user_metadata?.role,
            isVerified: session.user.email_confirmed_at !== null,
            user_metadata: session.user.user_metadata,
            aud: session.user.aud,
            created_at: session.user.created_at,
          };
          
          // Set user in state
          setUser(authUser);
          
          // Fetch additional profile data if needed
          setTimeout(() => {
            refreshProfile();
          }, 0);
        } else {
          setUser(null);
        }
        
        setIsLoading(false);
      }
    );

    // Check for existing session on app load
    const initializeAuth = async () => {
      setIsLoading(true);
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          // Convert Supabase user to AuthUser format
          const authUser: AuthUser = {
            id: session.user.id,
            email: session.user.email || '',
            username: session.user.user_metadata?.username,
            profileImageUrl: session.user.user_metadata?.avatar_url,
            role: session.user.user_metadata?.role,
            isVerified: session.user.email_confirmed_at !== null,
            user_metadata: session.user.user_metadata,
            aud: session.user.aud,
            created_at: session.user.created_at,
          };
          
          setUser(authUser);
          
          // Fetch additional profile data
          await refreshProfile();
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setIsLoading(false);
        setInitialized(true);
      }
    };

    initializeAuth();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  /**
   * Register a new user
   */
  const register = async (email: string, password: string, username?: string): Promise<AuthResult> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: username || email.split('@')[0],
            role: 'user',
          }
        }
      });
      
      if (error) throw error;

      toast.success("Account created", {
        description: "Your account has been created successfully."
      });
      
      return { success: true };
    } catch (error: any) {
      const errorMessage = error.message || "Failed to register";
      setError(errorMessage);
      toast.error("Registration failed", {
        description: errorMessage
      });
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Log in a user
   */
  const login = async (email: string, password: string): Promise<AuthResult> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      toast.success("Logged in successfully");
      
      return { success: true };
    } catch (error: any) {
      const errorMessage = error.message || "Failed to login";
      setError(errorMessage);
      toast.error("Login failed", {
        description: errorMessage
      });
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Log out the current user
   */
  const logout = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      toast.success("Logged out successfully");
      
    } catch (error: any) {
      const errorMessage = error.message || "Failed to logout";
      setError(errorMessage);
      toast.error("Logout failed", {
        description: errorMessage
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  /**
   * Request password reset email
   */
  const resetPassword = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      
      if (error) throw error;
      
      toast.success("Password reset email sent", {
        description: "Check your inbox for instructions."
      });
      
      return true;
    } catch (error: any) {
      const errorMessage = error.message || "Failed to send password reset email";
      setError(errorMessage);
      toast.error("Reset failed", {
        description: errorMessage
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  /**
   * Update user profile data
   */
  const updateUserProfile = async (userData: Partial<AuthUser>): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase.auth.updateUser({
        data: { ...userData }
      });
      
      if (error) throw error;
      
      // Refresh profile data after update
      await refreshProfile();
      
      toast.success("Profile updated successfully");
      
      return true;
    } catch (error: any) {
      const errorMessage = error.message || "Failed to update profile";
      setError(errorMessage);
      toast.error("Update failed", {
        description: errorMessage
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  /**
   * Update user profile in profiles table
   */
  const updateProfile = async (profileData: any): Promise<boolean> => {
    if (!user) return false;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update(profileData)
        .eq('id', user.id);
      
      if (error) throw error;
      
      // Refresh profile data
      await refreshProfile();
      
      toast.success("Profile updated successfully");
      
      return true;
    } catch (error: any) {
      const errorMessage = error.message || "Failed to update profile";
      setError(errorMessage);
      toast.error("Update failed", {
        description: errorMessage
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Update the user's password
   */
  const updatePassword = async (currentPassword: string, newPassword: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // First verify the current password by attempting to sign in
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: user?.email || '',
        password: currentPassword,
      });
      
      if (signInError) {
        setError("Current password is incorrect");
        toast.error("Password update failed", {
          description: "Current password is incorrect"
        });
        return false;
      }
      
      // Then update the password
      const { error: updateError } = await supabase.auth.updateUser({ 
        password: newPassword 
      });
      
      if (updateError) throw updateError;
      
      toast.success("Password updated", {
        description: "Your password has been updated successfully."
      });
      
      return true;
    } catch (error: any) {
      const errorMessage = error.message || "Failed to update password";
      setError(errorMessage);
      toast.error("Update failed", {
        description: errorMessage
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Delete a user account
   */
  const deleteAccount = async (): Promise<boolean> => {
    if (!user) return false;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Call the RPC function to delete the user
      const { error } = await supabase.rpc('delete_user');
      
      if (error) throw error;
      
      // Sign out after successful deletion
      await supabase.auth.signOut();
      
      toast.success("Account deleted", {
        description: "Your account has been permanently deleted."
      });
      
      return true;
    } catch (error: any) {
      const errorMessage = error.message || "Failed to delete account";
      setError(errorMessage);
      toast.error("Delete failed", {
        description: errorMessage
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);
  
  // Create auth context value
  const contextValue: AuthContextType = {
    user,
    login,
    logout,
    isLoading,
    error,
    isAuthenticated: !!user,
    register,
    resetPassword,
    updateUserProfile,
    clearError,
    profile,
    refreshProfile,
    checkRole,
    updatePassword,
    deleteAccount
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Create useAuth hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default useAuth;
