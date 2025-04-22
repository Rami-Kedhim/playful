
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, AuthResult, AuthContextType } from '@/types/auth';

export const useAuth = (): AuthContextType => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState<boolean>(false);

  // Load user on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          const {
            id,
            email,
            user_metadata,
            app_metadata,
          } = user;
          
          // Get additional user data from profiles table
          const { data: profileData } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', id)
            .single();
            
          // Construct user object with combined data
          const fullUser: User = {
            id,
            email: email || '',
            name: user_metadata?.full_name || profileData?.full_name,
            username: user_metadata?.username || profileData?.username,
            avatarUrl: profileData?.avatar_url,
            roles: profileData?.roles || [],
            isVerified: profileData?.is_verified || false,
            phone: user_metadata?.phone || profileData?.phone || '',
            ubxBalance: profileData?.ubx_balance || 0,
          };
          
          setUser(fullUser);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error loading user:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
        setInitialized(true);
      }
    };
    
    loadUser();
    
    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          const {
            id,
            email,
            user_metadata,
            app_metadata,
          } = session.user;
          
          // Get additional user data from profiles table
          const { data: profileData } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', id)
            .single();
            
          // Construct user object with combined data
          const fullUser: User = {
            id,
            email: email || '',
            name: user_metadata?.full_name || profileData?.full_name,
            username: user_metadata?.username || profileData?.username,
            avatarUrl: profileData?.avatar_url,
            roles: profileData?.roles || [],
            isVerified: profileData?.is_verified || false,
            phone: user_metadata?.phone || profileData?.phone || '',
            ubxBalance: profileData?.ubx_balance || 0,
          };
          
          setUser(fullUser);
        } else {
          setUser(null);
        }
        
        setIsLoading(false);
        setInitialized(true);
      }
    );
    
    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Login function
  const login = async (email: string, password: string, options?: any): Promise<AuthResult> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      });
      
      if (error) {
        setError(error.message);
        return { success: false, error: error.message };
      }
      
      // Get additional user data from profiles table
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user?.id)
        .single();
        
      // Combine with auth data
      const fullUser = data.user ? {
        ...data.user,
        ...profileData,
        // Ensure UserRole is always string
        roles: profileData?.roles?.map((role: any) => typeof role === 'string' ? role : role.name) || [],
      } : undefined;

      return { success: true, user: fullUser, session: data.session };
    } catch (err: any) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (email: string, password: string, username?: string, options?: any): Promise<AuthResult> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Register with Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
          },
        },
      });
      
      if (error) {
        setError(error.message);
        return { success: false, error: error.message };
      }

      return { success: true, user: data.user, session: data.session };
    } catch (err: any) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async (): Promise<void> => {
    await supabase.auth.signOut();
    setUser(null);
  };

  // Update user function
  const updateUser = async (data: Partial<User>): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      if (!user?.id) {
        throw new Error('User not authenticated');
      }
      
      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', user.id);
      
      if (error) {
        throw error;
      }
      
      // Update local user state
      setUser(prev => prev ? { ...prev, ...data } : null);
      
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Send password reset email
  const sendPasswordResetEmail = async (email: string): Promise<AuthResult> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      
      if (error) {
        setError(error.message);
        return { success: false, error: error.message };
      }
      
      return { success: true };
    } catch (err: any) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Reset password with token
  const resetPassword = async (token: string, password: string): Promise<AuthResult> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase.auth.updateUser({
        password
      });
      
      if (error) {
        setError(error.message);
        return { success: false, error: error.message };
      }
      
      return { success: true };
    } catch (err: any) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Load user profile
  const loadUserProfile = async (): Promise<User | null> => {
    try {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      
      if (!authUser) {
        return null;
      }
      
      // Get additional user data from profiles table
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .single();
        
      return {
        ...authUser,
        ...profileData,
      };
    } catch (error) {
      console.error('Error loading user profile:', error);
      return null;
    }
  };

  // Refresh user profile
  const refreshProfile = async (): Promise<void> => {
    try {
      const updatedUser = await loadUserProfile();
      if (updatedUser) {
        setUser(updatedUser);
      }
    } catch (error) {
      console.error('Error refreshing profile:', error);
    }
  };

  // Request password reset (alias for sendPasswordResetEmail)
  const requestPasswordReset = async (email: string): Promise<AuthResult> => {
    return sendPasswordResetEmail(email);
  };

  // Verify email
  const verifyEmail = async (token: string): Promise<AuthResult> => {
    try {
      // This would depend on your implementation
      return { success: true };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    error,
    initialized,
    login,
    logout,
    register,
    updateUser,
    loadUserProfile,
    refreshProfile,
    sendPasswordResetEmail,
    resetPassword,
    requestPasswordReset,
    verifyEmail,
  };
};

export default useAuth;
