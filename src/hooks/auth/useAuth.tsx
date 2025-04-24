
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { AuthContextType, User, UserProfile, AuthResult } from '@/types/auth';

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        setIsAuthenticated(!!session?.user);
        
        // Defer profile fetch to prevent authentication deadlock
        if (session?.user) {
          setTimeout(() => {
            loadUserProfile().catch(console.error);
          }, 0);
        } else {
          setProfile(null);
        }
      }
    );

    // THEN check for existing session
    const initializeAuth = async () => {
      try {
        setIsLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        
        setUser(session?.user ?? null);
        setIsAuthenticated(!!session?.user);
        
        if (session?.user) {
          await loadUserProfile();
        }
      } catch (err) {
        console.error("Auth initialization error:", err);
        setError("Failed to initialize authentication");
      } finally {
        setIsLoading(false);
        setLoading(false);
        setInitialized(true);
      }
    };

    initializeAuth();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string, options?: any): Promise<AuthResult> => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) throw error;
      
      return { 
        success: true, 
        user: data.user,
        session: data.session
      };
    } catch (error: any) {
      console.error("Login error:", error);
      return { 
        success: false, 
        error: error.message 
      };
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = login; // Alias for login

  const logout = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      
      if (error) throw error;
      
      setUser(null);
      setProfile(null);
      setIsAuthenticated(false);
    } catch (error: any) {
      console.error("Logout error:", error);
      toast.error("Failed to log out");
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = logout; // Alias for logout

  const register = async (email: string, password: string, username?: string, options?: any): Promise<AuthResult> => {
    try {
      setIsLoading(true);
      
      // Prepare user metadata
      const userData = {
        username: username || email.split('@')[0],
      };
      
      const { data, error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: userData
        }
      });
      
      if (error) throw error;
      
      if (data.user && !data.user.identities?.length) {
        return {
          success: false,
          error: "Email already in use"
        };
      }
      
      return {
        success: true,
        user: data.user,
        session: data.session
      };
    } catch (error: any) {
      console.error("Registration error:", error);
      return {
        success: false,
        error: error.message
      };
    } finally {
      setIsLoading(false);
    }
  };

  const loadUserProfile = async (): Promise<User | null> => {
    try {
      setIsLoading(true);
      
      // Get user profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();
      
      if (profileError && profileError.code !== 'PGRST116') {
        // PGRST116 is "no rows returned" - might be normal if profile doesn't exist
        console.error("Profile fetch error:", profileError);
      }
      
      if (profile) {
        setProfile(profile as UserProfile);
      }
      
      return user;
    } catch (error) {
      console.error("Error loading user profile:", error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const refreshProfile = async (): Promise<void> => {
    if (!user?.id) return;
    await loadUserProfile();
  };

  const updateUser = async (userData: Partial<User>): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase.auth.updateUser({
        email: userData.email,
        data: userData.user_metadata
      });
      
      if (error) throw error;
      
      setUser(prevUser => 
        prevUser ? { ...prevUser, ...userData } : null
      );
      
      return true;
    } catch (error) {
      console.error("Error updating user:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (profileData: Partial<UserProfile>): Promise<boolean> => {
    if (!user?.id) return false;
    
    try {
      setIsLoading(true);
      
      // First update auth metadata if username or avatar_url is included
      if (profileData.username || profileData.avatar_url) {
        const { error: updateUserError } = await supabase.auth.updateUser({
          data: {
            username: profileData.username,
            avatar_url: profileData.avatar_url
          }
        });
        
        if (updateUserError) throw updateUserError;
      }
      
      // Then update profile record
      const { error } = await supabase
        .from('profiles')
        .update({
          ...profileData,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      // Update local state
      setProfile(prev => prev ? { ...prev, ...profileData } : null);
      
      return true;
    } catch (error) {
      console.error("Error updating profile:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Alias for updateProfile
  const updateUserProfile = updateProfile;

  const requestPasswordReset = async (email: string): Promise<AuthResult> => {
    try {
      setIsLoading(true);
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) throw error;
      
      return { success: true };
    } catch (error: any) {
      console.error("Password reset request error:", error);
      return { 
        success: false, 
        error: error.message 
      };
    } finally {
      setIsLoading(false);
    }
  };
  
  // Alias for requestPasswordReset
  const sendPasswordResetEmail = requestPasswordReset;

  const resetPassword = async (token: string, password: string): Promise<AuthResult> => {
    try {
      setIsLoading(true);
      
      const { error } = await supabase.auth.updateUser({ password });
      
      if (error) throw error;
      
      return { success: true };
    } catch (error: any) {
      console.error("Password reset error:", error);
      return { 
        success: false, 
        error: error.message 
      };
    } finally {
      setIsLoading(false);
    }
  };

  const updatePassword = async (currentPassword: string, newPassword: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // First verify the current password by signing in
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user?.email || '',
        password: currentPassword,
      });
      
      if (signInError) {
        toast.error("Current password is incorrect");
        return false;
      }
      
      // Update to the new password
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      
      if (error) throw error;
      
      return true;
    } catch (error: any) {
      console.error("Error updating password:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyEmail = async (token: string): Promise<AuthResult> => {
    try {
      const email = user?.email || '';
      const { error } = await supabase.auth.verifyOtp({
        email,
        token,
        type: 'email'
      });
      
      if (error) throw error;
      
      return { success: true };
    } catch (error: any) {
      console.error("Email verification error:", error);
      return { 
        success: false, 
        error: error.message 
      };
    }
  };

  const deleteAccount = async (): Promise<boolean> => {
    if (!user) return false;
    
    try {
      setIsLoading(true);
      
      // Delete account from auth
      const { error } = await supabase.auth.admin.deleteUser(user.id);
      
      if (error) {
        console.error("Error deleting user:", error);
        return false;
      }
      
      // Sign out
      await supabase.auth.signOut();
      
      // Reset state
      setUser(null);
      setProfile(null);
      setIsAuthenticated(false);
      
      return true;
    } catch (error) {
      console.error("Error deleting account:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const checkRole = (role: string): boolean => {
    if (!user) return false;
    
    // Check if user has the specified role
    if (user.roles && Array.isArray(user.roles)) {
      return user.roles.some(userRole => {
        if (typeof userRole === 'string') {
          return userRole === role;
        } else {
          return userRole.name === role;
        }
      });
    }
    
    // Fallback to single role check
    return user.role === role;
  };

  const authContextValue: AuthContextType = {
    user,
    profile,
    isAuthenticated,
    isLoading,
    loading,
    error,
    initialized,
    checkRole,
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
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { useAuth, AuthProvider, AuthContext };
export default useAuth;
