import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import {
  Session,
  User as SupabaseUser,
} from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { UserProfile } from '@/types/escort';
import { useProfile } from '../useProfile';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatar_url: string;
  roles: string[];
  phone_number?: string;
  location?: string;
  bio?: string;
  is_escort?: boolean;
}

export interface AuthContextType {
  user: AuthUser | null;
  session: Session | null;
  isLoading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, metadata?: UserMetadata) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUser: (updates: Partial<AuthUser>) => Promise<void>;
  clearSession: () => void;
  isLoggedIn: boolean;
  isAdmin: (user: AuthUser | null) => boolean;
  isCreator: (user: AuthUser | null) => boolean;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}

interface UserMetadata {
  full_name?: string;
  avatar_url?: string;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the provider
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { profile, loadProfile } = useProfile();
  
  useEffect(() => {
    const fetchSession = async () => {
      setIsLoading(true);
      try {
        const { data: existingSession, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) {
          throw new Error(sessionError.message);
        }
        
        setSession(existingSession?.session || null);
        
        if (existingSession?.session?.user) {
          await loadProfile(existingSession.session.user.id);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch session');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSession();
    
    supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session || null);
      
      if (session?.user) {
        await loadProfile(session.user.id);
      } else {
        setUser(null);
      }
    });
  }, [loadProfile]);
  
  const authUser: AuthUser = useMemo(() => {
    const user: SupabaseUser | undefined = session?.user;
    
    return {
      id: user?.id || '',
      email: user?.email || '',
      name: user?.user_metadata?.full_name || '',
      avatar_url: user?.user_metadata?.avatar_url || '',
      roles: profile?.role ? [profile.role] : [],
      phone_number: profile?.phone_number,
      location: profile?.location,
      bio: profile?.bio,
      is_escort: profile?.is_escort
    };
  }, [session, profile]);
  
  useEffect(() => {
    setUser(authUser);
  }, [authUser]);
  
  const signInWithEmail = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data: existingSession } = await supabase.auth.getSession();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      setSession(data.session);
      
      if (data.session?.user) {
        await loadProfile(data.session.user.id);
      }
      
      return { success: true, message: 'Sign in successful' };
    } catch (err: any) {
      setError(err.message || 'Sign in failed');
      return { success: false, message: err.message || 'Sign in failed' };
    } finally {
      setIsLoading(false);
    }
  };
  
  const signUpWithEmail = async (email: string, password: string, metadata?: UserMetadata) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            full_name: metadata?.full_name,
            avatar_url: metadata?.avatar_url,
          },
        },
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      setSession(data.session);
      
      if (data.user) {
        await loadProfile(data.user.id);
      }
      
      return { success: true, message: 'Sign up successful' };
    } catch (err: any) {
      setError(err.message || 'Sign up failed');
      return { success: false, message: err.message || 'Sign up failed' };
    } finally {
      setIsLoading(false);
    }
  };
  
  const signOut = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw new Error(error.message);
      }
      
      setSession(null);
      setUser(null);
    } catch (err: any) {
      setError(err.message || 'Sign out failed');
    } finally {
      setIsLoading(false);
    }
  };
  
  const resetPassword = async (email: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      });
      if (error) {
        throw new Error(error.message);
      }
    } catch (err: any) {
      setError(err.message || 'Password reset failed');
    } finally {
      setIsLoading(false);
    }
  };
  
  const updateUser = async (updates: Partial<AuthUser>) => {
    setIsLoading(true);
    setError(null);
    
    try {
      if (!user) {
        throw new Error('No user is currently signed in.');
      }
      
      const { data: updatedProfile, error: profileError } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();
      
      if (profileError) {
        throw new Error(profileError.message);
      }
      
      setUser({ ...user, ...updates });
    } catch (err: any) {
      setError(err.message || 'Failed to update user');
    } finally {
      setIsLoading(false);
    }
  };
  
  const clearSession = () => {
    setSession(null);
    setUser(null);
  };
  
  const isLoggedIn = !!session?.user;
  
  const isAdmin = useCallback((user: AuthUser | null) => {
    return user?.roles?.includes('admin') || false;
  }, []);
  
  const isCreator = useCallback((user: AuthUser | null) => {
    return user?.roles?.includes('creator') || false;
  }, []);
  
  const signIn = async (email: string, password: string): Promise<void> => {
    const result = await signInWithEmail(email, password);
    if (!result.success) {
      throw new Error(result.message);
    }
  };
  
  const signUp = async (email: string, password: string, metadata?: UserMetadata): Promise<void> => {
    const result = await signUpWithEmail(email, password, metadata);
    if (!result.success) {
      throw new Error(result.message);
    }
  };
  
  const value = {
    user,
    session,
    isLoading,
    error,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updateUser,
    clearSession,
    isLoggedIn,
    isAdmin,
    isCreator,
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Create the hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
