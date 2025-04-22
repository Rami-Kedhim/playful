
import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AuthResult, LoginCredentials, RegisterCredentials, User } from '@/types/user';

interface AuthContextProps {
  user: User | null;
  session: any | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<AuthResult>;
  register: (credentials: RegisterCredentials) => Promise<AuthResult>;
  logout: () => Promise<void>;
  signOut: () => Promise<void>; // Alias for logout for backward compatibility
  isAuthenticated: boolean;
  isLoading: boolean;
  checkRole: (role: string) => boolean;
  clearError: () => void;
  updateUserProfile: (userData: Partial<User>) => Promise<boolean>;
  refreshProfile: () => Promise<void>;
  error: string | null;
  profile: any;
  sendPasswordResetEmail: (email: string) => Promise<AuthResult>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<any>(null);

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setProfile(null);
  };

  // Alias for logout for backward compatibility
  const signOut = logout;

  // Check if user has a specific role
  const checkRole = (roleName: string): boolean => {
    if (!user || !user.roles) return false;
    
    // Handle different role formats (string or object)
    return user.roles.some(role => {
      if (typeof role === 'string') {
        return role === roleName;
      }
      return role.name === roleName;
    });
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
  
  // Login function
  const login = async (email: string, password: string): Promise<AuthResult> => {
    try {
      setError(null);
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
        user: convertSupabaseUser(data.user),
        session: data.session,
      };
    } catch (error: any) {
      const errorMsg = error.message || 'Failed to login';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    }
  };
  
  // Register function
  const register = async (credentials: RegisterCredentials): Promise<AuthResult> => {
    try {
      setError(null);
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
        setError(error.message);
        return { success: false, error: error.message };
      }
      
      return {
        success: true,
        user: convertSupabaseUser(data.user),
        session: data.session,
      };
    } catch (error: any) {
      const errorMsg = error.message || 'Failed to register';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    }
  };

  // Send password reset email
  const sendPasswordResetEmail = async (email: string): Promise<AuthResult> => {
    try {
      setError(null);
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/reset-password',
      });
      
      if (error) {
        setError(error.message);
        return { success: false, error: error.message };
      }
      
      return {
        success: true,
      };
    } catch (error: any) {
      const errorMsg = error.message || 'Failed to send password reset email';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    }
  };

  // Update user profile
  const updateUserProfile = async (userData: Partial<User>): Promise<boolean> => {
    try {
      if (!user) return false;
      
      // Update user metadata in Supabase Auth
      const { error } = await supabase.auth.updateUser({
        data: userData
      });
      
      if (error) throw error;
      
      // Update the local user state
      setUser(prevUser => prevUser ? { ...prevUser, ...userData } : null);
      
      return true;
    } catch (error) {
      console.error("Error updating user profile:", error);
      return false;
    }
  };

  // Refresh user profile data
  const refreshProfile = async (): Promise<void> => {
    if (!user) return;
    
    try {
      // Fetch the latest user data
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      
      if (currentUser) {
        const updatedUser = convertSupabaseUser(currentUser);
        setUser(updatedUser);
      }
      
      // Fetch additional profile data if needed
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (profileData) {
        setProfile(profileData);
      }
    } catch (error) {
      console.error("Error refreshing profile:", error);
    }
  };

  const clearError = () => setError(null);

  const value = {
    user,
    session,
    loading,
    login,
    register,
    logout,
    signOut, // Add signOut alias
    isAuthenticated: !!user,
    isLoading: loading,
    checkRole,
    error,
    clearError,
    updateUserProfile,
    refreshProfile,
    profile,
    sendPasswordResetEmail,
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthContext };
