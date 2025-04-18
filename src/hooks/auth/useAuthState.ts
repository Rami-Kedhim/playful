
import { useCallback } from 'react';
import { useAuth } from './useAuthContext';
import { AuthUser, UserRole } from '@/types/auth';

export const useAuthState = () => {
  const { user } = useAuth();

  const isAdmin = useCallback((user: AuthUser | null) => {
    return user?.roles?.includes(UserRole.ADMIN) || false;
  }, []);

  const isCreator = useCallback((user: AuthUser | null) => {
    return user?.roles?.includes(UserRole.CREATOR) || false;
  }, []);

  return {
    isAdmin: isAdmin(user),
    isCreator: isCreator(user),
  };
}
