import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { UserProfile } from '@/types/auth';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  userRoles: string[];
  checkRole: (role: string) => boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean, error?: string }>;
  signUp: (email: string, password: string, username?: string) => Promise<{ success: boolean, error?: string }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (newPassword: string) => Promise<void>;
  refreshProfile: () => Promise<void>;
  updateUser: (userData: Partial<User['user_metadata']>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userRoles, setUserRoles] = useState<string[]>([]);

  // Initialize the auth state
  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        setSession(newSession);
        setUser(newSession?.user ?? null);
        
        // Update user roles based on metadata
        if (newSession?.user) {
          const roles = newSession.user.app_metadata?.roles || [];
          setUserRoles(Array.isArray(roles) ? roles : [roles].filter(Boolean));
          
          // Safely fetch profile with setTimeout to avoid Supabase deadlock
          setTimeout(() => {
            fetchProfile(newSession.user.id);
          }, 0);
        } else {
          setProfile(null);
          setUserRoles([]);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      // Update user roles based on metadata
      if (currentSession?.user) {
        const roles = currentSession.user.app_metadata?.roles || [];
        setUserRoles(Array.isArray(roles) ? roles : [roles].filter(Boolean));
        fetchProfile(currentSession.user.id);
      }
      
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      setProfile(data as UserProfile);
    } catch (error) {
      console.error('Error in fetchProfile:', error);
    }
  };

  // Function to check if user has a specific role
  const checkRole = (role: string): boolean => {
    return userRoles.includes(role);
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id);
    }
  };

  const signIn = async (email: string, password: string) => {
    setError(null);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        setError(error.message);
        return { success: false, error: error.message };
      }
      
      // Success - auth state listener will update user
      return { success: true };
    } catch (err: any) {
      const errorMessage = err.message || 'An unexpected error occurred during sign in';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const signUp = async (email: string, password: string, username?: string) => {
    setError(null);
    try {
      const { data, error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            username: username || email.split('@')[0],
            full_name: '',
          }
        }
      });
      
      if (error) {
        setError(error.message);
        return { success: false, error: error.message };
      }

      toast({
        title: "Success!",
        description: "Account created. Please check your email for verification.",
      });
      return { success: true };
    } catch (err: any) {
      const errorMessage = err.message || 'An unexpected error occurred during sign up';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      // Auth state listener will handle state updates
    } catch (err: any) {
      setError(err.message || 'Error during sign out');
      toast({
        title: "Error",
        description: err.message || 'Error during sign out',
        variant: "destructive",
      });
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) throw error;
      
      toast({
        title: "Password reset email sent",
        description: "Check your email for the password reset link",
      });
    } catch (err: any) {
      setError(err.message || 'Error sending reset password email');
      toast({
        title: "Error",
        description: err.message || 'Error sending reset password email',
        variant: "destructive",
      });
    }
  };

  const updatePassword = async (newPassword: string) => {
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      
      if (error) throw error;
      
      toast({
        title: "Password updated",
        description: "Your password has been updated successfully",
      });
    } catch (err: any) {
      setError(err.message || 'Error updating password');
      toast({
        title: "Error",
        description: err.message || 'Error updating password',
        variant: "destructive",
      });
    }
  };

  const updateUser = async (userData: Partial<User['user_metadata']>) => {
    try {
      const { error } = await supabase.auth.updateUser({
        data: userData
      });
      
      if (error) throw error;
      
      // Refresh the profile to get updated data
      refreshProfile();
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      });
    } catch (err: any) {
      setError(err.message || 'Error updating user data');
      toast({
        title: "Error",
        description: err.message || 'Error updating user data',
        variant: "destructive",
      });
    }
  };

  const value = {
    user,
    session,
    profile,
    isLoading,
    isAuthenticated: !!user,
    error,
    userRoles,
    checkRole,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updatePassword,
    refreshProfile,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default useAuth;
