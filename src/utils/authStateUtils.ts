
import { User, UserRole } from '@/types/user';
import { User as AuthUser } from '@/types/auth';

/**
 * Get user roles from user object
 */
export const getUserRoles = (user: AuthUser | User): string[] => {
  if (!user) return [];
  
  // Handle array roles
  if (user.roles && Array.isArray(user.roles)) {
    return user.roles.map(role => role.toString());
  }
  
  // Handle single role
  if (user.role) {
    if (typeof user.role === 'string') {
      return [user.role];
    }
    return [user.role.toString()];
  }
  
  // Check user_metadata for roles
  if (user.user_metadata?.roles) {
    if (Array.isArray(user.user_metadata.roles)) {
      return user.user_metadata.roles;
    }
    return [user.user_metadata.roles];
  }
  
  // Check app_metadata for roles
  if (user.app_metadata?.roles) {
    if (Array.isArray(user.app_metadata.roles)) {
      return user.app_metadata.roles;
    }
    return [user.app_metadata.roles];
  }
  
  // Default role
  return ['user'];
};

/**
 * Check if user has a specific role
 */
export const hasRole = (user: User | AuthUser | null, role: string): boolean => {
  if (!user) return false;
  
  const roles = getUserRoles(user);
  return roles.includes(role);
};

/**
 * Check if user is an admin
 */
export const isAdmin = (user: User | AuthUser | null): boolean => {
  return hasRole(user, 'admin');
};

/**
 * Check if user is a moderator
 */
export const isModerator = (user: User | AuthUser | null): boolean => {
  return hasRole(user, 'moderator');
};

/**
 * Check if user is an escort
 */
export const isEscort = (user: User | AuthUser | null): boolean => {
  return hasRole(user, 'escort');
};

/**
 * Check if user has premium features
 */
export const isPremium = (user: User | AuthUser | null): boolean => {
  return hasRole(user, 'premium');
};
