
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { User } from '@supabase/supabase-js';
import { AuthResult, AuthUser, UserProfile, AuthContextType } from '@/types/auth';

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Setup auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          await loadUserProfile();
        } else {
          setProfile(null);
        }
      }
    );

    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadUserProfile();
      }
      setInitialized(true);
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const loadUserProfile = async () => {
    if (!user) return null;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (error) throw error;
      setProfile(data);
      return data;
    } catch (error: any) {
      console.error('Error loading user profile:', error.message);
      return null;
    }
  };

  const login = async (email: string, password: string): Promise<AuthResult> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast.success('Successfully logged in');
      return { success: true, user: data.user };
    } catch (error: any) {
      toast.error('Failed to log in', {
        description: error.message
      });
      return { success: false, error: error.message };
    }
  };

  const signIn = login; // Alias for login

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success('Successfully logged out');
    } catch (error: any) {
      toast.error('Failed to log out', {
        description: error.message
      });
    }
  };

  const signOut = logout; // Alias for logout

  const register = async (email: string, password: string, username?: string): Promise<AuthResult> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
          },
        },
      });

      if (error) throw error;

      toast.success('Registration successful');
      return { success: true, user: data.user };
    } catch (error: any) {
      toast.error('Registration failed', {
        description: error.message
      });
      return { success: false, error: error.message };
    }
  };

  const updatePassword = async (currentPassword: string, newPassword: string): Promise<boolean> => {
    try {
      // First verify the current password
      const { error: verifyError } = await supabase.auth.signInWithPassword({
        email: user?.email || '',
        password: currentPassword,
      });

      if (verifyError) throw new Error('Current password is incorrect');

      // Update to new password
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      
      if (error) throw error;

      toast.success('Password updated successfully');
      return true;
    } catch (error: any) {
      toast.error('Failed to update password', {
        description: error.message
      });
      return false;
    }
  };

  const updateUser = async (data: Partial<AuthUser>): Promise<boolean> => {
    try {
      const { error } = await supabase.auth.updateUser(data);
      if (error) throw error;
      
      toast.success('Profile updated successfully');
      return true;
    } catch (error: any) {
      toast.error('Failed to update profile', {
        description: error.message
      });
      return false;
    }
  };

  const updateProfile = async (data: Partial<UserProfile>): Promise<boolean> => {
    if (!user?.id) return false;
    
    try {
      // Handle preferences separately if they exist
      const { preferences, ...profileData } = data;
      
      // First update the profile table fields
      if (Object.keys(profileData).length > 0) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update(profileData)
          .eq('id', user.id);
  
        if (profileError) throw profileError;
      }
      
      // Then update user metadata if preferences are provided
      if (preferences) {
        const { error: userError } = await supabase.auth.updateUser({
          data: { preferences }
        });
        
        if (userError) throw userError;
      }
      
      await loadUserProfile(); // Refresh profile data
      toast.success('Profile updated successfully');
      return true;
    } catch (error: any) {
      toast.error('Failed to update profile', {
        description: error.message
      });
      return false;
    }
  };

  const updateUserProfile = updateProfile; // Alias for updateProfile

  const refreshProfile = async () => {
    await loadUserProfile();
  };

  const sendPasswordResetEmail = async (email: string): Promise<AuthResult> => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;

      toast.success('Password reset email sent');
      return { success: true };
    } catch (error: any) {
      toast.error('Failed to send reset email', {
        description: error.message
      });
      return { success: false, error: error.message };
    }
  };

  const requestPasswordReset = sendPasswordResetEmail; // Alias for consistency

  const resetPassword = async (token: string, password: string): Promise<AuthResult> => {
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;

      toast.success('Password has been reset');
      return { success: true };
    } catch (error: any) {
      toast.error('Failed to reset password', {
        description: error.message
      });
      return { success: false, error: error.message };
    }
  };

  const verifyEmail = async (token: string): Promise<AuthResult> => {
    try {
      const { error } = await supabase.auth.verifyOtp({
        token,
        type: 'email',
        email: user?.email || ''
      });

      if (error) throw error;

      toast.success('Email verified successfully');
      return { success: true };
    } catch (error: any) {
      toast.error('Failed to verify email', {
        description: error.message
      });
      return { success: false, error: error.message };
    }
  };

  const checkRole = (role: string): boolean => {
    if (!user) return false;
    
    // Check in roles array if it exists
    if (user.user_metadata?.roles) {
      return user.user_metadata.roles.includes(role);
    }
    
    // Check single role if it exists
    return user.user_metadata?.role === role;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isAuthenticated: !!user,
        isLoading,
        loading: isLoading,
        error,
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
        checkRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
