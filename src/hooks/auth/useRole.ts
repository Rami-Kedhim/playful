
import { useAuth } from './useAuthContext';

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
  
  return {
    hasRole,
    getUserRoles,
  };
}

export default useRole;
