
import { useCallback } from 'react';
import { useAuth } from './useAuthContext';

export const useRole = () => {
  const { user, userRoles } = useAuth();

  const hasRole = useCallback((role: string | string[]) => {
    if (!user || !userRoles) return false;
    
    if (Array.isArray(role)) {
      return role.some(r => userRoles.includes(r));
    }
    
    return userRoles.includes(role);
  }, [user, userRoles]);

  const hasAllRoles = useCallback((roles: string[]) => {
    if (!user || !userRoles) return false;
    
    return roles.every(role => userRoles.includes(role));
  }, [user, userRoles]);

  const isAdmin = useCallback(() => {
    return hasRole('admin');
  }, [hasRole]);

  const isModerator = useCallback(() => {
    return hasRole('moderator');
  }, [hasRole]);

  const isCreator = useCallback(() => {
    return hasRole('creator');
  }, [hasRole]);

  const isEscort = useCallback(() => {
    return hasRole('escort');
  }, [hasRole]);

  // Add the canAccessAdminFeatures function
  const canAccessAdminFeatures = useCallback(() => {
    return hasRole(['admin', 'moderator']);
  }, [hasRole]);

  return {
    userRoles,
    hasRole,
    hasAllRoles,
    isAdmin: isAdmin(),
    isCreator: isCreator(),
    isModerator: isModerator(),
    isEscort: isEscort(),
    canAccessAdminFeatures: canAccessAdminFeatures()
  };
};

export default useRole;
