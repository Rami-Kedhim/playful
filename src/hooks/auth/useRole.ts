
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
  
  return { hasRole, checkPermission };
};
