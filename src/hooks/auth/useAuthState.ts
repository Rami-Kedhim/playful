
import { useAuthContext } from './useAuthContext';

export const useAuthState = () => {
  const { 
    user, 
    profile,
    loading, 
    isLoading, 
    error, 
    isAuthenticated,
    initialized 
  } = useAuthContext();

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
