
import { useAuth } from './useAuthContext';

export const useAuthState = () => {
  const { 
    user, 
    profile,
    loading, 
    isLoading, 
    error, 
    isAuthenticated,
    initialized 
  } = useAuth();

  return {
    user,
    profile,
    isLoading,
    loading,
    error,
    isAuthenticated,
    initialized
  };
};

export default useAuthState;
