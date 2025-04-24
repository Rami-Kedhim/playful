
import { useAuthContext as useAuth } from './useAuthContext';

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
    verifyEmail,
    updatePassword,
    deleteAccount
  };
};

export default useAuthActions;
