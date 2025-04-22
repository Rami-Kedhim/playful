
import { useCallback } from 'react';
import { useAuth } from './useAuthContext';
import { User } from '@/types/auth';

export const useAuthState = () => {
  const { user } = useAuth();

  const isAdmin = useCallback((userObj: User | null) => {
    return userObj?.roles?.includes('admin') || false;
  }, []);

  const isCreator = useCallback((userObj: User | null) => {
    return userObj?.roles?.includes('creator') || false;
  }, []);

  return {
    isAdmin: isAdmin(user),
    isCreator: isCreator(user),
  };
}
