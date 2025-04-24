import { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { AuthResult, AuthState, User, UserProfile } from '@/types/auth';
import { toast } from 'sonner';

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const session = supabase.auth.getSession();

    supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select(`*`)
          .eq('id', session.user.id)
          .single();

        if (error) {
          console.error("Error fetching profile:", error);
          setError(error.message);
        }

        setUser({
          ...session.user,
          ...profile,
          session
        });
      } else {
        setUser(null);
      }
    });
  }, []);

  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);
      try {
        const { data: { session } } = await supabase.auth.getSession();

        if (session?.user) {
          const { data: profile, error } = await supabase
            .from('profiles')
            .select(`*`)
            .eq('id', session.user.id)
            .single();

          if (error) {
            console.error("Error fetching profile:", error);
            setError(error.message);
          }

          setUser({
            ...session.user,
            ...profile,
            session
          });
        }
      } catch (e: any) {
        setError(e.message);
      } finally {
        setIsLoading(false);
        setInitialized(true);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password?: string, options?: any): Promise<AuthResult> => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: password || ''
      });

      if (error) {
        setError(error.message);
        return { success: false, error: error.message };
      }

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select(`*`)
        .eq('id', data.user?.id)
        .single();

      if (profileError) {
        console.error("Error fetching profile:", profileError);
        setError(profileError.message);
        return { success: false, error: profileError.message };
      }

      setUser({
        ...data.user,
        ...profile,
        session: data.session
      });

      return { success: true, user: data.user, session: data.session };
    } catch (e: any) {
      setError(e.message);
      return { success: false, error: e.message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        setError(error.message);
        toast({
          title: "Error signing out",
          description: "Please try again.",
          variant: "destructive",
        });
      }
      setUser(null);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password?: string, options?: any): Promise<AuthResult> => {
    return login(email, password, options);
  };

  const signOut = async (): Promise<void> => {
    return logout();
  };

  const register = async (email: string, password?: string, username?: string, options: any = {}): Promise<AuthResult> => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: username || options.username,
            ...options.data
          },
          ...options
        },
      });

      if (error) {
        setError(error.message);
        return { success: false, error: error.message };
      }

      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            { id: data.user.id, email, username: username || email.split('@')[0] }
          ]);

        if (profileError) {
          console.error("Error creating profile:", profileError);
          setError(profileError.message);
          return { success: false, error: profileError.message };
        }
      }

      return { success: true, user: data.user, session: data.session };
    } catch (e: any) {
      setError(e.message);
      return { success: false, error: e.message };
    } finally {
      setIsLoading(false);
    }
  };

  const loadUserProfile = async (): Promise<User | null> => {
    if (!user?.id) return null;

    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select(`*`)
        .eq('id', user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        return null;
      }

      setUser({
        ...user,
        ...profile
      });

      return {
        ...user,
        ...profile
      };
    } catch (error) {
      console.error("Error in loadUserProfile:", error);
      return null;
    }
  };

  const updateUser = async (data: Partial<User>): Promise<boolean> => {
    if (!user) return false;

    try {
      // For email updates, use Supabase auth updateUser
      if (data.email && data.email !== user.email) {
        const { error: emailError } = await supabase.auth.updateUser({
          email: data.email
        });

        if (emailError) {
          console.error("Error updating email:", emailError);
          return false;
        }
      }

      // For other profile updates
      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', user.id);

      if (error) {
        console.error("Error updating profile:", error);
        return false;
      }

      // Update local state
      setUser(current => current ? { ...current, ...data } : null);
      
      return true;
    } catch (error) {
      console.error("Error in updateUser:", error);
      return false;
    }
  };

  const updateProfile = async (data: Partial<UserProfile>): Promise<boolean> => {
    if (!user) return false;

    try {
      // Handle email updates through auth
      if (data.email && data.email !== user.email) {
        const { error: emailError } = await supabase.auth.updateUser({
          email: data.email
        });

        if (emailError) {
          console.error("Error updating email:", emailError);
          return false;
        }
      }

      // Update profile in the profiles table
      const { error } = await supabase
        .from('profiles')
        .update({
          ...data,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) {
        console.error("Error updating profile:", error);
        return false;
      }

      // Update local state
      setUser(current => current ? { ...current, ...data } : null);
      
      return true;
    } catch (error) {
      console.error("Error in updateProfile:", error);
      return false;
    }
  };

  const updateUserProfile = updateProfile; // Alias for backward compatibility

  const refreshProfile = async (): Promise<void> => {
    if (!user?.id) return;
    await loadUserProfile();
  };

  const sendPasswordResetEmail = async (email: string): Promise<AuthResult> => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) {
        setError(error.message);
        return { success: false, error: error.message };
      }

      return { success: true, redirectTo: '/auth/reset-password' };
    } catch (e: any) {
      setError(e.message);
      return { success: false, error: e.message };
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (token: string, password: string): Promise<AuthResult> => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.updateUser({
        password: password,
      })

      if (error) {
        setError(error.message);
        return { success: false, error: error.message };
      }

      return { success: true, user: data.user };
    } catch (e: any) {
      setError(e.message);
      return { success: false, error: e.message };
    } finally {
      setIsLoading(false);
    }
  };

  const requestPasswordReset = async (email: string): Promise<AuthResult> => {
    return sendPasswordResetEmail(email);
  };

  const verifyEmail = async (token: string): Promise<AuthResult> => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        token,
        type: 'email'
      })

      if (error) {
        setError(error.message);
        return { success: false, error: error.message };
      }

      return { success: true, user: data.user };
    } catch (e: any) {
      setError(e.message);
      return { success: false, error: e.message };
    } finally {
      setIsLoading(false);
    }
  };

  const updatePassword = async (currentPassword: string, newPassword: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
  
    try {
      // First verify the current password by attempting to sign in
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user?.email || '',
        password: currentPassword,
      });
  
      if (signInError) {
        setError("Current password is incorrect");
        return false;
      }
  
      // Now update to the new password
      const { data, error } = await supabase.auth.updateUser({ 
        password: newPassword 
      });
  
      if (error) {
        setError(error.message);
        return false;
      }
  
      toast({
        title: "Password updated",
        description: "Your password has been updated successfully",
      });
  
      return true;
    } catch (error: any) {
      const errorMessage = error.message || "Failed to update password";
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const checkRole = (role: string) => {
    if (!user || !user.roles) {
      return false;
    }

    if (typeof user.roles === 'string') {
      return user.roles === role;
    }

    if (Array.isArray(user.roles)) {
      return user.roles.some(userRole => {
        if (typeof userRole === 'string') {
          return userRole === role;
        } else if (typeof userRole === 'object' && userRole !== null && 'name' in userRole) {
          return userRole.name === role;
        }
        return false;
      });
    }

    return false;
  };

  return (
    <AuthContext.Provider value={{
      user,
      profile: user as UserProfile,
      isAuthenticated: !!user,
      isLoading,
      loading: isLoading,
      error,
      initialized,
      checkRole,
      login,
      logout,
      signIn: login,
      signOut: logout,
      register,
      updateUser,
      updateProfile,
      updateUserProfile,
      loadUserProfile,
      refreshProfile,
      resetPassword,
      sendPasswordResetEmail: requestPasswordReset,
      requestPasswordReset,
      verifyEmail,
      updatePassword,
      session: user?.session || null
    }}>
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
