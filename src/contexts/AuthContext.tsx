import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User as SupabaseUser } from '@supabase/supabase-js';
import { AuthContextProps, AuthResult, User, UserProfile } from '@/types/auth';

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
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

    // THEN check for existing session
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

  // Helper to map SupabaseUser to our User type
  const mapSupabaseUserToUser = (supabaseUser: SupabaseUser): User => {
    return {
      id: supabaseUser.id,
      email: supabaseUser.email ?? '',
      username: supabaseUser.user_metadata?.username,
      name: supabaseUser.user_metadata?.full_name || supabaseUser.name,
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

      // Update local profile state
      setProfile(prev => prev ? { ...prev, ...data } : null);
      return true;
    } catch (error: any) {
      setError(error.message);
      return false;
    }
  };

  /**
   * Alias methods for compatibility with different component usages
   */
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
    return await updateProfile(data);
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
    logout,
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
