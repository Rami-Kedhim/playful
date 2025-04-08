
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/auth/useAuthContext';

interface BrainHubAccess {
  hasAccess: boolean;
  accessLevel: 'none' | 'viewer' | 'analyst' | 'admin';
  canManageModels: boolean;
  canStartTraining: boolean;
  canModifyParameters: boolean;
}

/**
 * Custom hook for managing Brain Hub access permissions
 * Integrates with the main authentication system and applies
 * specific Brain Hub access rules
 */
export function useBrainHubAuth(): BrainHubAccess {
  const { user, isAuthenticated, checkRole } = useAuth();
  const [access, setAccess] = useState<BrainHubAccess>({
    hasAccess: false,
    accessLevel: 'none',
    canManageModels: false,
    canStartTraining: false,
    canModifyParameters: false,
  });

  useEffect(() => {
    if (!isAuthenticated || !user) {
      setAccess({
        hasAccess: false,
        accessLevel: 'none',
        canManageModels: false,
        canStartTraining: false,
        canModifyParameters: false,
      });
      return;
    }

    // Determine access level based on user roles
    const isAdmin = checkRole('admin');
    const isModerator = checkRole('moderator');
    const isAnalyst = checkRole('analyst') || isAdmin;

    let accessLevel: 'none' | 'viewer' | 'analyst' | 'admin' = 'none';
    
    if (isAdmin) {
      accessLevel = 'admin';
    } else if (isModerator || isAnalyst) {
      accessLevel = 'analyst';
    } else if (isAuthenticated) {
      accessLevel = 'viewer';
    }

    setAccess({
      hasAccess: accessLevel !== 'none',
      accessLevel,
      canManageModels: accessLevel === 'admin',
      canStartTraining: accessLevel === 'admin' || accessLevel === 'analyst',
      canModifyParameters: accessLevel === 'admin',
    });
  }, [isAuthenticated, user, checkRole]);

  return access;
}

export default useBrainHubAuth;
