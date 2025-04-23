
import { useCallback } from 'react';
import { useAuth } from './useAuthContext';
import { User } from '@/types/auth';

export const useAuthState = () => {
  const { user } = useAuth();

  const isAdmin = useCallback((userObj: User | null) => {
    // Check if user has admin role regardless of the format
    if (!userObj || !userObj.roles) return false;
    return userObj.roles.some(role => {
      if (typeof role === 'string') return role === 'admin';
      return role?.name === 'admin';
    });
  }, []);

  const isCreator = useCallback((userObj: User | null) => {
    // Check if user has creator role regardless of the format
    if (!userObj || !userObj.roles) return false;
    return userObj.roles.some(role => {
      if (typeof role === 'string') return role === 'creator';
      return role?.name === 'creator';
    });
  }, []);

  const isEscort = useCallback((userObj: User | null) => {
    // Check if user has escort role regardless of the format
    if (!userObj || !userObj.roles) return false;
    return userObj.roles.some(role => {
      if (typeof role === 'string') return role === 'escort';
      return role?.name === 'escort';
    });
  }, []);

  return {
    isAdmin: user ? isAdmin(user as User) : false,
    isCreator: user ? isCreator(user as User) : false,
    isEscort: user ? isEscort(user as User) : false,
    user
  };
};
