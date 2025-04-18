
import { useCallback } from "react";
import { useAuth } from "./useAuthContext";
import { UserRole } from "@/types/auth";

export const useRole = () => {
  const { user } = useAuth();
  
  // Convert string role to UserRole enum
  const getRole = (role: string): UserRole => {
    return Object.values(UserRole).includes(role as UserRole) 
      ? role as UserRole 
      : UserRole.USER;
  };
  
  const hasRole = useCallback((role: UserRole | string) => {
    if (!user || !user.roles) return false;
    
    const roleEnum = typeof role === 'string' ? getRole(role) : role;
    return user.roles.includes(roleEnum);
  }, [user]);
  
  const checkPermission = useCallback((requiredRole: UserRole | string) => {
    if (!user) return false;
    
    const roleEnum = typeof requiredRole === 'string' ? getRole(requiredRole) : requiredRole;
    
    // Admin has access to everything
    if (user.roles?.includes(UserRole.ADMIN)) return true;
    
    return user.roles?.includes(roleEnum) || false;
  }, [user]);

  // Add helper methods for common role checks
  const isAdmin = useCallback(() => {
    return hasRole(UserRole.ADMIN);
  }, [hasRole]);

  const isCreator = useCallback(() => {
    return hasRole(UserRole.CREATOR);
  }, [hasRole]);

  const isEscort = useCallback(() => {
    return hasRole(UserRole.ESCORT);
  }, [hasRole]);

  const hasAllRoles = useCallback((roles: UserRole[]) => {
    if (!user || !user.roles) return false;
    return roles.every(role => user.roles!.includes(role));
  }, [user]);

  const canAccessAdminFeatures = useCallback(() => {
    return hasRole(UserRole.ADMIN) || hasRole(UserRole.MODERATOR);
  }, [hasRole]);
  
  return { 
    hasRole, 
    checkPermission,
    isAdmin: isAdmin(),
    isCreator: isCreator(),
    isEscort: isEscort(),
    hasAllRoles,
    canAccessAdminFeatures: canAccessAdminFeatures()
  };
};
