
import { useState } from 'react';
import { useAuth } from './useAuthContext';

export interface UseRoleReturn {
  isAdmin: boolean;
  isModerator: boolean;
  isContentCreator: boolean;
  isEscort: boolean;
  isClient: boolean;
  hasRole: (role: string) => boolean;
}

export const useRole = (): UseRoleReturn => {
  const { user, isAuthenticated } = useAuth();
  
  // Mock implementation - in a real app, this would come from the user object
  const [roles] = useState<string[]>(user?.roles || []);
  
  const hasRole = (role: string): boolean => {
    if (!isAuthenticated) return false;
    return roles.includes(role);
  };
  
  return {
    isAdmin: hasRole('admin'),
    isModerator: hasRole('moderator'),
    isContentCreator: hasRole('creator'),
    isEscort: hasRole('escort'),
    isClient: hasRole('client'),
    hasRole
  };
};
