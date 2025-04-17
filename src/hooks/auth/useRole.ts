
import { useMemo } from 'react';
import { useAuth } from './useAuthContext';
import { UserRole } from '@/types/auth';

export const useRole = () => {
  const { user } = useAuth();
  
  const userRoles = useMemo(() => {
    return user?.roles || [];
  }, [user]);

  const hasRole = (role: UserRole): boolean => {
    return userRoles.includes(role);
  };

  const isAdmin = useMemo(() => {
    return hasRole('admin');
  }, [userRoles]);

  const isCreator = useMemo(() => {
    return hasRole('creator');
  }, [userRoles]);

  const isModerator = useMemo(() => {
    return hasRole('moderator');
  }, [userRoles]);

  const isEscort = useMemo(() => {
    return hasRole('escort');
  }, [userRoles]);

  return {
    userRoles,
    hasRole,
    isAdmin,
    isCreator,
    isModerator,
    isEscort
  };
};

export default useRole;
