
import { useAuth } from './useAuth.tsx';

/**
 * A hook that provides authentication-related actions
 */
export const useAuthActions = () => {
  const auth = useAuth();

  const login = async (email: string, password: string) => {
    return await auth.login(email, password);
  };

  const logout = async () => {
    return await auth.logout();
  };

  const updateProfile = async (userData: any) => {
    return await auth.updateUserProfile(userData);
  };
  
  const refreshProfile = async () => {
    await auth.refreshProfile();
  };
  
  const sendPasswordResetEmail = async (email: string) => {
    if (auth.sendPasswordResetEmail) {
      return await auth.sendPasswordResetEmail(email);
    }
    return { success: false, error: 'Function not implemented' };
  };

  return {
    login,
    logout,
    updateProfile,
    refreshProfile,
    sendPasswordResetEmail
  };
};

export default useAuthActions;
