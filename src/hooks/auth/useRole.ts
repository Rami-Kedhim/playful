
import { useAuth } from "./useAuthContext";
import { UserRole } from "@/types/auth";

export function useRole() {
  const { userRoles, checkRole } = useAuth();

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
