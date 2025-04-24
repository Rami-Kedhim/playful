
import { useMemo } from 'react';
import { useAuthContext as useAuth } from './useAuthContext';

export const useRole = () => {
  const { user } = useAuth();

  const roles = useMemo(() => {
    if (!user) return [];
    if (user.roles && Array.isArray(user.roles)) {
      return user.roles.map(role => typeof role === 'string' ? role : role.name);
    }
    if (user.role) return [user.role];
    return [];
  }, [user]);

  const hasRole = (role: string): boolean => {
    if (!user) return false;
    
    // Check in roles array if it exists
    if (user.roles && Array.isArray(user.roles)) {
      return user.roles.some(r => 
        (typeof r === 'string' && r === role) || 
        (typeof r === 'object' && r.name === role)
      );
    }
    
    // Fall back to role property if it exists
    if (user.role) {
      return user.role === role;
    }
    
    return false;
  };

  const checkRole = (role: string): boolean => {
    return hasRole(role);
  };

  const isAdmin = useMemo(() => hasRole('admin'), [user]);
  const isModerator = hasRole('moderator');
  const isUser = hasRole('user');
  const isCreator = hasRole('creator');
  const isEscort = hasRole('escort');

  const hasAllRoles = (rolesToCheck: string[]): boolean => {
    if (!user || rolesToCheck.length === 0) return false;
    return rolesToCheck.every(role => hasRole(role));
  };

  const hasAnyRole = (rolesToCheck: string[]): boolean => {
    if (!user || rolesToCheck.length === 0) return false;
    return rolesToCheck.some(role => hasRole(role));
  };

  const canAccessAdminFeatures = user ? (hasRole('admin') || hasRole('moderator')) : false;

  return {
    hasRole,
    hasAllRoles,
    hasAnyRole,
    checkRole,
    isAdmin,
    isModerator,
    isUser,
    isCreator,
    isEscort,
    roles,
    canAccessAdminFeatures
  };
};

export default useRole;
