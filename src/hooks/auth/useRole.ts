
import { useAuth } from './useAuth';

export const useRole = () => {
  const { user, userRoles } = useAuth();
  
  const hasRole = (roles: string | string[]): boolean => {
    if (!user || !userRoles.length) return false;
    
    const rolesToCheck = Array.isArray(roles) ? roles : [roles];
    return rolesToCheck.some(role => userRoles.includes(role));
  };
  
  const hasAllRoles = (roles: string[]): boolean => {
    if (!user || !userRoles.length) return false;
    
    return roles.every(role => userRoles.includes(role));
  };
  
  const isAdmin = (): boolean => {
    return hasRole('admin');
  };
  
  return {
    hasRole,
    hasAllRoles,
    isAdmin,
    userRoles
  };
};

export default useRole;
