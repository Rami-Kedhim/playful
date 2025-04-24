
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { 
  AuthContextType, 
  AuthResult, 
  User, 
  UserProfile 
} from '@/types/auth';
import { toast } from 'sonner';

// Create the authentication context
export const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  isAuthenticated: false,
  isLoading: true,
  loading: true,
  error: null,
  initialized: false,
  checkRole: () => false,
  login: () => Promise.resolve({ success: false }),
  logout: () => Promise.resolve(),
  signIn: () => Promise.resolve({ success: false }),
  signOut: () => Promise.resolve(),
  register: () => Promise.resolve({ success: false }),
  updateUser: () => Promise.resolve(false),
  updateUserProfile: () => Promise.resolve(false),
  updateProfile: () => Promise.resolve(false),
  loadUserProfile: () => Promise.resolve(null),
  refreshProfile: () => Promise.resolve(),
  sendPasswordResetEmail: () => Promise.resolve({ success: false }),
  resetPassword: () => Promise.resolve({ success: false }),
  requestPasswordReset: () => Promise.resolve({ success: false }),
  verifyEmail: () => Promise.resolve({ success: false }),
  updatePassword: () => Promise.resolve(false),
  deleteAccount: () => Promise.resolve(false),
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState<boolean>(false);

  // Load user on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Set up auth state change listener
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (event, session) => {
            if (session?.user) {
              setUser({
                id: session.user.id,
                email: session.user.email,
                ...session.user,
              });
              // Fetch user profile data
              try {
                const { data, error: profileError } = await supabase
                  .from('profiles')
                  .select('*')
                  .eq('id', session.user.id)
                  .single();

                if (profileError) {
                  console.error('Error fetching profile:', profileError);
                } else if (data) {
                  setProfile(data as UserProfile);
                }
              } catch (profileFetchError) {
                console.error('Error in profile fetch:', profileFetchError);
              }
            } else {
              setUser(null);
              setProfile(null);
            }
          }
        );

        // Check current session
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email,
            ...session.user,
          });
          try {
            const { data, error: profileError } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();

            if (profileError) {
              console.error('Error fetching profile:', profileError);
            } else if (data) {
              setProfile(data as UserProfile);
            }
          } catch (err) {
            console.error('Profile fetch error:', err);
          }
        }

        setInitialized(true);
        setIsLoading(false);
      } catch (err) {
        console.error('Auth initialization error:', err);
        setError(err instanceof Error ? err.message : 'Authentication error');
        setIsLoading(false);
      }
    };

    initializeAuth();

    return () => {
      // Cleanup code if needed
    };
  }, []);

  // Login with email and password
  const login = async (email: string, password: string, options?: any): Promise<AuthResult> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        toast.error(error.message);
        return { success: false, error: error.message };
      }

      if (!data?.user) {
        const errorMsg = 'Login failed. No user returned.';
        setError(errorMsg);
        toast.error(errorMsg);
        return { success: false, error: errorMsg };
      }

      toast.success('Login successful');
      return { 
        success: true, 
        user: data.user as User,
        session: data.session
      };
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Login failed';
      setError(errorMsg);
      toast.error(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setIsLoading(false);
    }
  };

  // Alias for login for backward compatibility
  const signIn = login;

  // Logout
  const logout = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        setError(error.message);
        toast.error(error.message);
        return;
      }
      
      setUser(null);
      setProfile(null);
      toast.success('You have been logged out');
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Logout failed';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  // Alias for logout for backward compatibility
  const signOut = logout;

  // Register new user
  const register = async (
    email: string, 
    password: string, 
    username?: string,
    options?: any
  ): Promise<AuthResult> => {
    try {
      setIsLoading(true);
      setError(null);

      // Register with Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
            ...options?.data
          },
          // Only include emailRedirectTo if it's provided in options
          ...(options?.emailRedirectTo && { 
            emailRedirectTo: options.emailRedirectTo 
          })
        }
      });

      if (error) {
        setError(error.message);
        toast.error(error.message);
        return { success: false, error: error.message };
      }

      if (!data?.user) {
        const errorMsg = 'Registration failed. No user returned.';
        setError(errorMsg);
        toast.error(errorMsg);
        return { success: false, error: errorMsg };
      }

      toast.success('Registration successful');
      return { 
        success: true, 
        user: data.user as User,
        session: data.session
      };
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Registration failed';
      setError(errorMsg);
      toast.error(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setIsLoading(false);
    }
  };

  // Send password reset email
  const sendPasswordResetEmail = async (email: string): Promise<AuthResult> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      
      if (error) {
        setError(error.message);
        toast.error(error.message);
        return { success: false, error: error.message };
      }

      toast.success('Password reset email sent');
      return { success: true };
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Password reset request failed';
      setError(errorMsg);
      toast.error(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setIsLoading(false);
    }
  };

  // Alias for sendPasswordResetEmail
  const requestPasswordReset = sendPasswordResetEmail;

  // Reset password with token
  const resetPassword = async (token: string, password: string): Promise<AuthResult> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { error } = await supabase.auth.updateUser({
        password
      });
      
      if (error) {
        setError(error.message);
        toast.error(error.message);
        return { success: false, error: error.message };
      }

      toast.success('Password has been reset');
      return { success: true };
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Password reset failed';
      setError(errorMsg);
      toast.error(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setIsLoading(false);
    }
  };

  // Verify email with token
  const verifyEmail = async (token: string): Promise<AuthResult> => {
    try {
      setIsLoading(true);
      setError(null);
      
      // For email verification, we need to provide both the token and email
      const { data, error } = await supabase.auth.verifyOtp({
        token,
        type: 'email',
        email: user?.email || '' // Need to provide email for verification
      });
      
      if (error) {
        setError(error.message);
        toast.error(error.message);
        return { success: false, error: error.message };
      }

      toast.success('Email verified successfully');
      return { 
        success: true, 
        user: data?.user as User || null,
        session: data?.session || null
      };
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Email verification failed';
      setError(errorMsg);
      toast.error(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setIsLoading(false);
    }
  };

  // Update user data
  const updateUser = async (data: Partial<User>): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { error } = await supabase.auth.updateUser(data);
      
      if (error) {
        setError(error.message);
        toast.error(error.message);
        return false;
      }

      // Update local user state
      setUser(prevUser => prevUser ? { ...prevUser, ...data } : null);
      
      toast.success('User information updated');
      return true;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Update user failed';
      setError(errorMsg);
      toast.error(errorMsg);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Update user profile in database
  const updateUserProfile = async (data: Partial<UserProfile>): Promise<boolean> => {
    if (!user) {
      toast.error('You must be logged in to update your profile');
      return false;
    }

    try {
      setIsLoading(true);
      setError(null);

      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', user.id);
      
      if (error) {
        setError(error.message);
        toast.error(error.message);
        return false;
      }

      // Update local profile state
      setProfile(prevProfile => prevProfile ? { ...prevProfile, ...data } : null);
      
      toast.success('Profile updated');
      return true;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Update profile failed';
      setError(errorMsg);
      toast.error(errorMsg);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Alias for updateUserProfile
  const updateProfile = updateUserProfile;

  // Load user profile data
  const loadUserProfile = async (): Promise<User | null> => {
    if (!user?.id) {
      return null;
    }

    try {
      setIsLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        setError(error.message);
        console.error('Error loading profile:', error);
        return null;
      }

      if (data) {
        setProfile(data as UserProfile);
        return { ...user, ...data } as User;
      }
      
      return user;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Load profile failed';
      setError(errorMsg);
      console.error(errorMsg);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Refresh the user's profile data
  const refreshProfile = async (): Promise<void> => {
    await loadUserProfile();
  };

  // Update user password
  const updatePassword = async (currentPassword: string, newPassword: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);

      if (!user?.email) {
        const errorMsg = 'No user is logged in';
        setError(errorMsg);
        toast.error(errorMsg);
        return false;
      }

      // First verify the current password
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: currentPassword,
      });

      if (signInError) {
        setError('Current password is incorrect');
        toast.error('Current password is incorrect');
        return false;
      }

      // Update to the new password
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        setError(error.message);
        toast.error(error.message);
        return false;
      }

      toast.success('Password updated successfully');
      return true;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Password update failed';
      setError(errorMsg);
      toast.error(errorMsg);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Delete user account
  const deleteAccount = async (): Promise<boolean> => {
    if (!user?.id) {
      toast.error('You must be logged in to delete your account');
      return false;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Delete user account from Supabase
      const { error } = await supabase.auth.admin.deleteUser(user.id);
      
      if (error) {
        setError(error.message);
        toast.error(error.message);
        return false;
      }

      // Sign out after successful deletion
      await supabase.auth.signOut();
      
      // Clear local state
      setUser(null);
      setProfile(null);
      
      toast.success('Your account has been deleted');
      return true;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Account deletion failed';
      setError(errorMsg);
      toast.error(errorMsg);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Check if user has a specific role
  const checkRole = (role: string): boolean => {
    if (!user) return false;

    // Check if user has roles array
    if (user.roles && Array.isArray(user.roles)) {
      return user.roles.some(userRole => {
        if (typeof userRole === 'string') {
          return userRole === role;
        } else if (userRole && typeof userRole === 'object') {
          return userRole.name === role;
        }
        return false;
      });
    }
    
    // Fallback to single role property
    return user.role === role;
  };

  const contextValue = {
    user,
    profile,
    isAuthenticated: !!user,
    isLoading,
    loading: isLoading, // Alias for backward compatibility
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
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default useAuth;
