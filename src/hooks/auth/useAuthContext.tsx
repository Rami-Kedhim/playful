
import { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { AuthService } from '@/services/authService';
import { User, UserProfile, UserRole, AuthResult } from '@/types/auth';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<AuthResult>;
  register: (email: string, password: string, name: string) => Promise<AuthResult>;
  logout: () => Promise<void>;
  checkRole: (role: string | UserRole) => boolean;
  updateUserProfile: (data: any) => Promise<boolean>;
  refreshProfile: () => Promise<void>;
  resetPassword: (email: string) => Promise<AuthResult>;
  userRoles: UserRole[];
  updatePassword: (oldPassword: string, newPassword: string) => Promise<boolean>;
  
  // Aliases for backward compatibility
  signIn?: (email: string, password: string) => Promise<AuthResult>;
  signUp?: (email: string, password: string, name: string) => Promise<AuthResult>;
  signOut?: () => Promise<void>;
  sendPasswordResetEmail?: (email: string) => Promise<boolean>;
}

const DEFAULT_CONTEXT: AuthContextType = {
  user: null,
  profile: null,
  isLoading: true,
  isAuthenticated: false,
  error: '',
  login: async () => ({ success: false, error: 'Not implemented' }),
  register: async () => ({ success: false, error: 'Not implemented' }),
  logout: async () => {},
  checkRole: () => false,
  updateUserProfile: async () => false,
  refreshProfile: async () => {},
  resetPassword: async () => ({ success: false, error: 'Not implemented' }),
  userRoles: [],
  updatePassword: async () => false
};

export const AuthContext = createContext<AuthContextType>(DEFAULT_CONTEXT);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthContextType>(DEFAULT_CONTEXT);

  const checkRole = useCallback((role: string | UserRole) => {
    if (!state.user || !state.user.roles) return false;
    return state.user.roles.includes(role as UserRole);
  }, [state.user]);

  const userRoles = state.user?.roles || [];

  const updateUserProfile = useCallback(async (data: any): Promise<boolean> => {
    console.log('Updating user profile with data:', data);
    return true;
  }, []);

  const refreshProfile = useCallback(async (): Promise<void> => {
    console.log('Refreshing user profile');
  }, []);

  const updatePassword = async (oldPassword: string, newPassword: string): Promise<boolean> => {
    try {
      const result = await AuthService.updatePassword(oldPassword, newPassword);
      return result.success;
    } catch (error) {
      console.error('Error updating password:', error);
      return false;
    }
  };

  const resetPassword = useCallback(async (email: string): Promise<AuthResult> => {
    try {
      return await AuthService.resetPassword(email);
    } catch (error: any) {
      console.error('Error resetting password:', error);
      return { success: false, error: error.message || 'Failed to reset password' };
    }
  }, []);

  // Method for sending password reset email (alias for resetPassword)
  const sendPasswordResetEmail = useCallback(async (email: string): Promise<boolean> => {
    const result = await resetPassword(email);
    return result.success;
  }, [resetPassword]);

  const login = useCallback(async (email: string, password: string): Promise<AuthResult> => {
    try {
      const result = await AuthService.signIn(email, password);
      
      if (result.success && result.user) {
        setState(prev => ({
          ...prev,
          user: result.user,
          isAuthenticated: true,
          error: null
        }));
      }
      
      return result;
    } catch (error: any) {
      const errorMessage = error.message || 'Login failed';
      setState(prev => ({ ...prev, error: errorMessage }));
      return { success: false, error: errorMessage };
    }
  }, []);

  const register = useCallback(async (email: string, password: string, name: string): Promise<AuthResult> => {
    try {
      const result = await AuthService.signUp(email, password, name);
      return result;
    } catch (error: any) {
      const errorMessage = error.message || 'Registration failed';
      setState(prev => ({ ...prev, error: errorMessage }));
      return { success: false, error: errorMessage };
    }
  }, []);

  const logout = useCallback(async (): Promise<void> => {
    try {
      await AuthService.signOut();
      setState(prev => ({...prev, user: null, isAuthenticated: false}));
    } catch (error: any) {
      console.error('Logout error:', error);
      setState(prev => ({ ...prev, error: error.message || 'Logout failed' }));
    }
  }, []);

  useEffect(() => {
    // Simulate fetching the user on mount
    setTimeout(() => {
      setState(prev => ({
        ...prev,
        user: {
          id: '1',
          email: 'user@example.com',
          username: 'user',
          name: 'Test User',
          roles: [UserRole.USER]
        },
        isAuthenticated: true,
        isLoading: false,
        profile: {
          id: '1',
          email: 'user@example.com',
          name: 'Test User',
          username: 'user'
        }
      }));
    }, 1000);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        checkRole,
        userRoles,
        updateUserProfile,
        refreshProfile,
        updatePassword,
        resetPassword,
        // Add compatibility aliases
        signIn: login,
        signUp: register,
        signOut: logout,
        sendPasswordResetEmail
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default useAuth;
