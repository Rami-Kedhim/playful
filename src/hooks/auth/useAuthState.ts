
import { useAuth } from './useAuth';

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
    error,
    isAuthenticated,
    initialized
  };
};

export default useAuthState;
