
import { useMemo } from 'react';
import { useAuth } from './useAuthContext';
import { UserRole } from '@/types/auth';

interface UseRoleReturn {
  hasRole: (role: string) => boolean;
  hasAllRoles: (roles: string[]) => boolean;
  hasAnyRole: (roles: string[]) => boolean;
  isAdmin: boolean;
  isModerator: boolean;
  isUser: boolean;
  isCreator: boolean;
  isEscort: boolean;
  roles: string[];
  canAccessAdminFeatures: boolean; // Added missing property
}

export const useRole = (): UseRoleReturn => {
  const { user, checkRole } = useAuth();
  
  // Extract roles array from user
  const roles = useMemo(() => {
    if (!user) return [];
    
    if (user.roles && Array.isArray(user.roles)) {
      return user.roles;
    }
    
    return user.role ? [user.role] : [];
  }, [user]);
  
  // Check if user has a specific role
  const hasRole = (role: string): boolean => {
    if (!user) return false;
    return checkRole(role);
  };
  
  // Check if user has admin role (shorthand)
  const isAdmin = useMemo(() => {
    return hasRole(UserRole.ADMIN);
  }, [user, checkRole]);
  
  // Check if user has all of the specified roles
  const hasAllRoles = (rolesToCheck: string[]): boolean => {
    if (!user || rolesToCheck.length === 0) return false;
    return rolesToCheck.every(role => hasRole(role));
  };
  
  // Check if user has any of the specified roles
  const hasAnyRole = (rolesToCheck: string[]): boolean => {
    if (!user || rolesToCheck.length === 0) return false;
    return rolesToCheck.some(role => hasRole(role));
  };
  
  // Check if user can access admin features - admin or moderator
  const canAccessAdminFeatures = useMemo(() => {
    return hasRole(UserRole.ADMIN) || hasRole(UserRole.MODERATOR);
  }, [hasRole]);
  
  return {
    hasRole,
    hasAllRoles,
    hasAnyRole,
    isAdmin,
    isModerator: hasRole(UserRole.MODERATOR),
    isUser: hasRole(UserRole.USER),
    isCreator: hasRole(UserRole.CREATOR),
    isEscort: hasRole(UserRole.ESCORT),
    roles,
    canAccessAdminFeatures
  };
};

export default useRole;
