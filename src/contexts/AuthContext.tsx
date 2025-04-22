import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AuthResult, LoginCredentials, RegisterCredentials, User } from '@/types/user';

interface AuthContextProps {
  user: User | null;
  session: any | null;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<AuthResult>;
  register: (credentials: RegisterCredentials) => Promise<AuthResult>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Function to convert Supabase User to our User type
const convertSupabaseUser = (supabaseUser: any): User | null => {
  if (!supabaseUser) return null;
  
  return {
    id: supabaseUser.id,
    email: supabaseUser.email || '',
    username: supabaseUser.user_metadata?.username || '',
    name: supabaseUser.user_metadata?.name || supabaseUser.user_metadata?.full_name || '',
    role: supabaseUser.user_metadata?.role || 'user',
    isVerified: supabaseUser.email_confirmed_at != null,
    createdAt: supabaseUser.created_at,
    created_at: supabaseUser.created_at, // For backward compatibility
    avatarUrl: supabaseUser.user_metadata?.avatar_url,
    profileImageUrl: supabaseUser.user_metadata?.avatar_url || supabaseUser.user_metadata?.profile_image_url,
    ubxBalance: supabaseUser.user_metadata?.ubx_balance || 0,
    bio: supabaseUser.user_metadata?.bio || '',
  };
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_, session) => {
        setSession(session);
        setUser(session ? convertSupabaseUser(session.user) : null);
        setLoading(false);
      }
    );
    
    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session ? convertSupabaseUser(session.user) : null);
      setLoading(false);
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  // Fix user conversion in login function
  const login = async (email: string, password: string): Promise<AuthResult> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        return { success: false, error: error.message };
      }
      
      return {
        success: true,
        user: convertSupabaseUser(data.user),
        session: data.session,
      };
    } catch (error: any) {
      return { success: false, error: error.message || 'Failed to login' };
    }
  };
  
  // Fix user conversion in register function
  const register = async (credentials: RegisterCredentials): Promise<AuthResult> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password,
        options: {
          data: {
            username: credentials.username,
            name: credentials.username,
          },
        },
      });
      
      if (error) {
        return { success: false, error: error.message };
      }
      
      return {
        success: true,
        user: convertSupabaseUser(data.user),
        session: data.session,
      };
    } catch (error: any) {
      return { success: false, error: error.message || 'Failed to register' };
    }
  };

  const value = {
    user,
    session,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isLoading: loading,
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
export { AuthProvider };
