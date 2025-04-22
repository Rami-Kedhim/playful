
import { useCallback } from 'react';
import { useAuth } from './useAuthContext';
import { User } from '@/types/auth';

export const useAuthState = () => {
  const { user } = useAuth();

  const isAdmin = useCallback((userObj: User | null) => {
    // Check if user has admin role regardless of the format
    if (!userObj || !userObj.roles) return false;
    return userObj.roles.some(role => 
      typeof role === 'string' ? role === 'admin' : role.name === 'admin'
    );
  }, []);

  const isCreator = useCallback((userObj: User | null) => {
    // Check if user has creator role regardless of the format
    if (!userObj || !userObj.roles) return false;
    return userObj.roles.some(role => 
      typeof role === 'string' ? role === 'creator' : role.name === 'creator'
    );
  }, []);

  return {
    isAdmin: isAdmin(user),
    isCreator: isCreator(user),
  };
}
