
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';
import { AuthContextType, AuthResult, UserProfile } from '@/types/auth';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [initialized, setInitialized] = useState(false);

  // Computed property for isAuthenticated
  const isAuthenticated = !!user;

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
          setUser(userData.user);
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
          setUser(session.user);
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
      return { success: true, user: data?.user || null, session: data?.session };
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
        user: data?.user || null, 
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

  // Add checkRole function to support useRole hook
  const checkRole = (role: string): boolean => {
    if (!user) return false;
    
    // Check in roles array if it exists
    if (user.roles && Array.isArray(user.roles)) {
      return user.roles.some(r => 
        (typeof r === 'string' && r === role) || 
        (typeof r === 'object' && r.name === role)
      );
    }
    
    // Fall back to role property if it exists
    if (user.role) {
      return user.role === role;
    }
    
    // Check in user metadata
    if (user.user_metadata && user.user_metadata.role) {
      return user.user_metadata.role === role;
    }
    
    return false;
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      profile,
      loading: isLoading, 
      isLoading, 
      error, 
      isAuthenticated,
      initialized,
      signIn, 
      signOut,
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
      session: user?.session
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
