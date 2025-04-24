
import { useAuth } from './useAuth';

export const useAuthActions = () => {
  const { 
    signIn,
    signOut,
    login,
    logout,
    register,
    updateUser,
    updateUserProfile,
    updateProfile,
    loadUserProfile,
    refreshProfile,
    sendPasswordResetEmail,
    resetPassword,
    requestPasswordReset,
    verifyEmail
  } = useAuth();

  return {
    signIn,
    signOut,
    login,
    logout,
    register,
    updateUser,
    updateUserProfile,
    updateProfile,
    loadUserProfile,
    refreshProfile,
    sendPasswordResetEmail,
    resetPassword,
    requestPasswordReset,
    verifyEmail
  };
};

export default useAuthActions;
