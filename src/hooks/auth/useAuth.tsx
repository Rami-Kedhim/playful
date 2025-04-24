
import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthContextType, AuthUser, AuthResult } from '@/types/authTypes';
import { supabase } from '@/integrations/supabase/client';

// Create the auth context with default values
export const AuthContext = createContext<AuthContextType>({
  user: null,
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
  sendPasswordResetEmail: async () => ({ success: false }),
  requestPasswordReset: async () => ({ success: false }),
  verifyEmail: async () => ({ success: false }),
  updateUserProfile: async () => false,
  updateUser: async () => false,
  updateProfile: async () => false,
  loadUserProfile: async () => null,
  refreshProfile: async () => {},
  clearError: () => {},
  profile: null,
  checkRole: () => false,
  updatePassword: async () => false,
  deleteAccount: async () => false,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);
  const [profile, setProfile] = useState<any>(null);

  // Initialize auth state
  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user as AuthUser || null);

        // Defer profile fetching to avoid potential deadlocks
        if (session?.user) {
          setTimeout(() => {
            loadUserProfile().then(profile => {
              if (profile) setProfile(profile);
            });
          }, 0);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user as AuthUser || null);
      setIsLoading(false);
      setInitialized(true);

      if (session?.user) {
        loadUserProfile().then(profile => {
          if (profile) setProfile(profile);
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Login with email and password
  const login = async (email: string, password: string): Promise<AuthResult> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      });
      
      if (error) throw error;
      
      return { success: true, user: data.user as AuthUser, session: data.session };
    } catch (error: any) {
      const errorMessage = error.message || "Failed to login. Please check your credentials.";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Alias for login
  const signIn = login;

  // Register a new user
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
      
      return { success: true, user: data.user as AuthUser, session: data.session };
    } catch (error: any) {
      const errorMessage = error.message || "Registration failed. Please try again.";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Logout the current user
  const logout = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      // Clear user and session state
      setUser(null);
      setSession(null);
      setProfile(null);
    } catch (error: any) {
      const errorMessage = error.message || "Failed to logout. Please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Alias for logout
  const signOut = logout;

  // Update user profile
  const updateProfile = async (userData: Partial<any>): Promise<boolean> => {
    if (!user) return false;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Update auth user metadata if needed
      if (userData.email || userData.password || userData.data) {
        const { error } = await supabase.auth.updateUser({
          email: userData.email,
          password: userData.password,
          data: userData.data
        });
        
        if (error) throw error;
      }
      
      // Update profile data if we have a profiles table
      if (profile) {
        const { error } = await supabase
          .from('profiles')
          .update(userData)
          .eq('id', user.id);
          
        if (error) throw error;
        
        // Refresh profile data
        await refreshProfile();
      }
      
      return true;
    } catch (error: any) {
      const errorMessage = error.message || "Failed to update profile.";
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Aliases for updateProfile
  const updateUser = updateProfile;
  const updateUserProfile = updateProfile;

  // Load user profile
  const loadUserProfile = async (): Promise<any | null> => {
    if (!user) return null;
    
    try {
      // Try to fetch from profiles table if it exists
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) {
        console.log('No profiles table or other error:', error);
        // Fall back to just the user object if no profiles table
        return user;
      }
      
      return data;
    } catch (error) {
      console.error('Error loading profile:', error);
      return null;
    }
  };

  // Refresh user profile data
  const refreshProfile = async (): Promise<void> => {
    const profileData = await loadUserProfile();
    if (profileData) {
      setProfile(profileData);
    }
  };

  // Send password reset email
  const sendPasswordResetEmail = async (email: string): Promise<AuthResult> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) throw error;
      
      return { success: true };
    } catch (error: any) {
      const errorMessage = error.message || "Failed to send password reset email.";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Aliases for sendPasswordResetEmail
  const resetPassword = async (email: string): Promise<boolean> => {
    const result = await sendPasswordResetEmail(email);
    return result.success;
  };
  
  const requestPasswordReset = sendPasswordResetEmail;

  // Verify email
  const verifyEmail = async (token: string): Promise<AuthResult> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // This is a placeholder since we don't actually verify emails in this simple example
      // In a real implementation, you'd use supabase.auth.verifyOTP or similar
      return { success: true };
    } catch (error: any) {
      const errorMessage = error.message || "Failed to verify email.";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Check if a user has a specific role
  const checkRole = (role: string): boolean => {
    if (!user) return false;
    
    // Check in roles array if it exists
    if (user.roles && Array.isArray(user.roles)) {
      return user.roles.some(r => 
        (typeof r === 'string' && r === role) || 
        (typeof r === 'object' && r.name === role)
      );
    }
    
    // Fall back to role property if it exists
    if (user.role) {
      return user.role === role;
    }
    
    return false;
  };

  // Update user password
  const updatePassword = async (oldPassword: string, newPassword: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // First verify the old password by attempting to sign in
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: user?.email || '',
        password: oldPassword,
      });
      
      if (signInError) {
        setError("Current password is incorrect");
        return false;
      }
      
      // Then update the password
      const { error: updateError } = await supabase.auth.updateUser({ 
        password: newPassword 
      });
      
      if (updateError) throw updateError;
      
      return true;
    } catch (error: any) {
      const errorMessage = error.message || "Failed to update password.";
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Delete user account
  const deleteAccount = async (): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Check if we have a 'delete_user' RPC function on Supabase
      const { error } = await supabase.rpc('delete_user');
      
      if (error) {
        console.error("Error deleting account:", error);
        throw new Error("Failed to delete account. Please contact support.");
      }
      
      // Sign out the user
      await supabase.auth.signOut();
      
      // Clear local state
      setUser(null);
      setSession(null);
      setProfile(null);
      
      return true;
    } catch (error: any) {
      const errorMessage = error.message || "Failed to delete account.";
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Clear any errors
  const clearError = () => setError(null);

  // Calculate isAuthenticated status
  const isAuthenticated = !!user && !!session;

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      loading: isLoading, // Alias for backward compatibility
      error,
      isAuthenticated,
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
      refreshProfile,
      clearError,
      profile,
      session,
      checkRole,
      updatePassword,
      deleteAccount,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

export default useAuth;
