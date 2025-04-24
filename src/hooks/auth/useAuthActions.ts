
import { useAuthContext } from './useAuthContext';

export const useAuthActions = () => {
  const { 
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
    deleteAccount
  } = useAuthContext();

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
    verifyEmail,
    updatePassword,
    deleteAccount
  };
};

export default useAuthActions;
