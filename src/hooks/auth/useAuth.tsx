
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AuthContextType, AuthUser, AuthResult } from '@/types/authTypes';
import { toast } from 'sonner';

// Create the auth context
export const AuthContext = createContext<AuthContextType | null>(null);

// Default context state
const defaultAuthContext: AuthContextType = {
  user: null,
  profile: null,
  isLoading: true,
  loading: true,
  error: null,
  isAuthenticated: false,
  initialized: false,
  login: async () => ({ success: false }),
  signIn: async () => ({ success: false }),
  logout: async () => {},
  signOut: async () => {},
  register: async () => ({ success: false }),
  resetPassword: async () => false,
  sendPasswordResetEmail: async () => false,
  requestPasswordReset: async () => false,
  verifyEmail: async () => ({ success: false }),
  updateUserProfile: async () => false,
  updateUser: async () => false,
  updateProfile: async () => false,
  loadUserProfile: async () => null,
  clearError: () => {},
  refreshProfile: async () => {},
  checkRole: () => false,
  updatePassword: async () => false,
  deleteAccount: async () => false,
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<any>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);

  // Clear any auth errors
  const clearError = () => setError(null);

  // Function to check if a user has a specific role
  const checkRole = (role: string): boolean => {
    if (!user) return false;
    
    // If user has a direct role property
    if (user.role && user.role === role) {
      return true;
    }
    
    // If user has roles array
    if (user.roles) {
      // Handle either string[] or complex role objects
      if (Array.isArray(user.roles)) {
        // Check if roles is an array of strings
        if (user.roles.length > 0 && typeof user.roles[0] === 'string') {
          return (user.roles as string[]).includes(role);
        } 
        // Check if roles is an array of objects with name property
        else if (user.roles.length > 0 && typeof user.roles[0] === 'object') {
          return (user.roles as { name: string; permissions?: string[] }[])
            .some(r => r.name === role);
        }
      }
    }
    
    return false;
  };

  // Handle authentication state changes
  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        setSession(newSession);
        setUser(newSession?.user || null);
        setIsLoading(false);
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user || null);
      setIsLoading(false);
      setInitialized(true);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Load user profile when user changes
  useEffect(() => {
    const fetchProfile = async () => {
      if (user?.id) {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();
            
          if (!error && data) {
            setProfile(data);
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      } else {
        setProfile(null);
      }
    };
    
    fetchProfile();
  }, [user]);

  // Login function
  const login = async (email: string, password: string): Promise<AuthResult> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        setError(error.message);
        return { success: false, error: error.message };
      }
      
      return { 
        success: true,
        user: data.user,
        session: data.session
      };
    } catch (error: any) {
      const errorMessage = error.message || "Failed to login";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Sign in (alias for login)
  const signIn = login;

  // Register function
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
          }
        }
      });
      
      if (error) {
        setError(error.message);
        return { success: false, error: error.message };
      }
      
      toast.success("Registration successful", {
        description: "You have been successfully registered"
      });
      
      return { 
        success: true,
        user: data.user,
        session: data.session
      };
    } catch (error: any) {
      const errorMessage = error.message || "Failed to register";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }
      
      setUser(null);
      setProfile(null);
      setSession(null);
      
      toast.success("Logged out successfully");
    } catch (error: any) {
      setError(error.message || "Failed to logout");
    } finally {
      setIsLoading(false);
    }
  };

  // Sign out (alias for logout)
  const signOut = logout;

  // Reset password
  const resetPassword = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) {
        throw error;
      }
      
      toast.success("Password reset email sent");
      return true;
    } catch (error: any) {
      setError(error.message || "Failed to send reset password email");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Send password reset email (alias for resetPassword)
  const sendPasswordResetEmail = resetPassword;
  const requestPasswordReset = resetPassword;

  // Verify email
  const verifyEmail = async (token: string): Promise<AuthResult> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // This is a placeholder as Supabase handles email verification automatically
      return { success: true };
    } catch (error: any) {
      setError(error.message || "Failed to verify email");
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Update user profile
  const updateUserProfile = async (userData: Partial<AuthUser>): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      if (!user) {
        throw new Error("No user is logged in");
      }
      
      // Update Supabase auth user metadata if needed
      if (userData.username || userData.avatarUrl || userData.name) {
        const { error } = await supabase.auth.updateUser({
          data: {
            username: userData.username,
            avatar_url: userData.avatarUrl,
            name: userData.name,
          }
        });
        
        if (error) throw error;
      }
      
      // Update profile in database if needed
      if (user.id) {
        const { error } = await supabase
          .from('profiles')
          .update({
            ...userData,
            updated_at: new Date().toISOString(),
          })
          .eq('id', user.id);
        
        if (error) throw error;
      }
      
      // Update local state
      setUser(prev => prev ? { ...prev, ...userData } : null);
      
      toast.success("Profile updated successfully");
      return true;
    } catch (error: any) {
      setError(error.message || "Failed to update profile");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Aliases for updateUserProfile
  const updateUser = updateUserProfile;
  const updateProfile = updateUserProfile;

  // Load user profile
  const loadUserProfile = async (): Promise<AuthUser | null> => {
    if (!user?.id) return null;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) throw error;
      
      if (data) {
        setProfile(data);
        return { ...user, ...data };
      }
      
      return user;
    } catch (error: any) {
      console.error("Error loading user profile:", error);
      return user;
    }
  };

  // Refresh profile
  const refreshProfile = async (): Promise<void> => {
    if (!user?.id) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) throw error;
      
      if (data) {
        setProfile(data);
      }
    } catch (error: any) {
      console.error("Error refreshing profile:", error);
    }
  };

  // Update password
  const updatePassword = async (oldPassword: string, newPassword: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Verify old password first
      const email = user?.email;
      if (!email) throw new Error("User email not found");
      
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password: oldPassword,
      });
      
      if (signInError) {
        throw new Error("Current password is incorrect");
      }
      
      // Update to new password
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      
      if (error) throw error;
      
      toast.success("Password updated successfully");
      return true;
    } catch (error: any) {
      setError(error.message || "Failed to update password");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Delete account
  const deleteAccount = async (): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // This is a placeholder as Supabase doesn't have a direct method for users to delete their accounts
      // You would typically implement a custom function or edge function for this
      
      await logout();
      return true;
    } catch (error: any) {
      setError(error.message || "Failed to delete account");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const authContextValue: AuthContextType = {
    user,
    profile,
    isLoading,
    loading: isLoading, // Alias for isLoading
    error,
    isAuthenticated: !!user,
    initialized,
    login,
    signIn,
    logout,
    signOut,
    register,
    resetPassword,
    sendPasswordResetEmail,
    requestPasswordReset,
    verifyEmail,
    updateUserProfile,
    updateUser,
    updateProfile,
    loadUserProfile,
    clearError,
    refreshProfile,
    checkRole,
    updatePassword,
    deleteAccount,
    session,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
