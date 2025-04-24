
import { createContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AuthContextType, AuthUser } from '@/types/authTypes';
import { toast } from 'sonner';
import { mockLoginRequest, mockRegisterRequest, handleAuthError } from '@/utils/authUtils';

// Create the Auth Context
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define the props for the AuthProvider component
interface AuthProviderProps {
  children: React.ReactNode;
}

// Default user state
const initialState = {
  user: null,
  isLoading: true,
  error: null,
  isAuthenticated: false,
  initialized: false,
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [session, setSession] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);

  // Check if user is authenticated
  const isAuthenticated = !!user;

  // Function to refresh user profile data
  const refreshProfile = async () => {
    if (!user) return;
    
    try {
      // Here you would fetch user profile data from your database
      // For now, we're just using the user data we already have
      setProfile(user);
    } catch (error) {
      console.error('Error refreshing profile:', error);
    }
  };

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);
      
      try {
        // Get current session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          setSession(session);
          setUser(session.user as AuthUser);
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

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user as AuthUser || null);
        
        if (session?.user) {
          await refreshProfile();
        }
        
        setIsLoading(false);
        setInitialized(true);
      }
    );

    // Clean up subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Check if user has a specific role
  const checkRole = (role: string): boolean => {
    if (!user) return false;
    
    // Check in roles array if it exists
    if (user.roles && Array.isArray(user.roles)) {
      return user.roles.some(r => 
        (typeof r === 'string' && r === role) || 
        (typeof r === 'object' && r.name === role)
      );
    }
    
    // Fall back to role property
    if (user.role) {
      return user.role === role;
    }
    
    return false;
  };

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // For actual Supabase implementation
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
    } catch (error) {
      const errorMessage = handleAuthError(error);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Alias for login
  const signIn = login;

  // Register function
  const register = async (email: string, password: string, username?: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // For actual Supabase implementation
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
      
      toast.success('Registration successful!');
      
      return { 
        success: true, 
        user: data.user as AuthUser,
        session: data.session
      };
    } catch (error) {
      const errorMessage = handleAuthError(error);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    setIsLoading(true);
    
    try {
      // For actual Supabase implementation
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      setUser(null);
      setProfile(null);
      setSession(null);
      
      toast.success('Successfully logged out');
    } catch (error) {
      console.error('Logout error:', error);
      setError('Failed to logout');
    } finally {
      setIsLoading(false);
    }
  };

  // Alias for logout
  const signOut = logout;

  // Reset password function
  const resetPassword = async (email: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // For actual Supabase implementation
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });
      
      if (error) throw error;
      
      toast.success('Password reset instructions sent to your email');
      return true;
    } catch (error) {
      const errorMessage = handleAuthError(error);
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Verify email function
  const verifyEmail = async (token: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // This would be implemented with your email verification logic
      // For now, returning a mock successful result
      return { success: true };
    } catch (error) {
      const errorMessage = handleAuthError(error);
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Update user profile function
  const updateUserProfile = async (userData: Partial<AuthUser>) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // For actual Supabase implementation
      const { data, error } = await supabase.auth.updateUser({
        data: userData
      });
      
      if (error) throw error;
      
      if (user) {
        setUser({ ...user, ...userData });
      }
      
      await refreshProfile();
      
      toast.success('Profile updated successfully');
      return true;
    } catch (error) {
      const errorMessage = handleAuthError(error);
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Alias for updateUserProfile
  const updateUser = updateUserProfile;
  const updateProfile = updateUserProfile;

  // Load user profile function
  const loadUserProfile = async () => {
    if (!user) return null;
    
    setIsLoading(true);
    
    try {
      // Here you would fetch the user's profile from your database
      // For now, we're just returning the user data we already have
      setProfile(user);
      return user;
    } catch (error) {
      console.error('Error loading user profile:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Send password reset email (alias for resetPassword)
  const sendPasswordResetEmail = async (email: string) => {
    const result = await resetPassword(email);
    return { success: result };
  };

  // Request password reset (alias for resetPassword)
  const requestPasswordReset = sendPasswordResetEmail;

  // Update password function
  const updatePassword = async (currentPassword: string, newPassword: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // First verify the current password
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: user?.email || '',
        password: currentPassword,
      });
      
      if (signInError) {
        setError('Current password is incorrect');
        return false;
      }
      
      // Then update the password
      const { error } = await supabase.auth.updateUser({ 
        password: newPassword 
      });
      
      if (error) throw error;
      
      toast.success('Password updated successfully');
      return true;
    } catch (error) {
      const errorMessage = handleAuthError(error);
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Delete account function
  const deleteAccount = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // For actual Supabase implementation, you might need admin rights or an edge function
      // This is a simplified version
      const { error } = await supabase.auth.admin.deleteUser(
        user?.id || ''
      );
      
      if (error) {
        // Try a fallback approach
        const { error: deleteError } = await supabase.rpc('delete_user');
        if (deleteError) throw deleteError;
      }
      
      // Sign out the user after deletion
      await logout();
      
      toast.success('Account deleted successfully');
      return true;
    } catch (error) {
      const errorMessage = handleAuthError(error);
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Clear any authentication errors
  const clearError = () => setError(null);

  // Compile all auth functions and state
  const authContextValue: AuthContextType = {
    user,
    profile,
    session,
    isLoading,
    loading: isLoading,
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
    checkRole,
    updatePassword,
    deleteAccount,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Export hooks and components
export { AuthContext, AuthProvider };
