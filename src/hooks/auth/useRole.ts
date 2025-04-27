
import { useAuth } from './useAuthContext';

export const useRole = () => {
  const auth = useAuth();

  const hasRole = (role: string) => {
    return auth.checkRole?.(role) || false;
  };

  const hasAnyRole = (roles: string[]) => {
    return roles.some(role => hasRole(role));
  };

  // Helper properties for common role checks
  const isAdmin = hasRole('admin');
  const isModerator = hasRole('moderator');
  const isCreator = hasRole('creator');
  const isEscort = hasRole('escort');
  
  // Get the highest role from a hierarchy
  const getHighestRole = (): string => {
    if (isAdmin) return 'admin';
    if (isModerator) return 'moderator';
    if (isCreator) return 'creator';
    if (isEscort) return 'escort';
    return 'user';
  };

  const highestRole = getHighestRole();

  return {
    hasRole,
    hasAnyRole,
    isAdmin,
    isModerator,
    isCreator,
    isEscort,
    highestRole
  };
};

export default useRole;
