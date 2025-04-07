
import React, { createContext, useState, useEffect } from 'react';
import { AuthUser, AuthResult, UserProfile, AuthContextType } from '@/types/auth';
import { supabase } from '@/integrations/supabase/client';
import { useAuthState } from './useAuthState';
import { usePasswordManagement } from './usePasswordManagement';
import { useAuthActions } from './useAuthActions';

// Create auth context - export it so it can be imported by useAuth
export const AuthContext = createContext<AuthContextType | null>(null);

// Use auth hook
export const useAuthContext = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

// Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Use our custom hooks
  const { authState, setIsLoading, setUser, setProfile, refreshProfile } = useAuthState();
  const { user, profile, isLoading, userRoles } = authState;
  
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [session, setSession] = useState<any>(null);

  // Password management
  const { resetPassword, updatePassword } = usePasswordManagement();

  // Auth actions
  const { login, register, logout } = useAuthActions();

  // Initialize auth state
  useEffect(() => {
    // First set up listener for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        // Handle auth state changes
        setSession(currentSession);
        setIsLoading(true);
        const currentUser = currentSession?.user || null;
        
        if (currentUser) {
          const mappedUser: AuthUser = {
            id: currentUser.id,
            email: currentUser.email || '',
            username: currentUser.user_metadata?.username || currentUser.email?.split('@')[0] || '',
            role: currentUser.user_metadata?.role || 'user',
            profileImageUrl: currentUser.user_metadata?.avatar_url,
            app_metadata: currentUser.app_metadata || {},
            user_metadata: currentUser.user_metadata || {},
            aud: currentUser.aud || 'authenticated',
            created_at: currentUser.created_at || new Date().toISOString(),
            lucoinsBalance: 0, // Default value
          };
          
          // Update state
          setIsAuthenticated(true);
          setUser(mappedUser);
          
          // Fetch profile after auth state changes
          await refreshProfile();
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }

        if (event === 'SIGNED_OUT') {
          // Clear all auth state
          setIsAuthenticated(false);
          setUser(null);
        }
        
        setIsLoading(false);
      }
    );

    // Then check for existing session
    const initializeAuth = async () => {
      try {
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        
        if (initialSession?.user) {
          const initialUser: AuthUser = {
            id: initialSession.user.id,
            email: initialSession.user.email || '',
            username: initialSession.user.user_metadata?.username || initialSession.user.email?.split('@')[0] || '',
            role: initialSession.user.user_metadata?.role || 'user',
            profileImageUrl: initialSession.user.user_metadata?.avatar_url,
            app_metadata: initialSession.user.app_metadata || {},
            user_metadata: initialSession.user.user_metadata || {},
            aud: initialSession.user.aud || 'authenticated',
            created_at: initialSession.user.created_at || new Date().toISOString(),
            lucoinsBalance: 0, // Default value
          };
          
          setSession(initialSession);
          setIsAuthenticated(true);
          setUser(initialUser);
          await refreshProfile();
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Clean up subscription on unmount
    return () => { 
      subscription.unsubscribe(); 
    };
  }, [refreshProfile, setIsLoading, setUser]);

  // Clear error function
  const clearError = () => {
    setError(null);
  };
  
  // Check role function
  const checkRole = (role: string) => {
    return userRoles.includes(role);
  };

  // Update user profile function
  const updateUserProfile = async (userData: Partial<AuthUser>): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      if (!user) {
        throw new Error("No user logged in");
      }
      
      // Update auth user metadata
      const { data, error } = await supabase.auth.updateUser({
        data: { ...userData }
      });
      
      if (error) throw error;
      
      // Update profile in profiles table if needed
      if (profile) {
        const profileUpdate = {
          ...(userData.username && { username: userData.username }),
          ...(userData.profileImageUrl && { avatar_url: userData.profileImageUrl }),
        };
        
        if (Object.keys(profileUpdate).length > 0) {
          const { error: profileError } = await supabase
            .from('profiles')
            .update(profileUpdate)
            .eq('id', user.id);
            
          if (profileError) throw profileError;
        }
      }
      
      // Refresh profile data
      await refreshProfile();
      
      return true;
    } catch (error: any) {
      setError(error.message || "Failed to update profile. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Fix return type for logout to match the interface
  const wrappedLogout = async (): Promise<void> => {
    const result = await logout();
    // Just use the result to trigger the auth state change, but return void
    return;
  };

  // Fix return type for updatePassword to match the interface
  const wrappedUpdatePassword = async (oldPassword: string, newPassword: string): Promise<boolean> => {
    const result = await updatePassword(oldPassword, newPassword);
    return result.success;
  };

  // Combine our hooks into one context value
  const authContextValue: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout: wrappedLogout,
    resetPassword,
    error,
    userRoles,
    updateUserProfile,
    clearError,
    profile,
    refreshProfile,
    checkRole,
    updatePassword: wrappedUpdatePassword
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
