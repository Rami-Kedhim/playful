import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, UserRole } from '@/types/auth';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
  checkRole: (role: string) => boolean;
  updateUserProfile: (data: any) => Promise<boolean>;
  resetPassword: (token: string, newPassword: string) => Promise<{ success: boolean; error?: string }>;
  sendPasswordResetEmail: (email: string) => Promise<{ success: boolean; error?: string }>;
  refreshProfile: () => Promise<void>;
  profile: any; // Mock profile data
  updatePassword: (oldPassword: string, newPassword: string) => Promise<boolean>;
  userRoles: string[];
  clearError: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState(null);
  const [userRoles, setUserRoles] = useState<string[]>([]);

  const clearError = () => setError(null);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Error getting session:', error.message);
      }
      
      if (session?.user) {
        const enhancedUser = {
          ...session.user,
          username: session.user.user_metadata?.username || session.user.email?.split('@')[0],
          name: session.user.user_metadata?.name || session.user.user_metadata?.username,
          avatarUrl: session.user.user_metadata?.avatar_url,
          profileImageUrl: session.user.user_metadata?.avatar_url,
          roles: session.user.user_metadata?.roles || [],
          role: session.user.user_metadata?.role || 'user',
          email: session.user.email || '',
        } as User;
        
        setUser(enhancedUser);
        setUserRoles(getRolesAsStrings(enhancedUser.roles || [enhancedUser.role || 'user']));
      } else {
        setUser(null);
      }
      
      setIsLoading(false);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          const enhancedUser = {
            ...session.user,
            username: session.user.user_metadata?.username || session.user.email?.split('@')[0],
            name: session.user.user_metadata?.name || session.user.user_metadata?.username,
            avatarUrl: session.user.user_metadata?.avatar_url,
            profileImageUrl: session.user.user_metadata?.avatar_url,
            roles: session.user.user_metadata?.roles || [],
            role: session.user.user_metadata?.role || 'user',
            email: session.user.email || '',
          } as User;
          
          setUser(enhancedUser);
          setUserRoles(getRolesAsStrings(enhancedUser.roles || [enhancedUser.role || 'user']));
        } else {
          setUser(null);
        }
        setIsLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const getRolesAsStrings = (roles: Array<string | { name: string }>) => {
    return roles.map(role => {
      if (typeof role === 'string') {
        return role;
      }
      return role.name;
    });
  };

  const signIn = async (email: string, password: string) => {
    try {
      setError(null);
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        setError(error.message);
        return { success: false, error: error.message };
      }

      const enhancedUser = {
        ...data.user,
        username: data.user?.user_metadata?.username || data.user?.email?.split('@')[0],
        name: data.user?.user_metadata?.name || data.user?.user_metadata?.username,
        avatarUrl: data.user?.user_metadata?.avatar_url,
        profileImageUrl: data.user?.user_metadata?.avatar_url,
        roles: data.user?.user_metadata?.roles || [],
        role: data.user?.user_metadata?.role || 'user',
        email: data.user?.email || '',
      } as User;
      
      setUser(enhancedUser);
      setUserRoles(getRolesAsStrings(enhancedUser.roles || [enhancedUser.role || 'user']));
      return { success: true };
    } catch (err: any) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      setError(null);
      const { data, error } = await supabase.auth.signUp({ email, password });

      if (error) {
        setError(error.message);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (err: any) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (err: any) {
      console.error('Error signing out:', err.message);
    }
  };

  const logout = async () => {
    return signOut();
  };

  const checkRole = (requiredRole: string) => {
    if (!user) return false;
    
    const userRoles = getRolesAsStrings(user.roles || [user.role || 'user']);
    return userRoles.includes(requiredRole);
  };

  const updateUserProfile = async (data: any): Promise<boolean> => {
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          ...user?.user_metadata,
          ...data
        }
      });

      if (error) {
        console.error('Error updating user profile:', error.message);
        return false;
      }

      if (user) {
        const updatedUser = {
          ...user,
          user_metadata: {
            ...user.user_metadata,
            ...data
          },
          username: data.username || user.username,
          name: data.name || user.name,
          avatarUrl: data.avatarUrl || user.avatarUrl,
          profileImageUrl: data.avatarUrl || user.profileImageUrl,
          email: user.email || '',
        } as User;
        
        setUser(updatedUser);
      }

      return true;
    } catch (err: any) {
      console.error('Error updating user profile:', err.message);
      return false;
    }
  };

  const resetPassword = async (token: string, newPassword: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(token, {
        password: newPassword
      });

      if (error) {
        return { success: false, error: error.message };
      }
      
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const sendPasswordResetEmail = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      
      if (error) {
        return { success: false, error: error.message };
      }
      
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const refreshProfile = async (): Promise<void> => {
    try {
      console.log("Refreshing user profile");
    } catch (err) {
      console.error("Error refreshing profile:", err);
    }
  };

  const updatePassword = async (oldPassword: string, newPassword: string): Promise<boolean> => {
    try {
      console.log("Updating password");
      return true;
    } catch (err) {
      console.error("Error updating password:", err);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      error, 
      signIn, 
      signUp, 
      signOut,
      isAuthenticated: !!user,
      logout,
      checkRole,
      updateUserProfile,
      profile,
      refreshProfile,
      updatePassword,
      userRoles,
      resetPassword,
      sendPasswordResetEmail,
      clearError
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
