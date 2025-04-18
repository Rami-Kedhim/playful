
import { UserRole } from '@/types/auth';

/**
 * Check if the current user has admin privileges
 */
export const isAdmin = (roles: UserRole[] | string[] = []): boolean => {
  return roles.includes(UserRole.ADMIN) || roles.includes('admin');
};

/**
 * Check if the current user has moderator privileges
 */
export const isModerator = (roles: UserRole[] | string[] = []): boolean => {
  return roles.includes(UserRole.MODERATOR) || roles.includes('moderator');
};

/**
 * Check if the current user has escort privileges
 */
export const isEscort = (roles: UserRole[] | string[] = []): boolean => {
  return roles.includes(UserRole.ESCORT) || roles.includes('escort');
};

/**
 * Check if the current user has specific role
 */
export const hasRole = (roles: UserRole[] | string[] = [], role: UserRole | string): boolean => {
  return roles.includes(role);
};
