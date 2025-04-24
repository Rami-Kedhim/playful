
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Session, User } from '@supabase/supabase-js';
import { AuthContextType, AuthResult, AuthUser } from '@/types/authTypes';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
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

  const login = async (email: string, password: string): Promise<AuthResult> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

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

  const register = async (email: string, password: string): Promise<AuthResult> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

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

  const logout = async (): Promise<boolean> => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error logging out:', error);
      return false;
    }
  };

  const value: AuthContextType = {
    user,
    profile: null, // Profile will be implemented later if needed
    loading,
    isLoading: loading,
    error,
    isAuthenticated: !!user,
    initialized,
    login,
    logout,
    signIn: login,
    signOut: logout,
    register,
    updateUser: async () => false,
    updateUserProfile: async () => false,
    updateProfile: async () => false,
    loadUserProfile: async () => null,
    refreshProfile: async () => {},
    sendPasswordResetEmail: async () => false,
    resetPassword: async () => false,
    requestPasswordReset: async () => false,
    verifyEmail: async () => false,
    updatePassword: async () => false,
    deleteAccount: async () => false,
    checkRole: () => false
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
