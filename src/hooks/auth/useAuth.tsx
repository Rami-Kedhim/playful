
import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthUser, AuthContextType } from '@/types/authTypes';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { getUserRoles } from '@/utils/authStateUtils';

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  resetPassword: async () => {},
  error: null,
  userRoles: [],
  updateUserProfile: async () => {},
  clearError: () => {},
  profile: null,
  refreshProfile: async () => {},
  checkRole: () => false,
  updatePassword: async () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userRoles, setUserRoles] = useState<string[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [session, setSession] = useState<any>(null);

  // Initialize auth state
  useEffect(() => {
    // First set up listener for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        // Handle auth state changes
        setSession(currentSession);
        const currentUser = currentSession?.user || null;
        setUser(currentUser ? mapSupabaseUser(currentUser) : null);
        setIsAuthenticated(!!currentUser);
        setUserRoles(currentUser?.role ? [currentUser.role] : currentUser ? ['user'] : []);
        
        // Fetch profile after auth state changes - using setTimeout to avoid potential deadlock
        if (currentUser) {
          setTimeout(() => {
            fetchUserProfile(currentUser.id);
          }, 0);
        } else {
          setProfile(null);
        }

        if (event === 'SIGNED_OUT') {
          setUser(null);
          setIsAuthenticated(false);
          setUserRoles([]);
          setProfile(null);
        }
      }
    );

    // Then check for existing session
    const initializeAuth = async () => {
      try {
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        
        if (initialSession?.user) {
          const initialUser = mapSupabaseUser(initialSession.user);
          setUser(initialUser);
          setSession(initialSession);
          setIsAuthenticated(true);
          setUserRoles(initialUser.role ? [initialUser.role] : ['user']);
          await fetchUserProfile(initialSession.user.id);
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Clean up subscription on unmount
    return () => { subscription.unsubscribe(); };
  }, []);

  // Map Supabase user to application user model
  const mapSupabaseUser = (supabaseUser: any): AuthUser => {
    return {
      id: supabaseUser.id,
      email: supabaseUser.email || '',
      username: supabaseUser.user_metadata?.username || supabaseUser.email?.split('@')[0] || '',
      role: supabaseUser.user_metadata?.role || 'user',
      profileImageUrl: supabaseUser.user_metadata?.avatar_url,
      app_metadata: supabaseUser.app_metadata || {},
      user_metadata: supabaseUser.user_metadata || {},
      aud: supabaseUser.aud || 'authenticated',
      created_at: supabaseUser.created_at || new Date().toISOString(),
    };
  };

  // Fetch user profile from the profiles table
  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        return;
      }

      if (data) {
        setProfile(data);
      } else {
        // Create a profile if it doesn't exist
        const newProfile = {
          id: userId,
          username: user?.username || user?.email?.split('@')[0],
          avatar_url: user?.profileImageUrl,
        };
        
        const { error: insertError } = await supabase
          .from('profiles')
          .insert([newProfile]);
          
        if (insertError) {
          console.error("Error creating profile:", insertError);
        } else {
          setProfile(newProfile);
        }
      }
    } catch (err) {
      console.error("Profile fetch error:", err);
    }
  };

  // Login function
  const login = async (email: string, password: string) => {
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
  const register = async (email: string, password: string, username?: string) => {
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
  
  // Reset password function
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
        description: "Please check your email for the password reset link.",
      });
      return true;
    } catch (error: any) {
      setError(error.message || "Failed to send password reset email. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Update password function
  const updatePassword = async (oldPassword: string, newPassword: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In password reset flow, oldPassword is not needed
      const { error } = await supabase.auth.updateUser({ 
        password: newPassword 
      });
      
      if (error) throw error;
      
      toast({
        title: "Password updated successfully",
        description: "Your password has been updated.",
      });
      return true;
    } catch (error: any) {
      setError(error.message || "Failed to update password. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Update user profile function
  const updateUserProfile = async (userData: Partial<AuthUser>) => {
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
      
      if (data.user) {
        const updatedUser = mapSupabaseUser(data.user);
        setUser(updatedUser);
        
        // Update roles if role changed
        if (userData.role && userData.role !== user.role) {
          setUserRoles([userData.role]);
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
  
  // Refresh profile function
  const refreshProfile = async () => {
    if (!user) return;
    await fetchUserProfile(user.id);
  };
  
  // Check role function
  const checkRole = (role: string) => {
    return userRoles.includes(role);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isLoading,
      login,
      register,
      logout,
      resetPassword,
      error,
      userRoles,
      updateUserProfile,
      clearError,
      profile,
      refreshProfile,
      checkRole,
      updatePassword
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default useAuth;
