
import React, { createContext, useState, useEffect, useContext } from 'react';
import { User, UserProfile, AuthResult } from '@/types/user';
import { supabase } from '@/integrations/supabase/client';

// Define the shape of our Auth context
export interface AuthContextProps {
  user: User | null;
  profile: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  initialized: boolean;
  checkRole: (role: string) => boolean;
  login: (email: string, password: string, options?: any) => Promise<AuthResult>;
  logout: () => Promise<void>;
  register: (email: string, password: string, username?: string, options?: any) => Promise<AuthResult>;
  updateUser: (data: Partial<User>) => Promise<boolean>;
  updateUserProfile: (data: Partial<UserProfile>) => Promise<boolean>;
  loadUserProfile: () => Promise<User | null>;
  refreshProfile: () => Promise<void>;
  sendPasswordResetEmail: (email: string) => Promise<AuthResult>;
  resetPassword: (token: string, password: string) => Promise<AuthResult>;
  requestPasswordReset: (email: string) => Promise<AuthResult>;
  verifyEmail: (token: string) => Promise<AuthResult>;
  signIn?: (email: string, password: string) => Promise<AuthResult>;
  signOut?: () => Promise<void>;
}

// Create the context with a default empty object
export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);

  // Initialize auth state on mount
  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      
      try {
        // First, set up the auth state change listener
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          (event, session) => {
            setUser(session?.user as User || null);
            
            // If a user just signed in, fetch their profile
            if (event === 'SIGNED_IN' && session?.user) {
              // Use setTimeout to avoid recursive auth state updates
              setTimeout(() => {
                fetchUserProfile(session.user.id);
              }, 0);
            }
            
            // Clear profile on sign out
            if (event === 'SIGNED_OUT') {
              setProfile(null);
            }
          }
        );
        
        // Then check for existing session
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user as User || null);
        
        // Fetch user profile if we have a user
        if (session?.user) {
          await fetchUserProfile(session.user.id);
        }
        
        setInitialized(true);
        
        return () => {
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error('Auth initialization error:', error);
        setError('Failed to initialize authentication');
      } finally {
        setIsLoading(false);
      }
    };
    
    initAuth();
  }, []);
  
  // Helper to fetch user profile
  const fetchUserProfile = async (userId: string) => {
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
      
      if (data) {
        setProfile(data as UserProfile);
      }
    } catch (error) {
      console.error('Profile fetch error:', error);
    }
  };
  
  // Login functionality
  const login = async (email: string, password: string): Promise<AuthResult> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        setError(error.message);
        return { success: false, error: error.message };
      }
      
      return { 
        success: true, 
        user: data?.user as User || undefined,
        session: data?.session
      };
    } catch (err: any) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };
  
  // Register functionality
  const register = async (email: string, password: string, username?: string): Promise<AuthResult> => {
    setIsLoading(true);
    setError(null);
    
    try {
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
      
      // Create a profile for the new user
      if (data?.user) {
        await supabase.from('profiles').upsert({
          id: data.user.id,
          username: username || email.split('@')[0],
          email,
          avatar_url: '',
          created_at: new Date().toISOString()
        });
      }
      
      return { 
        success: true,
        user: data?.user as User || undefined,
        session: data?.session
      };
    } catch (err: any) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };
  
  // Logout functionality
  const logout = async (): Promise<void> => {
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        setError(error.message);
      }
      setUser(null);
      setProfile(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Update user profile
  const updateUserProfile = async (data: Partial<UserProfile>): Promise<boolean> => {
    if (!user) return false;
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', user.id);
      
      if (error) {
        setError(error.message);
        return false;
      }
      
      // Refresh profile after update
      await fetchUserProfile(user.id);
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    }
  };
  
  // Update user in auth
  const updateUser = async (data: Partial<User>): Promise<boolean> => {
    try {
      const { error } = await supabase.auth.updateUser({
        data
      });
      
      if (error) {
        setError(error.message);
        return false;
      }
      
      // Update local user
      setUser(prev => prev ? { ...prev, ...data } : null);
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    }
  };
  
  // Load user profile
  const loadUserProfile = async (): Promise<User | null> => {
    if (!user) return null;
    
    try {
      await fetchUserProfile(user.id);
      return user;
    } catch (err) {
      console.error('Failed to load profile', err);
      return null;
    }
  };
  
  // Refresh profile
  const refreshProfile = async (): Promise<void> => {
    if (!user) return;
    await fetchUserProfile(user.id);
  };
  
  // Send password reset email
  const sendPasswordResetEmail = async (email: string): Promise<AuthResult> => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      
      if (error) {
        return { success: false, error: error.message };
      }
      
      return { success: true, message: "Password reset email sent" };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };
  
  // Reset password with token
  const resetPassword = async (token: string, password: string): Promise<AuthResult> => {
    try {
      const { error } = await supabase.auth.updateUser({
        password
      });
      
      if (error) {
        return { success: false, error: error.message };
      }
      
      return { success: true, message: "Password updated successfully" };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };
  
  // Request password reset
  const requestPasswordReset = async (email: string): Promise<AuthResult> => {
    return sendPasswordResetEmail(email);
  };
  
  // Verify email
  const verifyEmail = async (token: string): Promise<AuthResult> => {
    try {
      // This is just a placeholder as Supabase handles email verification automatically
      return { success: true, message: "Email verification handled by Supabase" };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };
  
  // Check if user has a specific role
  const checkRole = (roleToCheck: string): boolean => {
    if (!user) return false;
    
    // If user has a single role as a string
    if (user.role && typeof user.role === 'string') {
      return user.role === roleToCheck;
    }
    
    // If user has roles array
    if (user.roles && Array.isArray(user.roles)) {
      return user.roles.some(role => {
        if (typeof role === 'string') {
          return role === roleToCheck;
        }
        return role?.name === roleToCheck;
      });
    }
    
    return false;
  };
  
  // Provide auth context
  const authContextValue: AuthContextProps = {
    user,
    profile,
    isAuthenticated: !!user,
    isLoading,
    error,
    initialized,
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
    checkRole,
    // Aliases for compatibility
    signIn: login,
    signOut: logout
  };
  
  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

export default useAuth;
