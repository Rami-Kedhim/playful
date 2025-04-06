
import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContextValue, AuthUser, UserProfile } from '@/types/auth';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

// Create a context for authentication
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// Custom hook to use the auth context
export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

// Provider component to wrap the application and provide auth state
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userRoles, setUserRoles] = useState<string[]>(['user']);
  const [session, setSession] = useState<any | null>(null);

  // Function to fetch the user profile
  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error("Error fetching profile:", error);
        return null;
      }
      
      return data;
    } catch (error) {
      console.error("Error in fetchUserProfile:", error);
      return null;
    }
  };

  // Function to refresh the user profile
  const refreshProfile = async (): Promise<void> => {
    if (!user) return;
    
    try {
      const profileData = await fetchUserProfile(user.id);
      if (profileData) {
        setProfile(profileData);
      }
    } catch (error) {
      console.error("Error refreshing profile:", error);
    }
  };
  
  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      
      // Set up auth state change listener
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          console.log("Auth state changed:", event, session?.user?.id);
          
          setSession(session);
          
          if (session?.user) {
            const userData: AuthUser = {
              ...session.user,
              id: session.user.id,
              email: session.user.email || '',
              app_metadata: session.user.app_metadata || {},
              user_metadata: session.user.user_metadata || {},
              aud: session.user.aud || 'authenticated',
            };
            
            setUser(userData);
            
            // Fetch user profile
            setTimeout(async () => {
              const profileData = await fetchUserProfile(userData.id);
              setProfile(profileData);
              
              // Get user roles
              const { data: rolesData, error: rolesError } = await supabase
                .from('user_roles')
                .select('role')
                .eq('user_id', userData.id);
              
              if (!rolesError && rolesData?.length) {
                const roles = rolesData.map(item => item.role);
                setUserRoles(['user', ...roles]);
              } else {
                setUserRoles(['user']);
              }
              
              setIsLoading(false);
            }, 0);
          } else {
            setUser(null);
            setProfile(null);
            setUserRoles(['user']);
            setIsLoading(false);
          }
        }
      );
      
      // Check for existing session
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error("Error getting session:", error);
        setIsLoading(false);
        return;
      }
      
      if (!session) {
        setIsLoading(false);
        return;
      }

      // Return cleanup function
      return () => {
        subscription.unsubscribe();
      };
    };
    
    initAuth();
  }, []);
  
  // Clear error message
  const clearError = () => setError(null);
  
  // Login function
  const login = async (email: string, password: string): Promise<void> => {
    try {
      setIsLoading(true);
      clearError();
      
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        setError(error.message);
        toast({
          title: "Login failed",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
    } catch (error: any) {
      console.error("Login error:", error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Register function
  const register = async (email: string, password: string, username?: string): Promise<void> => {
    try {
      setIsLoading(true);
      clearError();
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: username || email.split('@')[0],
          },
        },
      });
      
      if (error) {
        setError(error.message);
        toast({
          title: "Registration failed",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      
      toast({
        title: "Registration successful",
        description: "Please check your email to confirm your account.",
      });
    } catch (error: any) {
      console.error("Registration error:", error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Logout function
  const logout = async (): Promise<void> => {
    try {
      setIsLoading(true);
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        setError(error.message);
        toast({
          title: "Logout failed",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
    } catch (error: any) {
      console.error("Logout error:", error.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Password reset function
  const resetPassword = async (email: string): Promise<void> => {
    try {
      setIsLoading(true);
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) {
        setError(error.message);
        toast({
          title: "Password reset failed",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      
      toast({
        title: "Password reset email sent",
        description: "Check your email for password reset instructions.",
      });
    } catch (error: any) {
      console.error("Password reset error:", error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Update password function
  const updatePassword = async (oldPassword: string, newPassword: string): Promise<void> => {
    try {
      setIsLoading(true);
      
      // In a real app, we would verify the old password first
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      
      if (error) {
        setError(error.message);
        toast({
          title: "Password update failed",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      
      toast({
        title: "Password updated",
        description: "Your password has been successfully updated.",
      });
    } catch (error: any) {
      console.error("Password update error:", error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Update user profile
  const updateUserProfile = async (userData: Partial<AuthUser>): Promise<void> => {
    try {
      if (!user) {
        throw new Error("No user logged in");
      }
      
      setIsLoading(true);
      
      // Update user metadata
      const { error } = await supabase.auth.updateUser({
        data: userData,
      });
      
      if (error) {
        setError(error.message);
        toast({
          title: "Profile update failed",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }
      
      // Also update the profile table
      await refreshProfile();
      
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error: any) {
      console.error("Profile update error:", error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Check if user has a specific role
  const checkRole = (role: string): boolean => {
    return userRoles.includes(role);
  };
  
  // Determine if user is authenticated
  const isAuthenticated = !!user && !!session;
  
  // Context value
  const contextValue: AuthContextValue = {
    user,
    profile,
    isLoading,
    isAuthenticated,
    userRoles,
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

export default useAuth;
