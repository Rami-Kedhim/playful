
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
  const hasRole = useCallback((roles: string | string[]): boolean => {
    if (Array.isArray(roles)) {
      if (!roles.length) return true;
      if (!userRoles.length) return false;
      
      return roles.some(role => userRoles.includes(role));
    }
    return userRoles.includes(roles);
  }, [userRoles]);
  
  /**
   * Check if user has all of the specified roles
   */
  const hasAllRoles = useCallback((roles: string[]): boolean => {
    if (!roles.length) return true;
    if (!userRoles.length) return false;
    
    return roles.every(role => userRoles.includes(role));
  }, [userRoles]);
  
  /**
   * Check if user is an admin
   */
  const isAdmin = useCallback((): boolean => {
    return userRoles.includes('admin');
  }, [userRoles]);
  
  /**
   * Check if user is a moderator
   */
  const isModerator = useCallback((): boolean => {
    return userRoles.includes('moderator');
  }, [userRoles]);
  
  /**
   * Check if user is a creator
   */
  const isCreator = useCallback((): boolean => {
    return userRoles.includes('creator');
  }, [userRoles]);
  
  /**
   * Check if user is an escort
   */
  const isEscort = useCallback((): boolean => {
    return userRoles.includes('escort');
  }, [userRoles]);
  
  /**
   * Check if user can access admin features
   */
  const canAccessAdminFeatures = useCallback((): boolean => {
    return isAdmin() || isModerator();
  }, [isAdmin, isModerator]);
  
  return {
    hasRole,
    hasAllRoles,
    isAdmin,
    isModerator,
    isCreator,
    isEscort,
    canAccessAdminFeatures,
    roles: userRoles,
  };
};
