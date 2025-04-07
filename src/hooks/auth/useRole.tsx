
import { useAuth } from './useAuth';

export const useRole = () => {
  const { userRoles = [] } = useAuth();
  
  const hasRole = (role: string | string[]) => {
    if (Array.isArray(role)) {
      return role.some(r => userRoles.includes(r));
    }
    return userRoles.includes(role);
  };
  
  const isAdmin = () => userRoles.includes('admin');
  const isModerator = () => userRoles.includes('moderator');
  const isCreator = () => userRoles.includes('creator');
  const isEscort = () => userRoles.includes('escort');
  
  return {
    hasRole,
    isAdmin,
    isModerator,
    isCreator,
    isEscort,
    roles: userRoles,
  };
};
