
import { useCallback } from 'react';
import { useAuth } from './useAuthContext';

/**
 * Hook to handle auth-related actions
 */
export const useAuthActions = () => {
  const auth = useAuth();

  const login = useCallback(async (email: string, password: string) => {
    return await auth.login(email, password);
  }, [auth]);

  const logout = useCallback(async () => {
    return await auth.logout();
  }, [auth]);

  const updateProfile = useCallback(async (profileData: any) => {
    return await auth.updateUserProfile(profileData);
  }, [auth]);
  
  // Implementation for refreshProfile
  const refreshProfile = useCallback(async () => {
    await auth.refreshProfile();
  }, [auth]);

  return {
    login,
    logout,
    updateProfile,
    refreshProfile,
    isAuthenticated: !!auth.user,
    userId: auth.user?.id
  };
};
