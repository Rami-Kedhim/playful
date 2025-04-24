
import { useAuthContext } from './useAuthContext';

export const useRole = () => {
  const { user, checkRole } = useAuthContext();
  
  // Helper functions to check common roles
  const isAdmin = checkRole('admin');
  const isCreator = checkRole('creator');
  const isEscort = checkRole('escort');
  
  return {
    hasRole: checkRole,
    roles: user?.roles || [],
    userRole: user?.role || null,
    // Common role checks
    isAdmin,
    isCreator,
    isEscort
  };
};

export default useRole;
