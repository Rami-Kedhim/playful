
import { useState } from 'react';
import { useAuth } from './useAuthContext';
import { UserRole } from '@/types/auth';

export interface UseRoleReturn {
  isAdmin: boolean;
  isModerator: boolean;
  isContentCreator: boolean;
  isEscort: boolean;
  isClient: boolean;
  isCreator: boolean;
  hasRole: (role: string) => boolean;
  hasAnyRole: (roles: string[]) => boolean;
  highestRole: string;
}

export const useRole = (): UseRoleReturn => {
  const { user, isAuthenticated } = useAuth();
  
  // Convert complex UserRole array to simple string array
  const getRoleStrings = (roles: UserRole[] | undefined): string[] => {
    if (!roles) return [];
    
    return roles.map(role => {
      if (typeof role === 'string') {
        return role;
      }
      return role.name;
    });
  };
  
  // Mock implementation - in a real app, this would come from the user object
  const [roleStrings] = useState<string[]>(getRoleStrings(user?.roles as UserRole[]));
  
  const hasRole = (role: string): boolean => {
    if (!isAuthenticated) return false;
    return roleStrings.includes(role);
  };
  
  const hasAnyRole = (roleList: string[]): boolean => {
    if (!isAuthenticated) return false;
    return roleList.some(role => roleStrings.includes(role));
  };

  // Determine the highest role based on a hierarchy
  const determineHighestRole = (): string => {
    if (hasRole('admin')) return 'Admin';
    if (hasRole('moderator')) return 'Moderator';
    if (hasRole('creator')) return 'Creator';
    if (hasRole('escort')) return 'Escort';
    if (hasRole('client')) return 'Client';
    return 'User';
  };
  
  return {
    isAdmin: hasRole('admin'),
    isModerator: hasRole('moderator'),
    isContentCreator: hasRole('creator'),
    isCreator: hasRole('creator'),
    isEscort: hasRole('escort'),
    isClient: hasRole('client'),
    hasRole,
    hasAnyRole,
    highestRole: determineHighestRole()
  };
};

export default useRole;
