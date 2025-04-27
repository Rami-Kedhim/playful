
import { useAuth } from './useAuthContext';

export const useAuthActions = () => {
  const auth = useAuth();

  // Extract only methods that exist in the auth context
  return {
    login: auth.login,
    logout: auth.logout,
    signIn: auth.signIn,
    signOut: auth.signOut,
    register: auth.register,
    updatePassword: auth.updatePassword,
    deleteAccount: auth.deleteAccount,
    
    // Optional methods that might not be available in all contexts
    updateUser: auth.updateUser,
    updateUserProfile: auth.updateUserProfile,
    updateProfile: auth.updateProfile,
    loadUserProfile: auth.loadUserProfile,
    refreshProfile: auth.refreshProfile,
    sendPasswordResetEmail: auth.sendPasswordResetEmail,
    resetPassword: auth.resetPassword,
    requestPasswordReset: auth.requestPasswordReset,
    verifyEmail: auth.verifyEmail
  };
};

export default useAuthActions;
