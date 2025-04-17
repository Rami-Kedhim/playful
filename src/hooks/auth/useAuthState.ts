
import { useCallback } from 'react';
import { useAuth } from './useAuthContext';
import { AuthUser } from '@/types/auth';

export const useAuthState = () => {
  const { user } = useAuth();

  const isAdmin = useCallback((user: AuthUser | null) => {
    return user?.roles?.includes('admin') || false;
  }, []);

  const isCreator = useCallback((user: AuthUser | null) => {
    return user?.roles?.includes('creator') || false;
  }, []);

  return {
    isAdmin: isAdmin(user),
    isCreator: isCreator(user),
  };
}
