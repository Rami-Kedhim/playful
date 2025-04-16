
import { UserRole } from '@/types/auth';

/**
 * Check if the current user has admin privileges
 */
export const isAdmin = (roles: UserRole[] = []): boolean => {
  return roles.includes('admin');
};

/**
 * Check if the current user has moderator privileges
 */
export const isModerator = (roles: UserRole[] = []): boolean => {
  return roles.includes('moderator');
};

/**
 * Check if the current user has escort privileges
 */
export const isEscort = (roles: UserRole[] = []): boolean => {
  return roles.includes('escort');
};

/**
 * Check if the current user has specific role
 */
export const hasRole = (roles: UserRole[] = [], role: UserRole): boolean => {
  return roles.includes(role);
};
