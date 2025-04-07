
import React from 'react';
import { useAuth } from '@/hooks/auth/useAuth';
import { useRole } from '@/hooks/auth/useRole';
import { Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: string[];
  fallbackPath?: string;
}

/**
 * A component that only renders its children if the current user has one of the allowed roles
 */
const RoleGuard = ({ 
  children, 
  allowedRoles, 
  fallbackPath = "/" 
}: RoleGuardProps) => {
  const { user, isLoading, profile } = useAuth();
  const { hasRole, isAdmin, isModerator } = useRole();
  
  // Show loading state if auth is still being determined
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  // If no user, redirect to login
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  
  // Special handling for admin/moderator access
  if (allowedRoles.includes('admin') || allowedRoles.includes('moderator')) {
    if (isAdmin() || isModerator()) {
      return <>{children}</>;
    }
  }

  // Check if user has at least one of the allowed roles
  if (hasRole(allowedRoles)) {
    return <>{children}</>;
  }
  
  // If user doesn't have required role, redirect to fallback path
  return <Navigate to={fallbackPath} replace />;
};

export default RoleGuard;
