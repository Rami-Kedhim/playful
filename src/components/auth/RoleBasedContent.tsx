
import React from 'react';
import { useRole } from '@/hooks/auth/useRole';

interface RoleBasedContentProps {
  children: React.ReactNode;
  allowedRoles: string[];
  fallback?: React.ReactNode;
}

/**
 * Component for conditionally rendering content based on user roles
 * Unlike RoleGuard, this doesn't handle navigation - it just manages content visibility
 */
const RoleBasedContent = ({
  children,
  allowedRoles,
  fallback
}: RoleBasedContentProps) => {
  const { hasAnyRole } = useRole();

  if (hasAnyRole(allowedRoles)) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  return null;
};

export default RoleBasedContent;
