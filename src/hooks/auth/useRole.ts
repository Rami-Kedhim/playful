
import { useAuth } from './useAuth';

/**
 * Hook to check user roles and permissions
 */
export const useRole = () => {
  // Get auth context from useAuth hook
  // We're using this inside the AuthProvider, so we need to check if it exists
  let userRoles: string[] = [];
  let user = null;
  
  try {
    const authContext = useAuth();
    userRoles = authContext.userRoles || [];
    user = authContext.user;
  } catch (error) {
    // If called within AuthProvider, we won't have access to the context yet
    // This is fine because the functions below check userRoles directly
  }
  
  /**
   * Check if user has at least one of the specified roles
   */
  const hasRole = (roles: string | string[]): boolean => {
    if (!userRoles.length) return false;
    
    const rolesToCheck = Array.isArray(roles) ? roles : [roles];
    return userRoles.some(role => rolesToCheck.includes(role));
  };
  
  /**
   * Check if user has all of the specified roles
   */
  const hasAllRoles = (roles: string[]): boolean => {
    if (!userRoles.length) return false;
    
    return roles.every(role => userRoles.includes(role));
  };
  
  /**
   * Check if user is an admin
   */
  const isAdmin = (): boolean => {
    return userRoles.includes('admin');
  };
  
  /**
   * Check if user has a specific role
   * For use directly in the AuthProvider
   */
  const checkRole = (role: string): boolean => {
    if (!userRoles.length) return false;
    return userRoles.includes(role);
  };
  
  return {
    hasRole,
    hasAllRoles,
    isAdmin,
    checkRole,
    userRoles
  };
};

export default useRole;
