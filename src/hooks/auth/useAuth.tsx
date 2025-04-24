
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AuthUser, AuthContextType, AuthResult } from '@/types/authTypes';
import { getUserRoles, handleAuthError } from '@/utils/authUtils';

// Create context with a default value
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState<boolean>(false);
  const [session, setSession] = useState<any | null>(null);

  // Check if user is authenticated
  const isAuthenticated = !!user;

  // Initialize auth state
  useEffect(() => {
    // Set up the auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        setSession(newSession);
        setUser(newSession?.user as AuthUser || null);
        
        // Fetch profile after auth state changes, but don't block the UI
        if (newSession?.user?.id) {
          setTimeout(() => {
            loadUserProfile().catch(console.error);
          }, 0);
        } else {
          setProfile(null);
        }
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user as AuthUser || null);
      
      if (currentSession?.user?.id) {
        loadUserProfile().catch(console.error);
      }
      
      setIsLoading(false);
      setInitialized(true);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Login method
  const login = async (email: string, password: string): Promise<AuthResult> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      // Auth state listener will handle setting the user
      return { success: true, user: data.user as AuthUser, session: data.session };
    } catch (err) {
      const errorMessage = handleAuthError(err);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Alias for login
  const signIn = login;

  // Logout method
  const logout = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      // Auth state listener will handle clearing the user
    } catch (err) {
      const errorMessage = handleAuthError(err);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Alias for logout
  const signOut = logout;

  // Register method
  const register = async (
    email: string, 
    password: string, 
    username?: string
  ): Promise<AuthResult> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: username || email.split('@')[0],
          }
        }
      });
      
      if (error) throw error;
      
      // Auth state listener will handle setting the user
      return { success: true, user: data.user as AuthUser, session: data.session };
    } catch (err) {
      const errorMessage = handleAuthError(err);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Reset password method
  const resetPassword = async (email: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });
      
      if (error) throw error;
      
      return true;
    } catch (err) {
      const errorMessage = handleAuthError(err);
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Alias for resetPassword
  const sendPasswordResetEmail = resetPassword;
  const requestPasswordReset = resetPassword;

  // Verify email method
  const verifyEmail = async (token: string): Promise<AuthResult> => {
    try {
      setIsLoading(true);
      setError(null);
      
      // This is a placeholder - actual email verification is usually handled by Supabase
      // via URL redirects. This method could be used to verify custom tokens.
      
      return { success: true };
    } catch (err) {
      const errorMessage = handleAuthError(err);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Update user profile
  const updateUserProfile = async (userData: Partial<AuthUser>): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      
      if (!user?.id) {
        throw new Error('User not authenticated');
      }
      
      const { error } = await supabase.auth.updateUser({
        data: userData
      });
      
      if (error) throw error;
      
      // Update local user state with new data
      setUser(prevUser => {
        if (!prevUser) return null;
        return {
          ...prevUser,
          ...userData
        };
      });
      
      return true;
    } catch (err) {
      const errorMessage = handleAuthError(err);
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Alias for updateUserProfile
  const updateUser = updateUserProfile;

  // Update profile in the profiles table
  const updateProfile = async (data: Partial<any>): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      
      if (!user?.id) {
        throw new Error('User not authenticated');
      }
      
      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', user.id);
      
      if (error) throw error;
      
      // Update local profile state
      setProfile(prevProfile => {
        if (!prevProfile) return data;
        return {
          ...prevProfile,
          ...data
        };
      });
      
      return true;
    } catch (err) {
      const errorMessage = handleAuthError(err);
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Load user profile from profiles table
  const loadUserProfile = async (): Promise<AuthUser | null> => {
    try {
      if (!user?.id) {
        return null;
      }
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        // PGRST116 means no rows returned, which is fine for new users
        throw error;
      }
      
      setProfile(data || null);
      
      return user;
    } catch (err) {
      console.error('Error loading user profile:', err);
      return user;
    }
  };

  // Refresh profile data
  const refreshProfile = async (): Promise<void> => {
    if (!user?.id) return;
    
    try {
      await loadUserProfile();
    } catch (err) {
      console.error('Error refreshing profile:', err);
    }
  };

  // Clear error
  const clearError = () => setError(null);

  // Check if user has a specific role
  const checkRole = (role: string): boolean => {
    if (!user) return false;
    
    if (user.role === role) return true;
    
    if (user.roles) {
      if (Array.isArray(user.roles)) {
        return user.roles.includes(role);
      } else {
        return user.roles.some(r => r.name === role);
      }
    }
    
    return false;
  };

  // Update password
  const updatePassword = async (oldPassword: string, newPassword: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      
      // First verify old password by attempting to sign in
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: user?.email || '',
        password: oldPassword,
      });
      
      if (signInError) {
        throw new Error('Current password is incorrect');
      }
      
      // Then update the password
      const { error } = await supabase.auth.updateUser({ 
        password: newPassword 
      });
      
      if (error) throw error;
      
      return true;
    } catch (err) {
      const errorMessage = handleAuthError(err);
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Delete account
  const deleteAccount = async (): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      
      if (!user?.id) {
        throw new Error('User not authenticated');
      }
      
      // This is a placeholder - actual account deletion may require custom backend logic
      // or Supabase admin functions, which can't be called from the client
      
      // For now, we'll just sign out
      await supabase.auth.signOut();
      
      return true;
    } catch (err) {
      const errorMessage = handleAuthError(err);
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const authContextValue: AuthContextType = {
    user,
    profile,
    login,
    signIn,
    logout,
    signOut,
    isLoading,
    loading: isLoading, // Alias for backward compatibility
    error,
    isAuthenticated,
    initialized,
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
    session
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
