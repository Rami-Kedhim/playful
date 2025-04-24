
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { toast } from 'sonner';
import { AuthContextType, AuthResult, AuthUser, UserProfile } from '@/types/auth';

// Create Auth Context
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth Provider Props
interface AuthProviderProps {
  children: ReactNode;
}

// Auth Provider Component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);

  // Check if user has a specific role
  const checkRole = (role: string): boolean => {
    if (!user) return false;
    
    // Check if user has role in roles array
    if (user.roles && Array.isArray(user.roles)) {
      return user.roles.some(r => 
        typeof r === 'string' ? r === role : r.name === role
      );
    }
    
    // Check if user has role in role property
    if (user.role) {
      return user.role === role;
    }
    
    return false;
  };

  // Initialize auth and setup listener
  useEffect(() => {
    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        
        if (currentSession?.user) {
          // Convert Supabase user to our AuthUser type
          const authUser: AuthUser = {
            ...currentSession.user,
            id: currentSession.user.id,
            email: currentSession.user.email || '',
            username: currentSession.user.user_metadata?.username,
            role: currentSession.user.user_metadata?.role,
            app_metadata: currentSession.user.app_metadata,
            user_metadata: currentSession.user.user_metadata,
            aud: currentSession.user.aud,
          };
          
          setUser(authUser);
          
          // Fetch user profile outside of the onAuthStateChange callback
          // to avoid deadlocks with Supabase client
          setTimeout(() => {
            loadUserProfile().catch(err => 
              console.error("Error loading user profile:", err)
            );
          }, 0);
        } else {
          setUser(null);
          setProfile(null);
        }
        
        setIsLoading(false);
      }
    );

    // Check for existing session on component mount
    const initializeAuth = async () => {
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        
        if (currentSession?.user) {
          setSession(currentSession);
          // Populate user state from session
          const authUser: AuthUser = {
            ...currentSession.user,
            id: currentSession.user.id,
            email: currentSession.user.email || '',
            username: currentSession.user.user_metadata?.username,
            role: currentSession.user.user_metadata?.role,
            app_metadata: currentSession.user.app_metadata,
            user_metadata: currentSession.user.user_metadata,
            aud: currentSession.user.aud,
          };
          
          setUser(authUser);
          
          // Load user profile
          await loadUserProfile();
        }
      } catch (err) {
        console.error("Error initializing auth:", err);
      } finally {
        setIsLoading(false);
        setInitialized(true);
      }
    };

    initializeAuth();

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Handle errors
  const handleError = (error: any): string => {
    const errorMessage = error.message || "An unexpected error occurred";
    setError(errorMessage);
    return errorMessage;
  };

  const clearError = () => {
    setError(null);
  };

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
        // Update user with profile data
        setUser(prev => prev ? { ...prev, ...data } : null);
        return { ...user, ...data };
      }
      
      return user;
    } catch (err) {
      console.error("Error loading user profile:", err);
      return user;
    }
  };

  // Refresh user profile
  const refreshProfile = async (): Promise<void> => {
    await loadUserProfile();
  };

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
      
      return { success: true };
    } catch (error: any) {
      return { success: false, error: handleError(error) };
    } finally {
      setIsLoading(false);
    }
  };

  // Register new user
  const register = async (
    email: string, 
    password: string, 
    username?: string, 
    options?: any
  ): Promise<AuthResult> => {
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
            ...options?.data
          },
          ...options
        }
      });
      
      if (error) throw error;
      
      toast.success("Registration successful", {
        description: "Your account has been created successfully."
      });
      
      return { success: true };
    } catch (error: any) {
      return { success: false, error: handleError(error) };
    } finally {
      setIsLoading(false);
    }
  };

  // Logout user
  const logout = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast.success("Logged out successfully");
    } catch (error: any) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Update user
  const updateUser = async (data: Partial<AuthUser>): Promise<boolean> => {
    if (!user) return false;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase.auth.updateUser({
        email: data.email,
        data: {
          ...data
        }
      });
      
      if (error) throw error;
      
      await refreshProfile();
      return true;
    } catch (error: any) {
      handleError(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Update user profile
  const updateUserProfile = async (data: Partial<UserProfile>): Promise<boolean> => {
    return updateProfile(data);
  };

  // Update profile
  const updateProfile = async (data: Partial<UserProfile>): Promise<boolean> => {
    if (!user?.id) return false;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Update profile table
      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', user.id);
      
      if (error) throw error;
      
      // Update auth metadata if needed
      if (data.email || data.username) {
        await updateUser({
          email: data.email,
          username: data.username
        });
      }
      
      await refreshProfile();
      toast.success("Profile updated successfully");
      return true;
    } catch (error: any) {
      handleError(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Request password reset
  const requestPasswordReset = async (email: string): Promise<AuthResult> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      
      toast.success("Password reset email sent", {
        description: "Check your email for password reset instructions"
      });
      return { success: true };
    } catch (error: any) {
      return { success: false, error: handleError(error) };
    } finally {
      setIsLoading(false);
    }
  };

  // Reset password with token
  const resetPassword = async (token: string, password: string): Promise<AuthResult> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      
      toast.success("Password reset successfully", {
        description: "You can now log in with your new password"
      });
      return { success: true };
    } catch (error: any) {
      return { success: false, error: handleError(error) };
    } finally {
      setIsLoading(false);
    }
  };

  // Update password
  const updatePassword = async (currentPassword: string, newPassword: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // First verify current password
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      if (!currentUser?.email) {
        throw new Error("User email not found");
      }
      
      // Verify current password by signing in
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: currentUser.email,
        password: currentPassword
      });
      
      if (signInError) {
        setError("Current password is incorrect");
        return false;
      }
      
      // Update to new password
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      
      if (error) throw error;
      
      toast.success("Password updated successfully");
      return true;
    } catch (error: any) {
      handleError(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Delete account
  const deleteAccount = async (): Promise<boolean> => {
    if (!user) return false;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Attempt to delete user data first (RLS policies should handle permissions)
      // This is necessary if you have user-specific data to cleanup before account deletion
      if (user.id) {
        await supabase.from('profiles').delete().eq('id', user.id);
      }
      
      // Delete the user account
      const { error } = await supabase.rpc('delete_current_user');
      
      if (error) {
        // If the RPC method fails or doesn't exist, fall back to auth.signOut
        // Note: This doesn't delete the account, just signs out
        await supabase.auth.signOut();
        throw new Error("Could not delete account. Please contact support.");
      }
      
      toast.success("Your account has been deleted");
      return true;
    } catch (error: any) {
      handleError(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Send password reset email
  const sendPasswordResetEmail = requestPasswordReset;
  
  // Verify email
  const verifyEmail = async (token: string): Promise<AuthResult> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // This is normally handled by Supabase automatically via email links
      // This function is here for consistency in the API
      return { success: true };
    } catch (error: any) {
      return { success: false, error: handleError(error) };
    } finally {
      setIsLoading(false);
    }
  };

  // Context value
  const value: AuthContextType = {
    user,
    profile,
    isLoading,
    loading: isLoading,
    error,
    isAuthenticated: !!user,
    initialized,
    login,
    logout,
    signIn: login,
    signOut: logout,
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
    checkRole,
    userRoles: user?.roles?.map(r => typeof r === 'string' ? r : r.name) || 
              (user?.role ? [user.role] : []), 
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Auth Hook
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

export default useAuth;
