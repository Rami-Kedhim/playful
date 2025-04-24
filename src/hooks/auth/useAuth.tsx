import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User as SupabaseUser } from '@supabase/supabase-js';
import { AuthResult } from '@/types/authTypes';

interface AuthContextProps {
  user: any | null;
  profile: any | null;
  session: Session | null;
  loading: boolean;
  error: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  checkRole: (role: string) => boolean;
  signIn: (args: { email: string; password: string }) => Promise<void>;
  signUp: (args: { email: string; password: string; username?: string; full_name?: string }) => Promise<void>;
  signOut: () => Promise<void>;
  login: (email: string, password: string) => Promise<AuthResult>;
  logout: () => Promise<void>;
  register: (email: string, password: string, username?: string) => Promise<AuthResult>;
  sendPasswordResetEmail: (email: string) => Promise<AuthResult>;
  confirmPasswordReset: (token: string, newPassword: string) => Promise<AuthResult>;
  updateProfile: (data: Partial<any>) => Promise<boolean>;
  updateUserProfile: (data: Partial<any>) => Promise<boolean>;
  refreshProfile: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ? mapSupabaseUserToUser(session.user) : null);
        setIsAuthenticated(!!session?.user);
        if (session?.user) {
          setTimeout(() => {
            fetchProfile(session.user.id);
          }, 0);
        } else {
          setProfile(null);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ? mapSupabaseUserToUser(session.user) : null);
      setIsAuthenticated(!!session?.user);

      if (session?.user) {
        fetchProfile(session.user.id);
      }

      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const mapSupabaseUserToUser = (supabaseUser: SupabaseUser): any => {
    return {
      id: supabaseUser.id,
      email: supabaseUser.email ?? '',
      username: supabaseUser.user_metadata?.username,
      name: supabaseUser.user_metadata?.full_name || supabaseUser.user_metadata?.name || '',
      role: supabaseUser.user_metadata?.role,
      isVerified: supabaseUser.user_metadata?.isVerified,
      profileImageUrl: supabaseUser.user_metadata?.profileImageUrl ?? supabaseUser.user_metadata?.avatar_url,
      avatarUrl: supabaseUser.user_metadata?.avatarUrl,
      phone: supabaseUser.phone,
      website: supabaseUser.user_metadata?.website,
      user_metadata: supabaseUser.user_metadata || {},
      roles: supabaseUser.user_metadata?.roles || [],
      ubxBalance: supabaseUser.user_metadata?.ubxBalance,
      bio: supabaseUser.user_metadata?.bio,
      createdAt: supabaseUser.created_at
    };
  };

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

      setProfile(data as any);
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
            full_name,
          },
        },
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

  const sendPasswordResetEmail = async (email: string): Promise<AuthResult> => {
    try {
      setError(null);
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) {
        setError(error.message);
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch (error: any) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  const confirmPasswordReset = async (token: string, newPassword: string): Promise<AuthResult> => {
    try {
      setError(null);
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) {
        setError(error.message);
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch (error: any) {
      setError(error.message);
      return { success: false, error: error.message };
    }
  };

  const updateProfile = async (data: Partial<any>) => {
    if (!user) return false;

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

      setProfile(prev => prev ? { ...prev, ...data } : null);
      return true;
    } catch (error: any) {
      setError(error.message);
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<AuthResult> => {
    try {
      await signIn({ email, password });
      return { success: true, user };
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

  const updateUserProfile = async (data: Partial<any>): Promise<boolean> => {
    return await updateProfile(data);
  };

  const refreshProfile = async (): Promise<void> => {
    if (user) {
      await fetchProfile(user.id);
    }
  };

  const checkRole = (role: string): boolean => {
    if (!profile) return false;

    const roles = profile.roles || [];
    return roles.some(r => {
      if (typeof r === 'string') return r === role;
      return r?.name === role;
    });
  };

  const value: AuthContextProps = {
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
    logout: signOut,
    register,
    sendPasswordResetEmail,
    confirmPasswordReset,
    updateProfile,
    updateUserProfile,
    refreshProfile,
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
