import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import {
  Session,
  User as SupabaseUser,
} from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { UserProfile } from '@/types/escort';
import { useProfile } from '../useProfile';
import { AuthUser, AuthResult, UserRole } from '@/types/auth';

export interface AuthContextType {
  user: AuthUser | null;
  session: Session | null;
  isLoading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signUp: (email: string, password: string, metadata?: UserMetadata) => Promise<AuthResult>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUser: (updates: Partial<AuthUser>) => Promise<void>;
  clearSession: () => void;
  isLoggedIn: boolean;
  isAdmin: (user: AuthUser | null) => boolean;
  isCreator: (user: AuthUser | null) => boolean;
  isAuthenticated: boolean;
  checkRole: (role: string | string[]) => boolean;
  profile: UserProfile | null;
  refreshProfile: () => Promise<void>;
  updateUserProfile: (updates: any) => Promise<boolean>;
  updatePassword: (oldPassword: string, newPassword: string) => Promise<boolean>;
  logout: () => Promise<AuthResult>;
  userRoles: string[];
}

export interface AuthProviderProps {
  children: React.ReactNode;
}

interface UserMetadata {
  full_name?: string;
  avatar_url?: string;
  username?: string;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the provider
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userRoles, setUserRoles] = useState<string[]>([]);
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
        setUserRoles([]);
      }
    });
  }, [loadProfile]);
  
  const authUser: AuthUser = useMemo(() => {
    if (!session?.user) {
      return {} as AuthUser;
    }
    
    const user: SupabaseUser = session.user;
    
    return {
      id: user.id || '',
      email: user.email || '',
      name: user.user_metadata?.full_name || '',
      username: user.user_metadata?.username || '',
      avatar_url: user.user_metadata?.avatar_url || '',
      avatarUrl: user.user_metadata?.avatar_url || '',
      profileImageUrl: user.user_metadata?.avatar_url || '',
      roles: profile?.roles || [profile?.role || 'user'],
      user_metadata: user.user_metadata,
      app_metadata: user.app_metadata,
      phone_number: profile?.phone_number,
      location: profile?.location,
      bio: profile?.bio,
      is_escort: profile?.is_escort
    };
  }, [session, profile]);
  
  useEffect(() => {
    setUser(session?.user ? authUser : null);
    
    // Extract and set roles
    if (authUser && authUser.roles) {
      setUserRoles(authUser.roles);
    } else {
      setUserRoles(['user']); // Default role
    }
  }, [authUser, session]);
  
  const signInWithEmail = async (email: string, password: string): Promise<AuthResult> => {
    setIsLoading(true);
    setError(null);
    
    try {
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
      
      return { success: true, user: authUser, session: data.session };
    } catch (err: any) {
      setError(err.message || 'Sign in failed');
      return { success: false, error: err.message || 'Sign in failed' };
    } finally {
      setIsLoading(false);
    }
  };
  
  const signUpWithEmail = async (email: string, password: string, metadata?: UserMetadata): Promise<AuthResult> => {
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
            username: metadata?.full_name || email.split('@')[0],
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
      
      return { success: true, user: authUser, session: data.session };
    } catch (err: any) {
      setError(err.message || 'Sign up failed');
      return { success: false, error: err.message || 'Sign up failed' };
    } finally {
      setIsLoading(false);
    }
  };
  
  const logout = async (): Promise<AuthResult> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw new Error(error.message);
      }
      
      setSession(null);
      setUser(null);
      
      return { success: true };
    } catch (err: any) {
      setError(err.message || 'Sign out failed');
      return { success: false, error: err.message || 'Sign out failed' };
    } finally {
      setIsLoading(false);
    }
  };
  
  const resetPassword = async (email: string): Promise<void> => {
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
  
  const updateUserProfile = async (updates: Partial<AuthUser | UserProfile>): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      if (!user) {
        throw new Error('No user is currently signed in.');
      }
      
      // Update auth metadata if relevant fields are included
      if (updates.username || updates.avatar_url || updates.avatarUrl) {
        const { error: metadataError } = await supabase.auth.updateUser({
          data: {
            username: updates.username,
            avatar_url: updates.avatar_url || updates.avatarUrl,
          }
        });
        
        if (metadataError) {
          throw new Error(metadataError.message);
        }
      }
      
      // Update profile data
      const { data: updatedProfile, error: profileError } = await supabase
        .from('profiles')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id)
        .select()
        .single();
      
      if (profileError) {
        throw new Error(profileError.message);
      }
      
      await loadProfile(user.id);
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to update user profile');
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  const updateUser = async (updates: Partial<AuthUser>): Promise<void> => {
    await updateUserProfile(updates);
  };
  
  const updatePassword = async (oldPassword: string, newPassword: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      
      if (error) {
        throw new Error(error.message);
      }
      
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to update password');
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  const clearSession = () => {
    setSession(null);
    setUser(null);
    setUserRoles([]);
  };
  
  const isLoggedIn = !!session?.user;
  const isAuthenticated = !!session?.user;
  
  const isAdmin = useCallback((user: AuthUser | null) => {
    return user?.roles?.includes('admin') || false;
  }, []);
  
  const isCreator = useCallback((user: AuthUser | null) => {
    return user?.roles?.includes('creator') || false;
  }, []);
  
  const checkRole = useCallback((role: string | string[]) => {
    if (!user || !userRoles.length) return false;
    
    // If role is an array, check if user has any of those roles
    if (Array.isArray(role)) {
      return role.some(r => userRoles.includes(r));
    }
    
    // Otherwise check for a single role
    return userRoles.includes(role);
  }, [user, userRoles]);
  
  const refreshProfile = async (): Promise<void> => {
    if (user?.id) {
      await loadProfile(user.id);
    }
  };
  
  const signIn = (email: string, password: string): Promise<AuthResult> => {
    return signInWithEmail(email, password);
  };
  
  const signUp = (email: string, password: string, metadata?: UserMetadata): Promise<AuthResult> => {
    return signUpWithEmail(email, password, metadata);
  };
  
  const signOut = (): Promise<void> => {
    return logout().then(() => {});
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
    isAuthenticated,
    checkRole,
    profile,
    refreshProfile,
    updateUserProfile,
    updatePassword,
    logout,
    userRoles,
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

export default useAuth;
