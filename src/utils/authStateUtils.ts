
import { AuthUser, UserRole } from '@/types/auth';

// Check if a user has a specific role
export const hasRole = (userRoles: string[], role: UserRole): boolean => {
  return userRoles.includes(role);
};

// Check if a user is an admin
export const isAdmin = (userRoles: string[]): boolean => {
  return hasRole(userRoles, 'admin');
};

// Check if a user is a moderator
export const isModerator = (userRoles: string[]): boolean => {
  return hasRole(userRoles, 'moderator');
};

// Check if a user is a verified escort
export const isVerifiedEscort = (userRoles: string[], profile: any): boolean => {
  return hasRole(userRoles, 'escort') && profile?.isVerified === true;
};

// Check if user has permission to access SEO tools
export const hasPermissionToAccessSeo = (userRoles: string[]): boolean => {
  return isAdmin(userRoles) || isModerator(userRoles);
};

// Fetch user roles (mock implementation)
export const fetchUserRoles = async (userId: string): Promise<string[]> => {
  // In a real app, this would fetch roles from the database
  // For now, return a default role based on user ID
  if (userId === '1') {
    return ['admin'];
  }
  return ['user'];
};

// Get user roles from user object
export const getUserRoles = (user: AuthUser | null): string[] => {
  if (!user) return [];
  return user.role ? [user.role] : ['user'];
};
