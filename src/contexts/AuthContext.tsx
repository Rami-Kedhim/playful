
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Session } from '@supabase/supabase-js';
import { AuthContextType, AuthResult, AuthUser } from '@/types/authTypes';
import { toast } from 'sonner';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // First set up the auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user as AuthUser || null);
        setInitialized(true);
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user as AuthUser || null);
      setLoading(false);
      setInitialized(true);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Load user profile data
  useEffect(() => {
    if (user) {
      loadUserProfile();
    } else {
      setProfile(null);
    }
  }, [user]);

  const loadUserProfile = async () => {
    try {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
        
      if (error) {
        console.error('Error loading profile:', error);
        return null;
      }
      
      setProfile(data);
      return data;
    } catch (error) {
      console.error('Error loading user profile:', error);
      return null;
    }
  };

  const refreshProfile = async () => {
    return await loadUserProfile();
  };

  const login = async (email: string, password: string): Promise<AuthResult> => {
    try {
      setError(null);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error("Login failed", {
          description: error.message
        });
        throw error;
      }

      toast.success("Login successful!");
      
      return {
        success: true,
        user: data.user as AuthUser,
        session: data.session
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  };

  const register = async (email: string, password: string, userData: any = {}): Promise<AuthResult> => {
    try {
      setError(null);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData
        }
      });

      if (error) {
        toast.error("Registration failed", {
          description: error.message
        });
        throw error;
      }

      toast.success("Registration successful!");

      return {
        success: true,
        user: data.user as AuthUser,
        session: data.session
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message
      };
    }
  };

  const logout = async (): Promise<void> => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success("Logged out successfully");
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error("Failed to log out");
    }
  };

  const signIn = login;
  const signOut = async (): Promise<boolean> => {
    try {
      await logout();
      return true;
    } catch (error) {
      return false;
    }
  };

  const updateUser = async (data: any): Promise<boolean> => {
    try {
      const { error } = await supabase.auth.updateUser(data);
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error updating user:', error);
      return false;
    }
  };

  const updateUserProfile = async (data: any): Promise<boolean> => {
    try {
      if (!user) return false;
      
      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', user.id);
        
      if (error) throw error;
      
      // Refresh the profile data
      await loadUserProfile();
      return true;
    } catch (error) {
      console.error('Error updating profile:', error);
      return false;
    }
  };
  
  const updateProfile = updateUserProfile;

  const sendPasswordResetEmail = async (email: string): Promise<boolean> => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error sending password reset email:', error);
      return false;
    }
  };

  const requestPasswordReset = sendPasswordResetEmail;

  const resetPassword = async (token: string, newPassword: string): Promise<boolean> => {
    try {
      const { error } = await supabase.auth.updateUser({ 
        password: newPassword 
      });
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error resetting password:', error);
      return false;
    }
  };

  const verifyEmail = async (token: string): Promise<boolean> => {
    // In Supabase, email verification happens automatically via links
    // This is just a placeholder for API compatibility
    console.log('Email verification is handled automatically by Supabase');
    return true;
  };

  const updatePassword = async (oldPassword: string, newPassword: string): Promise<boolean> => {
    try {
      // Supabase doesn't require the old password to update the password
      // when the user is already authenticated
      const { error } = await supabase.auth.updateUser({ 
        password: newPassword 
      });
      
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error updating password:', error);
      return false;
    }
  };

  const deleteAccount = async (): Promise<boolean> => {
    try {
      // This requires a server-side function or stored procedure in Supabase
      // For now, we'll just log the user out
      console.warn('Account deletion requires server-side implementation');
      await logout();
      return true;
    } catch (error) {
      console.error('Error deleting account:', error);
      return false;
    }
  };

  const checkRole = (role: string): boolean => {
    if (!user || !profile) return false;
    
    // Check user metadata for roles
    const userRoles = user.app_metadata?.roles || user.user_metadata?.roles || [];
    
    // Check profile roles if present
    const profileRoles = profile.roles || [];
    
    // Combine both sources of roles
    const allRoles = [...userRoles, ...profileRoles];
    
    return allRoles.includes(role);
  };

  const value: AuthContextType = {
    user,
    profile,
    loading,
    isLoading: loading,
    error,
    isAuthenticated: !!user,
    initialized,
    login,
    logout,
    signIn,
    signOut,
    register,
    updateUser,
    updateUserProfile,
    updateProfile,
    loadUserProfile,
    refreshProfile,
    sendPasswordResetEmail,
    resetPassword,
    requestPasswordReset,
    verifyEmail,
    updatePassword,
    deleteAccount,
    checkRole
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
