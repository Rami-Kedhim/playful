import { useState, useEffect, createContext, useContext } from 'react';
import { AuthService } from '@/services/authService';
import { User, UserProfile } from '@/types/auth';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => Promise<void>;
  checkRole: (role: string | UserRole) => boolean;
  updateUserProfile: (data: any) => Promise<boolean>;
  refreshProfile: () => Promise<void>;
  resetPassword: (email: string) => Promise<any>;
  userRoles: UserRole[];
  updatePassword: (oldPassword: string, newPassword: string) => Promise<boolean>;
}

const DEFAULT_CONTEXT: AuthContextType = {
  user: null,
  profile: null,
  isLoading: true,
  isAuthenticated: false,
  error: '',
  login: async () => false,
  register: async () => false,
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
      if (result && result.success) {
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error updating password:', error);
      return false;
    }
  };

  const resetPassword = useCallback(async (email: string): Promise<any> => {
    console.log('Resetting password for:', email);
    return { success: true };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    return { success: true, user: { id: '1', email, roles: [UserRole.USER] } };
  }, []);

  const signUp = useCallback(async (email: string, password: string, name: string) => {
    return { success: true, user: { id: '1', email, roles: [UserRole.USER] } };
  }, []);

  const signOut = useCallback(async () => {
    setState(prev => ({...prev, user: null, isAuthenticated: false}));
  }, []);

  useEffect(() => {
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
        checkRole,
        userRoles,
        updateUserProfile,
        refreshProfile,
        updatePassword,
        resetPassword,
        signIn,
        signUp,
        signOut,
        profile: {
          id: '1',
          email: 'user@example.com',
          name: 'Test User',
          username: 'user'
        }
      }));
    }, 1000);
  }, [checkRole, userRoles, updateUserProfile, refreshProfile, updatePassword, resetPassword, signIn, signUp, signOut]);

  return (
    <AuthContext.Provider value={{
      ...state,
      checkRole,
      userRoles,
      updateUserProfile,
      refreshProfile,
      updatePassword,
      resetPassword,
      signIn,
      signUp,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default useAuth;
