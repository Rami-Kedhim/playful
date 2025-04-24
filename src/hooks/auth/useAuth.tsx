import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AuthContextType, AuthUser, AuthResult } from '@/types/authTypes';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [session, setSession] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [initialized, setInitialized] = useState<boolean>(false);

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

    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ? mapSupabaseUserToUser(session.user) : null);
      setIsAuthenticated(!!session?.user);
      if (session?.user) {
        fetchProfile(session.user.id);
      }
      setLoading(false);
      setInitialized(true);
    });

    return () => subscription.unsubscribe();
  }, []);

  const mapSupabaseUserToUser = (supabaseUser: any): AuthUser => {
    return {
      id: supabaseUser.id,
      email: supabaseUser.email || '',
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
      created_at: supabaseUser.created_at
    };
  };

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error: any) {
      console.error('Error fetching profile:', error);
    }
  };

  const login = async (email: string, password: string): Promise<AuthResult> => {
    setError(null);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      return {
        success: true,
        user: data.user ? mapSupabaseUserToUser(data.user) : null,
        session: data.session
      };
    } catch (error: any) {
      setError(error.message);
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
    } catch (error: any) {
      setError(error.message);
      return false;
    }
  };

  const register = async (email: string, password: string, username?: string): Promise<AuthResult> => {
    setError(null);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: username || email.split('@')[0],
            full_name: username
          }
        }
      });

      if (error) throw error;

      return {
        success: true,
        user: data.user ? mapSupabaseUserToUser(data.user) : null,
        session: data.session
      };
    } catch (error: any) {
      setError(error.message);
      return {
        success: false,
        error: error.message
      };
    }
  };

  const updateUser = async (userData: Partial<AuthUser>): Promise<boolean> => {
    try {
      const { error } = await supabase.auth.updateUser({
        data: userData
      });

      if (error) throw error;
      
      // Update local state
      if (user) {
        setUser({ ...user, ...userData });
      }
      
      return true;
    } catch (error: any) {
      setError(error.message);
      return false;
    }
  };

  const updateUserProfile = async (profileData: any): Promise<boolean> => {
    if (!user) return false;
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update(profileData)
        .eq('id', user.id);

      if (error) throw error;
      
      // Update local state
      setProfile(prev => prev ? { ...prev, ...profileData } : null);
      
      return true;
    } catch (error: any) {
      setError(error.message);
      return false;
    }
  };

  const updateProfile = updateUserProfile;

  const loadUserProfile = async (): Promise<any> => {
    if (!user) return null;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      
      setProfile(data);
      return data;
    } catch (error: any) {
      setError(error.message);
      return null;
    }
  };

  const refreshProfile = async (): Promise<void> => {
    if (user) {
      await loadUserProfile();
    }
  };

  const sendPasswordResetEmail = async (email: string): Promise<boolean> => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      return true;
    } catch (error: any) {
      setError(error.message);
      return false;
    }
  };

  const resetPassword = sendPasswordResetEmail;
  const requestPasswordReset = sendPasswordResetEmail;

  const verifyEmail = async (token: string): Promise<boolean> => {
    try {
      // This is a placeholder as Supabase handles email verification automatically
      return true;
    } catch (error: any) {
      setError(error.message);
      return false;
    }
  };

  const updatePassword = async (oldPassword: string, newPassword: string): Promise<boolean> => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      
      if (error) throw error;
      return true;
    } catch (error: any) {
      setError(error.message);
      return false;
    }
  };

  const deleteAccount = async (): Promise<boolean> => {
    if (!user) return false;
    
    try {
      // First delete profile data
      const { error: profileError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', user.id);
        
      if (profileError) throw profileError;
      
      // Then delete auth user (requires admin privileges or custom function)
      // This is a placeholder - you'll need to implement a server function for this
      
      await logout();
      return true;
    } catch (error: any) {
      setError(error.message);
      return false;
    }
  };

  const checkRole = (role: string): boolean => {
    if (!user) return false;
    
    // Check if user has the specified role
    if (user.role === role) return true;
    
    // Check in roles array if it exists
    if (user.roles) {
      return user.roles.some(r => {
        if (typeof r === 'string') return r === role;
        return r?.name === role;
      });
    }
    
    return false;
  };

  const value: AuthContextType = {
    user,
    profile,
    loading,
    error,
    isLoading: loading,
    isAuthenticated,
    initialized,
    login,
    logout,
    signIn: login,
    signOut: logout,
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
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default useAuth;
