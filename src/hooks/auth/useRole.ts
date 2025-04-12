import { useAuth } from "./useAuthContext";
import { UserRole } from "@/types/auth";

export function useRole() {
  const auth = useAuth();
  
  // Get userRoles with a fallback
  const userRoles = auth.userRoles ?? [];
  
  // Create a local checkRole function if it doesn't exist in auth context
  const checkRole = (role: string): boolean => {
    // If auth provides a checkRole function, use that
    if (typeof auth.checkRole === 'function') {
      return auth.checkRole(role);
    }
    
    // Otherwise, check if the role exists in userRoles array
    return userRoles.includes(role);
  };

  const hasRole = (role: UserRole | UserRole[]): boolean => {
    if (Array.isArray(role)) {
      return role.some(r => checkRole(r));
    }
    return checkRole(role);
  };

  const hasAllRoles = (roles: UserRole[]): boolean => {
    return roles.every(role => checkRole(role));
  };

  const isAdmin = (): boolean => {
    return checkRole('admin');
  };

  const isModerator = (): boolean => {
    return checkRole('moderator');
  };

  const isEscort = (): boolean => {
    return checkRole('escort');
  };

  const isCreator = (): boolean => {
    return checkRole('creator');
  };

  const canAccessAdminFeatures = (): boolean => {
    return isAdmin() || isModerator();
  };

  return {
    roles: userRoles,
    hasRole,
    hasAllRoles,
    isAdmin,
    isModerator,
    isEscort,
    isCreator,
    canAccessAdminFeatures
  };
}

export default useRole;
