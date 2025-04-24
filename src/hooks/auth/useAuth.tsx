import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { AuthContextType, AuthResult, UserProfile, User } from '@/types/auth';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [initialized, setInitialized] = useState(false);

  // Computed property for isAuthenticated
  const isAuthenticated = !!user;

  // Convert Supabase user to our User type
  const convertUser = (supabaseUser: SupabaseUser | null): User | null => {
    if (!supabaseUser) return null;
    return {
      id: supabaseUser.id,
      email: supabaseUser.email || undefined,
      username: supabaseUser.user_metadata?.username,
      name: supabaseUser.user_metadata?.name,
      role: supabaseUser.user_metadata?.role,
      avatarUrl: supabaseUser.user_metadata?.avatar_url,
      user_metadata: supabaseUser.user_metadata,
      created_at: supabaseUser.created_at,
      // Add any other properties you need
    };
  };

  useEffect(() => {
    // Check active sessions and set the user
    const getSession = async () => {
      setLoading(true);
      
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          throw error;
        }
        
        if (data?.session) {
          const { data: userData } = await supabase.auth.getUser();
          setUser(convertUser(userData.user));
          await loadUserProfile();
        }
      } catch (e: any) {
        setError(e);
        console.error('Error getting session:', e.message);
      } finally {
        setLoading(false);
        setInitialized(true);
      }
    };
    
    getSession();

    // Listen for auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(convertUser(session.user));
          await loadUserProfile();
        } else {
          setUser(null);
          setProfile(null);
        }
        setLoading(false);
        setInitialized(true);
      }
    );

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const loadUserProfile = async (): Promise<User | null> => {
    if (!user) return null;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
        
      if (error) throw error;
      
      if (data) {
        setProfile(data as UserProfile);
      }
      
      return user;
    } catch (error: any) {
      console.error('Error loading user profile:', error.message);
      return user;
    }
  };

  const refreshProfile = async (): Promise<void> => {
    await loadUserProfile();
  };

  const signIn = async (email: string, password: string, options: any = {}): Promise<AuthResult> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return { success: true, user: convertUser(data?.user), session: data?.session };
    } catch (error: any) {
      console.error('Error signing in:', error.message);
      return { success: false, error: error.message };
    }
  };

  const login = signIn; // Alias for signIn

  const signOut = async (): Promise<void> => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setProfile(null);
    } catch (error: any) {
      console.error('Error signing out:', error);
    }
  };

  const logout = signOut; // Alias for signOut

  const register = async (email: string, password: string, username?: string, options: any = {}): Promise<AuthResult> => {
    try {
      const userData = {
        email,
        password,
        options: {
          data: { username }
        }
      };
      
      const { data, error } = await supabase.auth.signUp(userData);
      
      if (error) throw error;
      
      return { 
        success: true, 
        user: convertUser(data?.user), 
        session: data?.session 
      };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const updateUser = async (userData: Partial<User>): Promise<boolean> => {
    try {
      const { error } = await supabase.auth.updateUser(userData);
      if (error) throw error;
      await loadUserProfile();
      return true;
    } catch (error: any) {
      console.error('Error updating user:', error.message);
      return false;
    }
  };

  const updateUserProfile = async (profileData: Partial<UserProfile>): Promise<boolean> => {
    if (!user) return false;
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update(profileData)
        .eq('id', user.id);
        
      if (error) throw error;
      
      // Refresh profile
      await loadUserProfile();
      
      return true;
    } catch (error: any) {
      console.error('Error updating profile:', error.message);
      return false;
    }
  };

  const updateProfile = updateUserProfile; // Alias for updateUserProfile

  const sendPasswordResetEmail = async (email: string): Promise<AuthResult> => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      
      if (error) throw error;
      
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const requestPasswordReset = sendPasswordResetEmail; // Alias

  const resetPassword = async (token: string, password: string): Promise<AuthResult> => {
    try {
      const { error } = await supabase.auth.updateUser({ password });
      
      if (error) throw error;
      
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const verifyEmail = async (token: string): Promise<AuthResult> => {
    // This is typically handled by Supabase automatically
    // This is just a placeholder
    return { success: true };
  };

  const updatePassword = async (currentPassword: string, newPassword: string): Promise<boolean> => {
    try {
      // First verify the current password by attempting to sign in
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user?.email || '',
        password: currentPassword
      });
      
      if (signInError) {
        console.error('Current password verification failed:', signInError.message);
        return false;
      }
      
      // If sign in was successful, update the password
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      
      if (error) {
        console.error('Error updating password:', error.message);
        return false;
      }
      
      return true;
    } catch (error: any) {
      console.error('Error in updatePassword:', error.message);
      return false;
    }
  };

  // Add checkRole function to support useRole hook
  const checkRole = (role: string): boolean => {
    if (!user) return false;
    
    // Check in user_metadata.role if it exists
    if (user.user_metadata && user.user_metadata.role) {
      return user.user_metadata.role === role;
    }
    
    // Fall back to role property if it exists
    if (user.role) {
      return user.role === role;
    }
    
    return false;
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      profile,
      loading, 
      isLoading: loading, 
      error: error?.message || null, 
      isAuthenticated,
      initialized,
      signIn, 
      signOut,
      login,
      logout,
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
      checkRole,
      updatePassword,
      session: user?.session || null
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default useAuth;
