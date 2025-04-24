import { useState, useEffect, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { User, UserProfile, AuthResult, AuthContextType } from '@/types/auth';
import { toast } from 'sonner';
import { useProfileManagement } from './useProfileManagement';

interface AuthProviderProps {
  children: React.ReactNode;
}

// Create authentication context
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to access authentication context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Authentication provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { updateProfile, fetchProfile, isLoading: profileLoading } = useProfileManagement();

  useEffect(() => {
    const session = supabase.auth.getSession();

    supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        setUser(session.user);
        await loadUserProfile(session.user.id);
      } else {
        setUser(null);
        setProfile(null);
      }
    });
  }, []);

  useEffect(() => {
    const initializeAuth = async () => {
      setLoading(true);
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setUser(user);
          await loadUserProfile(user.id);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to initialize auth');
      } finally {
        setLoading(false);
        setInitialized(true);
      }
    };

    initializeAuth();
  }, []);

  const checkRole = (role: string): boolean => {
    return user?.role === role;
  };

  const login = async (email: string, password: string, options?: any): Promise<AuthResult> => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        toast.error(error.message);
        return { success: false, error: error.message };
      }
      
      setUser(data.user);
      await loadUserProfile(data.user.id);
      
      toast.success('Login successful!');
      return { success: true, user: data.user, session: data.session };
    } catch (err: any) {
      toast.error(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, username?: string, options?: any): Promise<AuthResult> => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: username,
          }
        }
      });
      
      if (error) {
        toast.error(error.message);
        return { success: false, error: error.message };
      }
      
      setUser(data.user);
      
      // Create a user profile in the profiles table
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([{ 
          id: data.user.id, 
          email: data.user.email || email,
          username: username
        }]);
      
      if (profileError) {
        console.error("Error creating user profile:", profileError);
        toast.error('Failed to create user profile. Please contact support.');
        return { success: false, error: 'Failed to create user profile.' };
      }
      
      await loadUserProfile(data.user.id);
      
      toast.success('Registration successful! Please check your email to verify your account.');
      return { success: true, user: data.user };
    } catch (err: any) {
      toast.error(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async (): Promise<void> => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      setUser(null);
      setProfile(null);
      navigate('/auth');
      toast.success('Logged out successfully!');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const sendPasswordResetEmail = async (email: string): Promise<AuthResult> => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) {
        toast.error(error.message);
        return { success: false, error: error.message };
      }
      toast.success('Password reset email sent!');
      return { success: true, redirectTo: data.url };
    } catch (err: any) {
      toast.error(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (token: string, password: string): Promise<AuthResult> => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.updateUser({ password });
      if (error) {
        toast.error(error.message);
        return { success: false, error: error.message };
      }
      
      // Also sign in the user after reset
      const { error: signInError } = await supabase.auth.signInWithOtp({ token, type: 'recovery' });
      if (signInError) {
        toast.error(signInError.message);
        return { success: false, error: signInError.message };
      }
      
      toast.success('Password reset successful!');
      return { success: true, user: data.user };
    } catch (err: any) {
      toast.error(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const requestPasswordReset = async (email: string): Promise<AuthResult> => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      });
      if (error) {
        toast.error(error.message);
        return { success: false, error: error.message };
      }
      toast.success('Password reset email sent!');
      return { success: true, redirectTo: data.url };
    } catch (err: any) {
      toast.error(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const verifyEmail = async (token: string): Promise<AuthResult> => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.verifyOtp({ token, type: 'email' });
      if (error) {
        toast.error(error.message);
        return { success: false, error: error.message };
      }
      
      setUser(data.user);
      await loadUserProfile(data.user.id);
      
      toast.success('Email verified successfully!');
      return { success: true, user: data.user };
    } catch (err: any) {
      toast.error(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (data: Partial<User>): Promise<boolean> => {
    setLoading(true);
    try {
      const { data: response, error } = await supabase.auth.updateUser(data);
      if (error) {
        toast.error(error.message);
        return false;
      }
      setUser(response.user);
      toast.success('User updated successfully!');
      return true;
    } catch (err: any) {
      toast.error(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const loadUserProfile = async (userId: string): Promise<User | null> => {
    try {
      const fetchedProfile = await fetchProfile(userId);
      if (fetchedProfile) {
        setProfile(fetchedProfile);
        return user;
      } else {
        console.warn("No profile found for user:", userId);
        return null;
      }
    } catch (error) {
      console.error("Error loading user profile:", error);
      return null;
    }
  };
  
  const refreshProfile = async (): Promise<void> => {
    if (user?.id) {
      await loadUserProfile(user.id);
    }
  };

  const updatePassword = async (currentPassword: string, newPassword: string): Promise<boolean> => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) {
        toast.error(error.message);
        return false;
      }
      toast.success('Password updated successfully!');
      return true;
    } catch (err: any) {
      toast.error(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Inside the AuthProvider component
const deleteAccount = async (): Promise<boolean> => {
  try {
    // First check if the user is authenticated
    if (!user) {
      toast.error('You must be logged in to delete your account');
      return false;
    }
    
    // Delete user account
    const { error } = await supabase.auth.admin.deleteUser(user.id);
    
    if (error) {
      console.error('Error deleting account:', error);
      throw error;
    }
    
    // Sign out after successful deletion
    await signOut();
    return true;
  } catch (error) {
    console.error('Error deleting account:', error);
    return false;
  }
};

  // Make sure to add deleteAccount to the authContext value
const value: AuthContextType = {
  user,
  profile,
  isAuthenticated: !!user,
  isLoading: loading,
  loading: profileLoading,
  error,
  initialized,
  checkRole,
  login,
  logout: signOut,
  signIn: login,
  signOut,
  register,
  updateUser,
  updateUserProfile: updateProfile,
  updateProfile,
  loadUserProfile,
  refreshProfile,
  sendPasswordResetEmail,
  resetPassword,
  requestPasswordReset,
  verifyEmail,
  updatePassword,
  deleteAccount,
  session: supabase.auth.getSession
};

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
