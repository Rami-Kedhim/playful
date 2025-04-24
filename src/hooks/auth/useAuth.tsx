
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthUser, AuthResult, AuthContextType } from '@/types/authTypes';
import { supabase } from '@/integrations/supabase/client';

// Create the auth context
export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ? mapSupabaseUserToUser(session.user) : null);
        
        // If session exists, fetch profile
        if (session?.user) {
          setTimeout(() => {
            fetchProfile(session.user.id);
          }, 0);
        } else {
          setProfile(null);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ? mapSupabaseUserToUser(session.user) : null);
      
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
      email: supabaseUser.email ?? '',
      username: supabaseUser.user_metadata?.username,
      name: supabaseUser.user_metadata?.full_name || supabaseUser.user_metadata?.name || '',
      role: supabaseUser.user_metadata?.role,
      roles: supabaseUser.user_metadata?.roles || [],
      user_metadata: supabaseUser.user_metadata || {},
      created_at: supabaseUser.created_at,
      avatarUrl: supabaseUser.user_metadata?.avatarUrl,
      profileImageUrl: supabaseUser.user_metadata?.profileImageUrl ?? supabaseUser.user_metadata?.avatar_url,
      avatar_url: supabaseUser.user_metadata?.avatar_url,
      website: supabaseUser.user_metadata?.website,
      bio: supabaseUser.user_metadata?.bio,
      phone: supabaseUser.phone,
      ubxBalance: supabaseUser.user_metadata?.ubxBalance
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

      setProfile(data);
    } catch (error) {
      console.error('Error in fetchProfile:', error);
    }
  };

  const login = async (email: string, password: string): Promise<AuthResult> => {
    try {
      setError(null);
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        setError(error.message);
        return { success: false, error: error.message };
      }

      return { 
        success: true, 
        user: data.user ? mapSupabaseUserToUser(data.user) : null,
        session: data.session
      };
    } catch (error: any) {
      const errorMessage = error.message || 'An error occurred during login';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const register = async (email: string, password: string, username?: string): Promise<AuthResult> => {
    try {
      setError(null);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { username }
        }
      });

      if (error) {
        setError(error.message);
        return { success: false, error: error.message };
      }

      return { 
        success: true, 
        user: data.user ? mapSupabaseUserToUser(data.user) : null,
        session: data.session
      };
    } catch (error: any) {
      const errorMessage = error.message || 'An error occurred during registration';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const logout = async (): Promise<boolean> => {
    try {
      setError(null);
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        setError(error.message);
        return false;
      }
      
      return true;
    } catch (error: any) {
      setError(error.message || 'An error occurred during logout');
      return false;
    }
  };

  const updateUser = async (userData: Partial<AuthUser>): Promise<boolean> => {
    // Implementation for updating user data
    return false;
  };

  const updateProfile = async (profileData: any): Promise<boolean> => {
    if (!user) return false;

    try {
      setError(null);
      const { error } = await supabase
        .from('profiles')
        .update(profileData)
        .eq('id', user.id);

      if (error) {
        setError(error.message);
        return false;
      }

      setProfile(prev => prev ? { ...prev, ...profileData } : null);
      return true;
    } catch (error: any) {
      setError(error.message || 'An error occurred updating profile');
      return false;
    }
  };

  const updateUserProfile = updateProfile;
  
  const loadUserProfile = async (): Promise<any> => {
    if (!user) return null;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
        
      if (error) {
        console.error('Error loading user profile:', error);
        return null;
      }
      
      return data;
    } catch (error) {
      console.error('Error in loadUserProfile:', error);
      return null;
    }
  };
  
  const refreshProfile = async (): Promise<void> => {
    if (user) {
      await fetchProfile(user.id);
    }
  };

  const sendPasswordResetEmail = async (email: string): Promise<AuthResult> => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      
      if (error) {
        return { success: false, error: error.message };
      }
      
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message || 'Failed to send password reset email' };
    }
  };

  // Placeholder implementations
  const signIn = login;
  const signOut = logout;
  const resetPassword = async (email: string): Promise<AuthResult> => sendPasswordResetEmail(email);
  const requestPasswordReset = sendPasswordResetEmail;
  const verifyEmail = async (token: string): Promise<AuthResult> => ({ success: false, error: 'Not implemented' });
  const updatePassword = async (oldPassword: string, newPassword: string): Promise<boolean> => false;
  const deleteAccount = async (): Promise<boolean> => false;
  
  const checkRole = (role: string): boolean => {
    if (!user) return false;
    
    // Check in roles array first
    if (user.roles && Array.isArray(user.roles)) {
      return user.roles.some(r => {
        if (typeof r === 'string') return r === role;
        return r?.name === role;
      });
    }
    
    // Fall back to the role property
    return user.role === role;
  };

  const contextValue: AuthContextType = {
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

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default useAuth;
