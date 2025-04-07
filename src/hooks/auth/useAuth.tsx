
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AuthContextValue, AuthUser } from '@/types/auth';
import { useAuthState } from './useAuthState';
import { useAuthentication } from './useAuthentication';
import { useRole } from './useRole';

// Create auth context
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// Hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}

// Provider component for auth context
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  // Get core auth state functionality
  const { 
    authState, 
    setIsLoading, 
    setUser, 
    setProfile, 
    refreshProfile 
  } = useAuthState();
  
  // Error state
  const [error, setError] = useState<string | null>(null);
  
  // Get authentication methods with dependencies injected
  const { 
    signUp, 
    signIn, 
    signOut,
    resetPassword,
    updatePassword,
    updateProfile
  } = useAuthentication(setIsLoading, refreshProfile);
  
  // Role checking utility
  const { checkRole } = useRole();
  
  // Computed auth state
  const isAuthenticated = !!authState.user;
  
  // Clear error helper
  const clearError = () => setError(null);
  
  // Auth methods with error handling
  const login = async (email: string, password: string) => {
    clearError();
    setIsLoading(true);
    
    try {
      const { data, error } = await signIn(email, password);
      
      if (error) {
        setError(error.message);
        return { success: false, error: error.message };
      }
      
      return { success: true };
    } catch (err: any) {
      const errorMessage = err.message || 'An error occurred during login';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };
  
  const register = async (email: string, password: string, username?: string) => {
    clearError();
    setIsLoading(true);
    
    try {
      const { data, error } = await signUp(email, password, username);
      
      if (error) {
        setError(error.message);
        return { success: false, error: error.message };
      }
      
      return { success: true };
    } catch (err: any) {
      const errorMessage = err.message || 'An error occurred during registration';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = async () => {
    clearError();
    setIsLoading(true);
    
    try {
      await signOut();
      setUser(null);
    } catch (err: any) {
      const errorMessage = err.message || 'An error occurred during logout';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  
  const updateUserProfile = async (userData: Partial<AuthUser>) => {
    clearError();
    setIsLoading(true);
    
    try {
      if (!authState.user?.id) {
        setError('User not authenticated');
        return false;
      }
      
      await updateProfile(authState.user.id, userData);
      await refreshProfile();
      return true;
    } catch (err: any) {
      const errorMessage = err.message || 'An error occurred updating profile';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Setup auth state change listener
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setIsLoading(true);
        
        if (session?.user) {
          const user: AuthUser = {
            id: session.user.id,
            email: session.user.email || '',
            username: session.user.user_metadata?.username || session.user.email?.split('@')[0] || '',
            profileImageUrl: session.user.user_metadata?.avatar_url,
            role: session.user.user_metadata?.role || 'user',
            app_metadata: session.user.app_metadata || {},
            user_metadata: session.user.user_metadata || {},
            aud: session.user.aud || 'authenticated',
            created_at: session.user.created_at || new Date().toISOString(),
          };
          
          setUser(user);
          
          // Load profile data in a separate tick to prevent deadlocks
          setTimeout(() => {
            refreshProfile();
          }, 0);
        } else {
          setUser(null);
        }
        
        setIsLoading(false);
      }
    );
    
    // Initial session check
    const checkSession = async () => {
      setIsLoading(true);
      
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (data.session?.user && !error) {
          const user: AuthUser = {
            id: data.session.user.id,
            email: data.session.user.email || '',
            username: data.session.user.user_metadata?.username || data.session.user.email?.split('@')[0] || '',
            profileImageUrl: data.session.user.user_metadata?.avatar_url,
            role: data.session.user.user_metadata?.role || 'user',
            app_metadata: data.session.user.app_metadata || {},
            user_metadata: data.session.user.user_metadata || {},
            aud: data.session.user.aud || 'authenticated',
            created_at: data.session.user.created_at || new Date().toISOString(),
          };
          
          setUser(user);
          await refreshProfile();
        }
      } catch (err) {
        console.error('Session check error:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkSession();
    
    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  // Assemble context value
  const contextValue: AuthContextValue = {
    ...authState,
    isAuthenticated,
    login,
    register,
    logout,
    resetPassword,
    updatePassword,
    updateUserProfile,
    error,
    clearError,
    refreshProfile,
    checkRole
  };
  
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
