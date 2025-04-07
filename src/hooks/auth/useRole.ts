
import { useAuth } from './useAuth';

export const useRole = () => {
  const { userRoles = [] } = useAuth();
  
  /**
   * Check if user has any of the specified roles
   * @param role - A single role or array of roles to check
   * @returns boolean indicating if the user has any of the specified roles
   */
  const hasRole = (role: string | string[]): boolean => {
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
  const hasAllRoles = (roles: string[]): boolean => {
    return roles.every(role => userRoles.includes(role));
  };
  
  /**
   * Check if user is an admin
   * @returns boolean indicating if the user has admin role
   */
  const isAdmin = (): boolean => hasRole('admin');
  
  /**
   * Check if user is a moderator
   * @returns boolean indicating if the user has moderator role
   */
  const isModerator = (): boolean => hasRole('moderator');
  
  /**
   * Check if user is a creator
   * @returns boolean indicating if the user has creator role
   */
  const isCreator = (): boolean => hasRole('creator');
  
  /**
   * Check if user is an escort
   * @returns boolean indicating if the user has escort role
   */
  const isEscort = (): boolean => hasRole('escort');
  
  /**
   * Check if user can access admin features
   * @returns boolean indicating if user has admin or moderator role
   */
  const canAccessAdminFeatures = (): boolean => isAdmin() || isModerator();
  
  return {
    hasRole,
    hasAllRoles,
    isAdmin,
    isModerator,
    isCreator,
    isEscort,
    canAccessAdminFeatures,
    userRoles,
  };
};

export default useRole;
