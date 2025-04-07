
import { useAuth } from './useAuth';

/**
 * Custom hook for role-based access control
 * Provides functions to check user roles and permissions
 */
export const useRole = () => {
  const { userRoles = [] } = useAuth();
  
  /**
   * Check if user has any of the specified roles
   * @param role - A single role or array of roles to check
   * @returns boolean indicating if the user has any of the specified roles
   */
  const hasRole = (role: string | string[]) => {
    if (Array.isArray(role)) {
      return role.some(r => userRoles.includes(r));
    }
    return userRoles.includes(role);
  };
  
  /**
   * Check if user has all of the specified roles
   * @param roles - Array of roles that are required
   * @returns boolean indicating if the user has all specified roles
   */
  const hasAllRoles = (roles: string[]) => {
    return roles.every(role => userRoles.includes(role));
  };
  
  /**
   * Check if user has a specific role
   * @param role - Role to check
   * @returns boolean indicating if the user has the specified role
   */
  const checkRole = (role: string): boolean => {
    return userRoles.includes(role);
  };
  
  /**
   * Check if user is an admin
   * @returns boolean indicating if the user has admin role
   */
  const isAdmin = () => userRoles.includes('admin');
  
  /**
   * Check if user is a moderator
   * @returns boolean indicating if the user has moderator role
   */
  const isModerator = () => userRoles.includes('moderator');
  
  /**
   * Check if user is a creator
   * @returns boolean indicating if the user has creator role
   */
  const isCreator = () => userRoles.includes('creator');
  
  /**
   * Check if user is an escort
   * @returns boolean indicating if the user has escort role
   */
  const isEscort = () => userRoles.includes('escort');
  
  /**
   * Check if user can access admin features
   * @returns boolean indicating if user has admin or moderator role
   */
  const canAccessAdminFeatures = () => isAdmin() || isModerator();
  
  return {
    hasRole,
    hasAllRoles,
    checkRole, // Add the checkRole method
    isAdmin,
    isModerator,
    isCreator,
    isEscort,
    canAccessAdminFeatures,
    roles: userRoles,
  };
};

export default useRole;
