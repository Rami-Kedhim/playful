
import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthUser, AuthResult } from '@/types/auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

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
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [profile, setProfile] = useState<any>(null);
  const [userRoles, setUserRoles] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Initialize auth state
  useEffect(() => {
    // Check for existing session and setup auth listener
    const initAuth = async () => {
      try {
        setIsLoading(true);
        
        // Set up auth state change listener
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (event, currentSession) => {
            const currentUser = currentSession?.user || null;
            
            if (currentUser) {
              setUser({
                id: currentUser.id,
                email: currentUser.email || '',
                username: currentUser.user_metadata?.username || '',
                role: currentUser.user_metadata?.role || 'user',
                app_metadata: currentUser.app_metadata || {},
                user_metadata: currentUser.user_metadata || {},
                aud: currentUser.aud || 'authenticated',
              });
              setIsAuthenticated(true);
              
              // Fetch user profile if needed
              await refreshProfile();
            } else {
              setUser(null);
              setProfile(null);
              setIsAuthenticated(false);
            }
            
            setIsLoading(false);
          }
        );
        
        // Check for existing session
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            username: session.user.user_metadata?.username || '',
            role: session.user.user_metadata?.role || 'user',
            app_metadata: session.user.app_metadata || {},
            user_metadata: session.user.user_metadata || {},
            aud: session.user.aud || 'authenticated',
          });
          setIsAuthenticated(true);
          
          // Fetch user profile if needed
          await refreshProfile();
        }
        
        setIsLoading(false);
        
        // Cleanup subscription on unmount
        return () => {
          subscription.unsubscribe();
        };
      } catch (err: any) {
        console.error('Auth initialization error:', err);
        setIsLoading(false);
      }
    };
    
    initAuth();
  }, []);
  
  // Fetch user profile
  const refreshProfile = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
        
      if (error) throw error;
      
      if (data) {
        setProfile(data);
        // Set user roles based on profile data
        const roles = [
          'user',
          ...(data.role ? [data.role] : []),
          ...(data.roles || [])
        ];
        setUserRoles(roles);
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
    }
  };
  
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
      
      return { success: true };
    } catch (error: any) {
      setError(error.message);
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
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: username || email.split('@')[0],
            role: 'user'
          }
        }
      });
      
      if (error) throw error;
      
      return { success: true };
    } catch (error: any) {
      setError(error.message);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };
  
  // Logout function
  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error: any) {
      setError(error.message);
    }
  };
  
  // Clear error
  const clearError = () => {
    setError(null);
  };
  
  // Check if user has specific role
  const checkRole = (role: string) => {
    return userRoles.includes(role);
  };
  
  // Reset password
  const resetPassword = async (email: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) throw error;
      
      toast({
        title: "Password reset email sent",
        description: "Check your email for the password reset link",
      });
      
      return true;
    } catch (error: any) {
      setError(error.message);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Update password
  const updatePassword = async (password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase.auth.updateUser({
        password,
      });
      
      if (error) throw error;
      
      toast({
        title: "Password updated",
        description: "Your password has been updated successfully",
      });
      
      return true;
    } catch (error: any) {
      setError(error.message);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Auth context value
  const value = {
    user,
    isAuthenticated,
    isLoading,
    profile,
    userRoles,
    error,
    login,
    register,
    logout,
    clearError,
    refreshProfile,
    resetPassword,
    updatePassword,
    checkRole,
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default useAuth;
