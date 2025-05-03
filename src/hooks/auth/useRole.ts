
import { useAuth } from './useAuthContext';
import { UserRole } from '@/types/auth';

export function useRole() {
  const { user, isAuthenticated } = useAuth();
  
  const hasRole = (role: string): boolean => {
    if (!isAuthenticated || !user) return false;
    
    // First check the roles array
    if (user.roles && Array.isArray(user.roles)) {
      return user.roles.includes(role);
    }
    
    // Then check the role property
    if (user.role) {
      return user.role === role;
    }
    
    // Finally check the user_metadata
    if (user.user_metadata && user.user_metadata.role) {
      return user.user_metadata.role === role;
    }
    
    return false;
  };
  
  const hasAnyRole = (roles: string[]): boolean => {
    return roles.some(role => hasRole(role));
  };
  
  const getUserRoles = (): string[] => {
    if (!isAuthenticated || !user) return [];
    
    if (user.roles && Array.isArray(user.roles)) {
      return user.roles;
    }
    
    if (user.role) {
      return [user.role];
    }
    
    if (user.user_metadata && user.user_metadata.role) {
      return [user.user_metadata.role];
    }
    
    return ['user']; // Default role
  };

  // Get the highest priority role (admin > moderator > creator > escort > client > user)
  const getHighestRole = (): string => {
    const roles = getUserRoles();
    if (roles.includes('admin')) return 'admin';
    if (roles.includes('moderator')) return 'moderator';
    if (roles.includes('creator')) return 'creator';
    if (roles.includes('escort')) return 'escort';
    if (roles.includes('client')) return 'client';
    return 'user';
  };

  // Role-specific boolean checks for convenient conditional rendering
  const isAdmin = hasRole('admin');
  const isModerator = hasRole('moderator');
  const isCreator = hasRole('creator');
  const isEscort = hasRole('escort');
  const isClient = hasRole('client');
  
  return {
    hasRole,
    hasAnyRole,
    getUserRoles,
    highestRole: getHighestRole(),
    isAdmin,
    isModerator,
    isCreator,
    isEscort,
    isClient
  };
}

export default useRole;
