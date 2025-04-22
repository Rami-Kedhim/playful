
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AuthContextType, User, UserProfile, AuthResult } from '@/types/auth';
import { toast } from 'sonner';

// Create context with a default value
const AuthContext = createContext<AuthContextType | null>(null);

// Export the useAuth hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState<boolean>(false);

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Set up auth state listener first
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (event, session) => {
            setUser(session?.user || null);
            setIsAuthenticated(!!session?.user);
            
            if (session?.user) {
              // Defer profile loading
              setTimeout(() => {
                loadUserProfile();
              }, 0);
            } else {
              setProfile(null);
            }
          }
        );

        // Then check for existing session
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user || null);
        setIsAuthenticated(!!session?.user);
        
        if (session?.user) {
          await loadUserProfile();
        }

        setInitialized(true);
        setIsLoading(false);

        return () => subscription.unsubscribe();
      } catch (error) {
        console.error("Auth initialization error:", error);
        setError("Failed to initialize authentication");
        setIsLoading(false);
        setInitialized(true);
      }
    };

    initAuth();
  }, []);

  // Load user profile
  const loadUserProfile = async (): Promise<User | null> => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      if (data) {
        setProfile(data as UserProfile);
      }

      return user;
    } catch (error) {
      console.error("Error loading user profile:", error);
      return user;
    }
  };

  // Refresh profile data
  const refreshProfile = async (): Promise<void> => {
    await loadUserProfile();
  };

  // Handle login
  const login = async (email: string, password: string, options?: any): Promise<AuthResult> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      });
      
      if (error) throw error;
      
      return { success: true, user: data.user as User, session: data.session };
    } catch (error: any) {
      const errorMessage = error.message || "Failed to login";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Handle registration
  const register = async (email: string, password: string, username?: string, options?: any): Promise<AuthResult> => {
    setIsLoading(true);
    setError(null);
    
    try {
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
      
      toast("Registration successful!");
      
      return { success: true, user: data.user as User, session: data.session };
    } catch (error: any) {
      const errorMessage = error.message || "Registration failed";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  // Handle logout
  const logout = async (): Promise<void> => {
    setIsLoading(true);
    
    try {
      await supabase.auth.signOut();
      setUser(null);
      setProfile(null);
      setIsAuthenticated(false);
    } catch (error: any) {
      console.error("Logout error:", error);
      setError("Failed to log out");
    } finally {
      setIsLoading(false);
    }
  };

  // Update user data
  const updateUser = async (data: Partial<User>): Promise<boolean> => {
    try {
      const { error } = await supabase.auth.updateUser(data);
      
      if (error) throw error;
      
      if (user) {
        setUser({ ...user, ...data });
      }
      
      return true;
    } catch (error) {
      console.error("Error updating user:", error);
      return false;
    }
  };

  // Update user profile data
  const updateUserProfile = async (data: Partial<UserProfile>): Promise<boolean> => {
    if (!user) return false;
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', user.id);
      
      if (error) throw error;
      
      if (profile) {
        setProfile({ ...profile, ...data });
      }
      
      return true;
    } catch (error) {
      console.error("Error updating profile:", error);
      return false;
    }
  };

  // Password reset request
  const requestPasswordReset = async (email: string): Promise<AuthResult> => {
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      
      if (error) throw error;
      
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Send password reset email (alias for consistency)
  const sendPasswordResetEmail = async (email: string): Promise<AuthResult> => {
    return requestPasswordReset(email);
  };

  // Reset password with token
  const resetPassword = async (token: string, password: string): Promise<AuthResult> => {
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.updateUser({ 
        password 
      });
      
      if (error) throw error;
      
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Verify email
  const verifyEmail = async (token: string): Promise<AuthResult> => {
    setIsLoading(true);
    
    try {
      // This is a placeholder as Supabase handles email verification automatically
      // For custom verification, you would implement token validation here
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Check if user has a role
  const checkRole = (role: string): boolean => {
    if (!profile) return false;
    
    // Check if user has the role in their roles array
    if (Array.isArray(profile.roles)) {
      return profile.roles.some(r => 
        (typeof r === 'string' && r === role) || 
        (typeof r === 'object' && 'name' in r && r.name === role)
      );
    }
    
    // If profile.role is a string, direct comparison
    if (typeof profile.role === 'string') {
      return profile.role === role;
    }
    
    return false;
  };

  // Define the context value
  const value: AuthContextType = {
    user,
    profile,
    isAuthenticated,
    isLoading,
    error,
    initialized,
    login,
    logout,
    register,
    updateUser,
    updateUserProfile,
    loadUserProfile,
    refreshProfile,
    sendPasswordResetEmail,
    resetPassword,
    requestPasswordReset,
    verifyEmail,
    checkRole
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
