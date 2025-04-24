
import { createContext, useContext, useEffect, useState } from 'react';
import { AuthContextType, AuthUser, AuthResult } from '@/types/authTypes';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define the AuthProvider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [session, setSession] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);

  // Check if the user is authenticated
  const isAuthenticated = !!session && !!user;

  // Initialize the auth state
  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      
      try {
        // Set up auth state listener FIRST (to prevent missing auth events)
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          (event, currentSession) => {
            setSession(currentSession);
            setUser(currentSession?.user as AuthUser || null);
            
            // Fetch user profile when auth state changes (deferred to prevent deadlock)
            if (currentSession?.user) {
              setTimeout(() => {
                fetchUserProfile(currentSession.user.id);
              }, 0);
            } else {
              setProfile(null);
            }
          }
        );
        
        // THEN check for existing session
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        setSession(currentSession);
        setUser(currentSession?.user as AuthUser || null);
        
        // Load user profile if we have a session
        if (currentSession?.user) {
          await fetchUserProfile(currentSession.user.id);
        }
        
        setInitialized(true);
        
        return () => {
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error('Auth initialization error:', error);
        setError('Failed to initialize authentication');
      } finally {
        setIsLoading(false);
      }
    };
    
    initAuth();
  }, []);
  
  // Fetch user profile from the database
  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
        
      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };
  
  // Login function (alias to signIn for backward compatibility)
  const login = async (email: string, password: string): Promise<AuthResult> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      });
      
      if (error) throw error;
      
      return { 
        success: true,
        user: data.user as AuthUser,
        session: data.session
      };
    } catch (error: any) {
      const errorMessage = error.message || "Failed to login. Please check your credentials.";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // SignIn function (identical to login for consistency)
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
            role: 'user',
          }
        }
      });
      
      if (error) throw error;

      toast.success("Registration successful", {
        description: "Your account has been created successfully."
      });
      
      return { 
        success: true,
        user: data.user as AuthUser,
        session: data.session
      };
    } catch (error: any) {
      const errorMessage = error.message || "Registration failed. Please try again.";
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
      
      if (error) throw error;
      
      toast.success("Logged out successfully");
      setUser(null);
      setSession(null);
      setProfile(null);
    } catch (error: any) {
      const errorMessage = error.message || "Failed to logout.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // SignOut function (identical to logout for consistency)
  const signOut = logout;

  // Update user profile
  const updateUserProfile = async (userData: Partial<AuthUser>): Promise<boolean> => {
    if (!user) return false;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Update auth user metadata if needed
      if (userData.username || userData.avatarUrl) {
        const { error } = await supabase.auth.updateUser({
          data: {
            username: userData.username || user.username,
            avatar_url: userData.avatarUrl || user.avatarUrl
          }
        });
        
        if (error) throw error;
      }
      
      // Update profile in profiles table if it exists
      if (profile) {
        const { error } = await supabase
          .from('profiles')
          .update({
            username: userData.username || profile.username,
            avatar_url: userData.avatarUrl || profile.avatar_url,
            full_name: userData.full_name || profile.full_name,
            website: userData.website || profile.website,
            bio: userData.bio || profile.bio
          })
          .eq('id', user.id);
          
        if (error) throw error;
      }
      
      // Update local state
      setUser({ ...user, ...userData });
      await refreshProfile();
      
      toast.success("Profile updated successfully");
      return true;
    } catch (error: any) {
      const errorMessage = error.message || "Failed to update profile.";
      setError(errorMessage);
      toast.error(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Alias functions for consistency with other hooks
  const updateUser = updateUserProfile;
  const updateProfile = updateUserProfile;

  // Refresh user profile data
  const refreshProfile = async (): Promise<void> => {
    if (!user) return;
    await fetchUserProfile(user.id);
  };

  // Load user profile
  const loadUserProfile = async (): Promise<AuthUser | null> => {
    if (!user) return null;
    await fetchUserProfile(user.id);
    return user;
  };

  // Reset password
  const resetPassword = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });
      
      if (error) throw error;
      
      toast.success("Password reset email sent", {
        description: "Check your inbox for a password reset link."
      });
      
      return true;
    } catch (error: any) {
      const errorMessage = error.message || "Failed to send password reset email.";
      setError(errorMessage);
      toast.error(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Aliases for resetPassword for consistency
  const sendPasswordResetEmail = async (email: string): Promise<AuthResult> => {
    const success = await resetPassword(email);
    return { success };
  };

  const requestPasswordReset = async (email: string): Promise<AuthResult> => {
    const success = await resetPassword(email);
    return { success };
  };

  // Verify email
  const verifyEmail = async (token: string): Promise<AuthResult> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // This is a placeholder as Supabase handles email verification via link
      // Return success if we have a token
      return { success: !!token };
    } catch (error: any) {
      const errorMessage = error.message || "Failed to verify email.";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Check if user has a specific role
  const checkRole = (roleToCheck: string): boolean => {
    if (!user) return false;
    
    // Check in roles array if it exists
    if (user.roles && Array.isArray(user.roles)) {
      return user.roles.some(r => 
        (typeof r === 'string' && r === roleToCheck) || 
        (typeof r === 'object' && r.name === roleToCheck)
      );
    }
    
    // Fall back to role property if it exists
    if (user.role) {
      return user.role === roleToCheck;
    }
    
    return false;
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
      const errorMessage = error.message || "Failed to update password.";
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Delete a user account
   */
  const deleteAccount = async (): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Use Supabase RPC to delete user (requires a server-side function)
      const { error } = await supabase.rpc('delete_user');
      
      if (error) throw error;
      
      // Sign out the user after deletion
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      setProfile(null);
      
      toast.success("Account deleted successfully");
      return true;
    } catch (error: any) {
      const errorMessage = error.message || "Failed to delete account.";
      setError(errorMessage);
      toast.error(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);
  
  // Create the context value
  const authContextValue: AuthContextType = {
    user,
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
    profile,
    session,
    refreshProfile,
    checkRole,
    updatePassword,
    deleteAccount
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}

// Create the useAuth hook
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}

// Export the context for direct access
export { AuthContext };
