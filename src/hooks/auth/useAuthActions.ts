
import { useCallback } from 'react';
import { useAuth } from './useAuthContext';

/**
 * Hook to handle auth-related actions
 */
export const useAuthActions = () => {
  const { user, signIn, signOut, updateUserProfile } = useAuth();

  const login = useCallback(async (email: string, password: string) => {
    return await signIn(email, password);
  }, [signIn]);

  const logout = useCallback(async () => {
    return await signOut();
  }, [signOut]);

  const updateProfile = useCallback(async (profileData: any) => {
    return await updateUserProfile(profileData);
  }, [updateUserProfile]);
  
  // Mock implementation for refreshProfile
  const refreshProfile = useCallback(async () => {
    console.log("Profile refresh requested");
    // This would be implemented to fetch latest profile data
  }, []);

  return {
    login,
    logout,
    updateProfile,
    refreshProfile,
    isAuthenticated: !!user,
    userId: user?.id
  };
};
