
import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthUser, AuthResult } from '@/types/auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { useAuthState } from './useAuthState';
import { usePasswordManagement } from './usePasswordManagement';
import { useAuthActions } from './useAuthActions';

// Create auth context
const AuthContext = createContext<any>(null);

// Use auth hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Use our custom hooks
  const [
    { user, profile, isLoading, userRoles },
    setIsLoading,
    refreshProfile
  ] = useAuthState();
  
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [session, setSession] = useState<any>(null);

  // Password management
  const { resetPassword: resetPwd, updatePassword: updatePwd } = usePasswordManagement();

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
          setProfile(null);
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
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<AuthResult> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      });
      
      if (error) throw error;
      
      // Auth state listener will handle setting user, session, etc.
      return { success: true };
    } catch (error: any) {
      setError(error.message || "Failed to login. Please check your credentials.");
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (email: string, password: string, username?: string): Promise<AuthResult> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Register with Supabase
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

      toast({
        title: "Registration successful",
        description: "Your account has been created successfully.",
      });
      
      // Auth state listener will handle the rest
      return { success: true };
    } catch (error: any) {
      setError(error.message || "Registration failed. Please try again.");
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      // Auth state listener will handle clearing user state
      toast({
        title: "Logged out successfully",
        description: "You have been logged out successfully.",
      });
    } catch (error: any) {
      setError(error.message || "Failed to logout. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
      
      return true;
    } catch (error: any) {
      setError(error.message || "Failed to update profile. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Clear error function
  const clearError = () => {
    setError(null);
  };
  
  // Check role function
  const checkRole = (role: string) => {
    return userRoles.includes(role);
  };

  // Combine our hooks into one context value
  const authContextValue = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    resetPassword: resetPwd,
    error,
    userRoles,
    updateUserProfile,
    clearError,
    profile,
    refreshProfile,
    checkRole,
    updatePassword: updatePwd
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default useAuth;
