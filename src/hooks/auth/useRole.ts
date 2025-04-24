
import { useAuthContext } from './useAuthContext';

export const useRole = () => {
  const { user, checkRole } = useAuthContext();
  
  return {
    hasRole: checkRole,
    roles: user?.roles || [],
    userRole: user?.role || null
  };
};

export default useRole;
