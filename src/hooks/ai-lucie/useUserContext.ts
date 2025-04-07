
import { useCallback } from 'react';
import { useAuth } from '@/hooks/auth';
import { UserContext } from './types';

export const useUserContext = () => {
  const { user } = useAuth();
  
  // Build user context based on authenticated user info
  const getUserContext = useCallback((): UserContext => {
    if (!user) return {};
    
    return {
      name: user.username,
      role: user.role,
      interests: user.user_metadata?.interests || []
    };
  }, [user]);

  return {
    getUserContext
  };
};
