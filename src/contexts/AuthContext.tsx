
import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AuthContextType, User, AuthResult } from '@/types/auth';

// Create the context with default values
export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
  initialized: false,
  checkRole: () => false,
  login: async () => ({ success: false }),
  logout: async () => {},
  register: async () => ({ success: false }),
  updateUser: async () => false,
  updateUserProfile: async () => false,
  loadUserProfile: async () => null,
  refreshProfile: async () => {},
  sendPasswordResetEmail: async () => ({ success: false }),
  resetPassword: async () => ({ success: false }),
  requestPasswordReset: async () => ({ success: false }),
  verifyEmail: async () => ({ success: false }),
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session && session.user) {
          const userData = {
            id: session.user.id,
            email: session.user.email || '',
            username: session.user.user_metadata?.username,
            name: session.user.user_metadata?.name,
            isVerified: false,
            createdAt: session.user.created_at || new Date().toISOString(),
            roles: session.user.user_metadata?.roles || ['user'],
            ubxBalance: session.user.user_metadata?.ubx_balance || 0,
            bio: session.user.user_metadata?.bio,
            avatar_url: session.user.user_metadata?.avatar_url,
            profileImageUrl: session.user.user_metadata?.avatar_url,
          };
          setUser(userData);
          setIsLoading(false);
        } else {
          setUser(null);
          setIsLoading(false);
        }
      }
    );

    // Check initial session
    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          throw error;
        }

        if (session && session.user) {
          const userData = {
            id: session.user.id,
            email: session.user.email || '',
            username: session.user.user_metadata?.username,
            name: session.user.user_metadata?.name,
            isVerified: false,
            createdAt: session.user.created_at || new Date().toISOString(),
            roles: session.user.user_metadata?.roles || ['user'],
            ubxBalance: session.user.user_metadata?.ubx_balance || 0,
            bio: session.user.user_metadata?.bio,
            avatar_url: session.user.user_metadata?.avatar_url,
            profileImageUrl: session.user.user_metadata?.avatar_url,
          };
          setUser(userData);
        }
      } catch (error: any) {
        console.error('Error initializing auth:', error.message);
        setError(error.message);
      } finally {
        setIsLoading(false);
        setInitialized(true);
      }
    };

    initializeAuth();

    // Clean up subscription
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<AuthResult> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        throw error;
      }
      
      if (data.user) {
        const userData = {
          id: data.user.id,
          email: data.user.email || '',
          username: data.user.user_metadata?.username,
          name: data.user.user_metadata?.name,
          isVerified: false,
          createdAt: data.user.created_at || new Date().toISOString(),
          roles: data.user.user_metadata?.roles || ['user'],
          ubxBalance: data.user.user_metadata?.ubx_balance || 0,
        };
        setUser(userData);
        return { success: true, user: userData };
      }
      
      return { success: false, error: 'No user data returned' };
    } catch (err: any) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, username: string = ''): Promise<AuthResult> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: username || email.split('@')[0],
            roles: ['user'],
            ubx_balance: 0
          }
        }
      });
      
      if (error) {
        throw error;
      }

      if (data.user) {
        const userData = {
          id: data.user.id,
          email: data.user.email || '',
          username: username || data.user.email?.split('@')[0] || '',
          name: username || '',
          isVerified: false,
          createdAt: data.user.created_at || new Date().toISOString(),
          roles: ['user']
        };
        setUser(userData);
        return { success: true, user: userData };
      }
      
      return { success: false, error: 'No user data returned' };
    } catch (err: any) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }
      
      setUser(null);
    } catch (err: any) {
      setError(err.message);
      console.error('Error during logout:', err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const checkRole = (role: string): boolean => {
    if (!user || !user.roles) return false;
    
    return user.roles.some(userRole => {
      if (typeof userRole === 'string') {
        return userRole === role;
      }
      return userRole.name === role;
    });
  };

  const updateUser = async (data: Partial<User>): Promise<boolean> => {
    if (!user) return false;
    
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          ...data
        }
      });
      
      if (error) throw error;
      
      // Update local user state
      setUser(prev => prev ? { ...prev, ...data } : null);
      return true;
    } catch (error) {
      console.error("Error updating user:", error);
      return false;
    }
  };

  const updateUserProfile = async (data: any): Promise<boolean> => {
    if (!user) return false;
    
    try {
      // Update profile in the profiles table
      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', user.id);
      
      if (error) throw error;
      
      // Also update user metadata for relevant fields
      await updateUser({
        ...data
      });
      
      return true;
    } catch (error) {
      console.error("Error updating profile:", error);
      return false;
    }
  };

  const loadUserProfile = async (): Promise<User | null> => {
    if (!user) return null;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) throw error;
      
      // Merge profile data with user
      const updatedUser = {
        ...user,
        ...data
      };
      
      setUser(updatedUser);
      return updatedUser;
    } catch (error) {
      console.error("Error loading profile:", error);
      return user;
    }
  };

  const refreshProfile = async (): Promise<void> => {
    await loadUserProfile();
  };

  const sendPasswordResetEmail = async (email: string): Promise<AuthResult> => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/reset-password',
      });
      
      if (error) throw error;
      
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const resetPassword = async (token: string, password: string): Promise<AuthResult> => {
    try {
      const { error } = await supabase.auth.updateUser({ password });
      
      if (error) throw error;
      
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const requestPasswordReset = async (email: string): Promise<AuthResult> => {
    return await sendPasswordResetEmail(email);
  };

  const verifyEmail = async (token: string): Promise<AuthResult> => {
    try {
      // This is a placeholder as email verification is typically handled by Supabase redirect
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  // For compatibility with other hooks
  const signIn = login;
  const signOut = logout;

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    initialized,
    checkRole,
    login,
    logout,
    register,
    updateUser,
    updateUserProfile,
    loadUserProfile,
    refreshProfile,
    sendPasswordResetEmail,
    resetPassword,
    requestPasswordReset,
    verifyEmail,
    signIn,
    signOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthContext;
