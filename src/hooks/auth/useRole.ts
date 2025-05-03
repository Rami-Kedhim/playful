
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
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
  
  // Helper function to convert complex role objects to string array
  const getRoleStrings = (userRoles?: UserRole[] | string[] | string): string[] => {
    if (!userRoles) return [];
    
    // If it's a single string
    if (typeof userRoles === 'string') {
      return [userRoles];
    }
    
    // If it's an array
    if (Array.isArray(userRoles)) {
      return userRoles.map(role => {
        if (typeof role === 'string') {
          return role;
        }
        // If role is an object with name property
        if (typeof role === 'object' && role !== null && 'name' in role) {
          return role.name;
        }
        return '';
      }).filter(Boolean);
    }
    
    return [];
  };
  
  const [roleStrings, setRoleStrings] = useState<string[]>([]);
  
  useEffect(() => {
    if (user?.roles) {
      setRoleStrings(getRoleStrings(user.roles));
    } else {
      setRoleStrings([]);
    }
  }, [user]);
  
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
