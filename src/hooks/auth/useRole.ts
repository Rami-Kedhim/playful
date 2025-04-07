
import { useAuth } from './useAuth';

export const useRole = () => {
  const auth = useAuth();
  
  /**
   * Check if the user has at least one of the provided roles
   */
  const hasRole = (roles: string | string[]): boolean => {
    if (!auth.userRoles || auth.userRoles.length === 0) return false;
    
    const rolesToCheck = Array.isArray(roles) ? roles : [roles];
    return rolesToCheck.some(role => auth.userRoles.includes(role));
  };
  
  /**
   * Check if the user has all of the provided roles
   */
  const hasAllRoles = (roles: string[]): boolean => {
    if (!auth.userRoles || auth.userRoles.length === 0) return false;
    
    return roles.every(role => auth.userRoles.includes(role));
  };
  
  /**
   * Check if the user is an admin
   */
  const isAdmin = (): boolean => {
    return hasRole('admin');
  };
  
  /**
   * Check if the user is a moderator
   */
  const isModerator = (): boolean => {
    return hasRole('moderator');
  };
  
  /**
   * Check if the user is a creator
   */
  const isCreator = (): boolean => {
    return hasRole('creator');
  };
  
  return {
    hasRole,
    hasAllRoles,
    isAdmin,
    isModerator,
    isCreator
  };
};

export default useRole;
