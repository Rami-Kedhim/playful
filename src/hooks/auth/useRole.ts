
import { useAuthContext } from './useAuthContext';
import { UserRole, RoleObject } from '@/types/user';

export type RoleLevel = 'admin' | 'moderator' | 'creator' | 'escort' | 'user';

interface RoleUtilities {
  hasRole: (role: string) => boolean;
  hasAnyRole: (roles: string[]) => boolean;
  hasAllRoles: (roles: string[]) => boolean;
  roles: Array<string | RoleObject>;
  userRole: string | null;
  isAdmin: boolean;
  isModerator: boolean;
  isCreator: boolean;
  isEscort: boolean;
  isUser: boolean;
  highestRole: RoleLevel;
  getRoleLevel: (role: string) => number;
}

export const useRole = (): RoleUtilities => {
  const { user, checkRole } = useAuthContext();

  // Define role hierarchy (higher number = higher privilege)
  const roleLevels: Record<RoleLevel, number> = {
    admin: 5,
    moderator: 4,
    creator: 3,
    escort: 2,
    user: 1
  };

  const getRoleLevel = (role: string): number => {
    return roleLevels[role.toLowerCase() as RoleLevel] || 0;
  };

  const normalizeRole = (role: string | RoleObject): string => {
    if (typeof role === 'object' && role !== null) {
      return role.name?.toLowerCase() || '';
    }
    return String(role).toLowerCase();
  };

  const hasRole = (role: string): boolean => {
    return checkRole(role);
  };

  const hasAnyRole = (roles: string[]): boolean => {
    return roles.some(role => checkRole(role));
  };

  const hasAllRoles = (roles: string[]): boolean => {
    return roles.every(role => checkRole(role));
  };

  // Get user's highest role level
  const getHighestRole = (): RoleLevel => {
    const userRoles = user?.roles || [];
    let highestLevel = 0;
    let highestRole: RoleLevel = 'user';

    userRoles.forEach(role => {
      const normalizedRole = normalizeRole(role);
      const level = getRoleLevel(normalizedRole);
      if (level > highestLevel) {
        highestLevel = level;
        highestRole = normalizedRole as RoleLevel;
      }
    });

    return highestRole;
  };

  return {
    hasRole,
    hasAnyRole,
    hasAllRoles,
    roles: user?.roles || [],
    userRole: user?.role || null,
    isAdmin: hasRole('admin'),
    isModerator: hasRole('moderator'),
    isCreator: hasRole('creator'),
    isEscort: hasRole('escort'),
    isUser: hasRole('user'),
    highestRole: getHighestRole(),
    getRoleLevel
  };
};

export default useRole;

