
import { useCallback } from 'react';
import { useAuth } from './useAuth';

/**
 * Hook for checking user roles and permissions
 */
export const useRole = () => {
  const { userRoles } = useAuth();
  
  /**
   * Check if user has at least one of the specified roles
   */
  const hasRole = useCallback((roles: string[]): boolean => {
    if (!roles.length) return true;
    if (!userRoles.length) return false;
    
    return roles.some(role => userRoles.includes(role));
  }, [userRoles]);
  
  /**
   * Check if user has all of the specified roles
   */
  const hasAllRoles = useCallback((roles: string[]): boolean => {
    if (!roles.length) return true;
    if (!userRoles.length) return false;
    
    return roles.every(role => userRoles.includes(role));
  }, [userRoles]);
  
  return {
    hasRole,
    hasAllRoles,
    userRoles
  };
};
