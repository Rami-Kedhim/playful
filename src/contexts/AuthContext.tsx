
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { AuthContextType, AuthResult, UserProfile } from '@/types/auth';

export interface AuthContextProps {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  loading: boolean;
  error: string | null;
  signIn: (credentials: { email: string; password: string }) => Promise<void>;
  signUp: (credentials: { email: string; password: string; username?: string; full_name?: string }) => Promise<void>;
  signOut: () => Promise<void>;
  sendPasswordResetEmail: (email: string) => Promise<void>;
  confirmPasswordReset: (token: string, newPassword: string) => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
  checkRole: (role: string) => boolean;
  login: (email: string, password: string) => Promise<AuthResult>;
  logout: () => Promise<void>;
  register: (email: string, password: string, username?: string) => Promise<AuthResult>;
  updateUserProfile: (data: Partial<UserProfile>) => Promise<boolean>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsAuthenticated(!!session?.user);
        
        // Fetch profile data when session changes
        if (session?.user) {
          fetchProfile(session.user.id);
        } else {
          setProfile(null);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsAuthenticated(!!session?.user);
      
      if (session?.user) {
        fetchProfile(session.user.id);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
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

  const signIn = async ({ email, password }: { email: string; password: string }) => {
    try {
      setError(null);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        setError(error.message);
        throw error;
      }
    } catch (error: any) {
      setError(error.message);
      throw error;
    }
  };

  const signUp = async ({ email, password, username, full_name }: { email: string; password: string; username?: string; full_name?: string }) => {
    try {
      setError(null);
      const { error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            username,
            full_name
          }
        }
      });
      
      if (error) {
        setError(error.message);
        throw error;
      }
    } catch (error: any) {
      setError(error.message);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      setError(null);
      await supabase.auth.signOut();
    } catch (error: any) {
      setError(error.message);
      throw error;
    }
  };
  
  const sendPasswordResetEmail = async (email: string) => {
    try {
      setError(null);
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) {
        setError(error.message);
        throw error;
      }
    } catch (error: any) {
      setError(error.message);
      throw error;
    }
  };
  
  const confirmPasswordReset = async (token: string, newPassword: string) => {
    try {
      setError(null);
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      
      if (error) {
        setError(error.message);
        throw error;
      }
    } catch (error: any) {
      setError(error.message);
      throw error;
    }
  };
  
  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user) return;
    
    try {
      setError(null);
      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', user.id);
        
      if (error) {
        setError(error.message);
        throw error;
      }
      
      // Update local profile state
      setProfile(prev => prev ? { ...prev, ...data } : null);
    } catch (error: any) {
      setError(error.message);
      throw error;
    }
  };

  // Alias methods for compatibility with different component usages
  const login = async (email: string, password: string): Promise<AuthResult> => {
    try {
      await signIn({ email, password });
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const logout = signOut;

  const register = async (email: string, password: string, username?: string): Promise<AuthResult> => {
    try {
      await signUp({ email, password, username });
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const updateUserProfile = async (data: Partial<UserProfile>): Promise<boolean> => {
    try {
      await updateProfile(data);
      return true;
    } catch (error) {
      return false;
    }
  };

  const refreshProfile = async (): Promise<void> => {
    if (user) {
      await fetchProfile(user.id);
    }
  };

  // Role checking function
  const checkRole = (role: string): boolean => {
    if (!profile) return false;
    
    const roles = profile.roles || [];
    return roles.some(r => {
      if (typeof r === 'string') return r === role;
      return r?.name === role;
    });
  };

  const value = {
    user,
    profile,
    session,
    loading,
    error,
    isLoading: loading,
    isAuthenticated,
    checkRole,
    signIn,
    signUp,
    signOut,
    login,
    logout,
    register,
    sendPasswordResetEmail,
    confirmPasswordReset,
    updateProfile,
    updateUserProfile,
    refreshProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
