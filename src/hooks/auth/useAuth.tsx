
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AuthContextType, AuthResult, AuthUser } from '@/types/authTypes';
import { handleAuthError } from '@/utils/authUtils';
import { User } from '@/types/user';

// Create Auth Context with default values
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState<boolean>(false);
  const [session, setSession] = useState<any>(null);

  // Method to clear any error messages
  const clearError = () => setError(null);

  // Initialize the auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Set up auth listener
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          (event, session) => {
            setSession(session);
            if (session?.user) {
              const authUser: AuthUser = {
                id: session.user.id,
                email: session.user.email || '',
                username: session.user.user_metadata?.username || session.user.email?.split('@')[0] || '',
                role: session.user.user_metadata?.role || 'user',
                roles: session.user.user_metadata?.roles || ['user'],
                user_metadata: session.user.user_metadata || {},
                aud: session.user.aud || 'authenticated',
                created_at: session.user.created_at || new Date().toISOString(),
              };
              setUser(authUser);
              
              // Load profile data in a separate call to avoid deadlocks
              setTimeout(() => {
                loadUserProfile();
              }, 0);
            } else {
              setUser(null);
              setProfile(null);
            }
          }
        );

        // Check for initial session
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        
        if (session?.user) {
          const authUser: AuthUser = {
            id: session.user.id,
            email: session.user.email || '',
            username: session.user.user_metadata?.username || session.user.email?.split('@')[0] || '',
            role: session.user.user_metadata?.role || 'user',
            roles: session.user.user_metadata?.roles || ['user'],
            user_metadata: session.user.user_metadata || {},
            aud: session.user.aud || 'authenticated',
            created_at: session.user.created_at || new Date().toISOString(),
          };
          setUser(authUser);
          await loadUserProfile();
        }
        
        setInitialized(true);
        setIsLoading(false);
        
        return () => {
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error("Error initializing auth:", error);
        setIsLoading(false);
        setInitialized(true);
      }
    };

    initializeAuth();
  }, []);

  // Login method
  const login = async (email: string, password: string): Promise<AuthResult> => {
    setIsLoading(true);
    clearError();
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      });
      
      if (error) throw error;
      
      return { success: true, user: data.user as AuthUser };
    } catch (error: any) {
      const errorMessage = handleAuthError(error);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Alternative name for login for API consistency
  const signIn = login;

  // Logout method
  const logout = async (): Promise<void> => {
    setIsLoading(true);
    clearError();
    
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      setProfile(null);
    } catch (error: any) {
      const errorMessage = handleAuthError(error);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Alternative name for logout for API consistency
  const signOut = logout;

  // Register method
  const register = async (email: string, password: string, username?: string): Promise<AuthResult> => {
    setIsLoading(true);
    clearError();
    
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
      
      return { success: true, user: data.user as AuthUser };
    } catch (error: any) {
      const errorMessage = handleAuthError(error);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Reset password request
  const resetPassword = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    clearError();
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      return true;
    } catch (error: any) {
      const errorMessage = handleAuthError(error);
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Alternative names for resetPassword
  const sendPasswordResetEmail = resetPassword;
  const requestPasswordReset = resetPassword;

  // Email verification
  const verifyEmail = async (token: string): Promise<AuthResult> => {
    setIsLoading(true);
    clearError();
    
    try {
      // This is a placeholder as Supabase handles email verification automatically
      return { success: true };
    } catch (error: any) {
      const errorMessage = handleAuthError(error);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Update user profile data
  const updateUserProfile = async (userData: Partial<AuthUser>): Promise<boolean> => {
    setIsLoading(true);
    clearError();
    
    try {
      if (!user) return false;
      
      // Update user metadata
      const { error } = await supabase.auth.updateUser({
        data: userData
      });
      
      if (error) throw error;
      
      // Update local user state
      setUser(prev => prev ? { ...prev, ...userData } : null);
      
      return true;
    } catch (error: any) {
      const errorMessage = handleAuthError(error);
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Alternative names for updateUserProfile
  const updateUser = updateUserProfile;
  const updateProfile = updateUserProfile;

  // Load user profile data from profiles table
  const loadUserProfile = async (): Promise<AuthUser | null> => {
    if (!user) return null;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error && error.code !== 'PGRST116') {
        console.error("Error loading profile:", error);
        return user;
      }
      
      if (data) {
        setProfile(data);
      }
      
      return user;
    } catch (error) {
      console.error("Failed to load user profile:", error);
      return user;
    }
  };

  // Refresh user profile data
  const refreshProfile = async (): Promise<void> => {
    if (user) {
      await loadUserProfile();
    }
  };

  // Update user password
  const updatePassword = async (oldPassword: string, newPassword: string): Promise<boolean> => {
    setIsLoading(true);
    clearError();
    
    try {
      // First verify the current password by attempting to sign in
      if (user?.email) {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: user.email,
          password: oldPassword,
        });
        
        if (signInError) {
          setError("Current password is incorrect");
          return false;
        }
      }
      
      // Then update the password
      const { error } = await supabase.auth.updateUser({ 
        password: newPassword 
      });
      
      if (error) throw error;
      
      return true;
    } catch (error: any) {
      const errorMessage = handleAuthError(error);
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Delete user account
  const deleteAccount = async (): Promise<boolean> => {
    setIsLoading(true);
    clearError();
    
    try {
      // Delete user data from profiles table
      if (user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .delete()
          .eq('id', user.id);
        
        if (profileError) {
          console.error("Error deleting user profile:", profileError);
        }
      }
      
      // Use the RPC function to delete the user account
      const { error } = await supabase.rpc('delete_user');
      
      if (error) throw error;
      
      // Sign out after deletion
      await supabase.auth.signOut();
      setUser(null);
      setProfile(null);
      
      return true;
    } catch (error: any) {
      const errorMessage = handleAuthError(error);
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Check if user has a specific role
  const checkRole = (role: string): boolean => {
    if (!user) return false;
    
    // Check in roles array if it exists
    if (user.roles && Array.isArray(user.roles)) {
      return user.roles.some(r => 
        (typeof r === 'string' && r === role) || 
        (typeof r === 'object' && 'name' in r && r.name === role)
      );
    }
    
    // Fall back to role property if it exists
    if (user.role) {
      return user.role === role;
    }
    
    return false;
  };

  const isAuthenticated = !!user;

  // Context value that will be provided to consumers
  const contextValue: AuthContextType = {
    user,
    profile,
    isLoading,
    loading: isLoading, // Alias for isLoading
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
    clearError,
    refreshProfile,
    checkRole,
    updatePassword,
    deleteAccount,
    session
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
