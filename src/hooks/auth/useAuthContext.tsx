import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';
import { toast } from '@/components/ui/use-toast';
import { UserProfile, AuthUser, AuthResult } from '@/types/auth';

type AuthContextType = {
  user: AuthUser | null;
  session: Session | null;
  profile: UserProfile | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signUp: (email: string, password: string, username?: string) => Promise<AuthResult>;
  signOut: () => Promise<void>;
  login: (email: string, password: string) => Promise<AuthResult>;
  register: (email: string, password: string, username?: string) => Promise<AuthResult>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  checkRole: (role: string) => boolean;
  userRoles: string[];
  refreshProfile: () => Promise<void>;
  updatePassword: (oldPassword: string, newPassword: string) => Promise<boolean>;
  updateUserProfile: (userData: Partial<AuthUser>) => Promise<boolean>;
  error: string | null;
  clearError: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper to convert Supabase User to our AuthUser type
const convertToAuthUser = (user: User | null): AuthUser | null => {
  if (!user) return null;
  
  return {
    id: user.id,
    email: user.email || '',
    username: user.user_metadata?.username,
    profileImageUrl: user.user_metadata?.avatar_url,
    lucoinsBalance: user.user_metadata?.lucoin_balance || 0,
    role: user.user_metadata?.role,
    avatarUrl: user.user_metadata?.avatar_url,
    app_metadata: user.app_metadata,
    user_metadata: user.user_metadata,
    aud: user.aud,
    created_at: user.created_at
  };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userRoles, setUserRoles] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Function to refresh the user profile data
  const refreshProfile = async () => {
    try {
      if (!user?.id) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      if (data) {
        setProfile(data);
      }
    } catch (error) {
      console.error('Error in refreshProfile:', error);
    }
  };

  // Function to check if user has a specific role
  const checkRole = (role: string): boolean => {
    if (!user) return false;
    
    // Check if role is in userRoles array
    if (userRoles.includes(role)) return true;
    
    // Check if role is in user metadata
    if (user.user_metadata?.role === role) return true;
    
    return false;
  };

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        // Only synchronous updates here
        setSession(session);
        setUser(session?.user ? convertToAuthUser(session.user) : null);
        
        if (session?.user) {
          // If user is logged in, fetch their roles
          try {
            const { data } = await supabase
              .from('user_roles')
              .select('role')
              .eq('user_id', session.user.id);
            
            if (data) {
              setUserRoles(data.map(item => item.role));
            }
          } catch (error) {
            console.error('Error fetching user roles:', error);
          }
          
          // Fetch user profile in a separate tick
          setTimeout(() => {
            refreshProfile();
          }, 0);
        }
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ? convertToAuthUser(session.user) : null);
      
      if (session?.user) {
        // If user is logged in, fetch their roles
        try {
          const { data } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', session.user.id);
          
          if (data) {
            setUserRoles(data.map(item => item.role));
          }
        } catch (error) {
          console.error('Error fetching user roles:', error);
        }
        
        // Fetch user profile
        await refreshProfile();
      }
      
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string): Promise<AuthResult> => {
    try {
      setError(null);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return { success: true };
    } catch (error: any) {
      setError(error.message);
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
      return { success: false, error: error.message };
    }
  };

  const login = signIn; // Alias for backward compatibility

  const signUp = async (email: string, password: string, username?: string): Promise<AuthResult> => {
    try {
      setError(null);
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
        description: "Please check your email to verify your account.",
      });
      
      return { success: true };
    } catch (error: any) {
      setError(error.message);
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive",
      });
      return { success: false, error: error.message };
    }
  };

  const register = signUp; // Alias for backward compatibility

  const signOut = async () => {
    try {
      setError(null);
      await supabase.auth.signOut();
      toast({
        title: "Logged out",
        description: "You have been logged out successfully.",
      });
    } catch (error: any) {
      setError(error.message);
      toast({
        title: "Error",
        description: "Failed to log out.",
        variant: "destructive",
      });
    }
  };

  const logout = signOut; // Alias for backward compatibility
  
  // Function to update password
  const updatePassword = async (oldPassword: string, newPassword: string): Promise<boolean> => {
    try {
      setError(null);
      // First verify old password is correct (if not empty, for password reset flow)
      if (oldPassword) {
        const { error } = await supabase.auth.signInWithPassword({
          email: user?.email || '',
          password: oldPassword,
        });
        
        if (error) {
          toast({
            title: "Error",
            description: "Current password is incorrect",
            variant: "destructive",
          });
          return false;
        }
      }
      
      // Update password
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      
      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
        return false;
      }
      
      toast({
        title: "Success",
        description: "Password has been updated successfully",
      });
      return true;
    } catch (error: any) {
      setError(error.message);
      toast({
        title: "Error",
        description: "Failed to update password",
        variant: "destructive",
      });
      return false;
    }
  };

  // Function to update user profile
  const updateUserProfile = async (userData: Partial<AuthUser>): Promise<boolean> => {
    try {
      setError(null);
      if (!user) return false;
      
      const { error } = await supabase.auth.updateUser({
        data: {
          ...user.user_metadata,
          ...userData
        }
      });
      
      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
        return false;
      }
      
      return true;
    } catch (error: any) {
      setError(error.message);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
      return false;
    }
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        isLoading,
        signIn,
        signUp,
        signOut,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        checkRole,
        userRoles,
        refreshProfile,
        updatePassword,
        updateUserProfile,
        error,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
