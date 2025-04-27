
import { useAuth } from './useAuthContext';

export const useRole = () => {
  const auth = useAuth();

  const hasRole = (role: string) => {
    return auth.checkRole(role);
  };

  return {
    hasRole
  };
};

export default useRole;
