
import React from 'react';
import { useAuth } from '@/hooks/auth/useAuth';
import { Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { isVerifiedEscort, isAdmin, isModerator, hasPermissionToAccessSeo } from '@/utils/authStateUtils';

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
  const { user, isLoading, userRoles, profile } = useAuth();
  
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
  
  // Special handling for Hermes-Oxum access (SEO)
  if (allowedRoles.includes('admin') || allowedRoles.includes('moderator')) {
    // Check if user has permission to access SEO tools
    if (hasPermissionToAccessSeo(userRoles)) {
      return <>{children}</>;
    }
  }

  // Special handling for verified escorts with membership
  if (allowedRoles.includes('escort')) {
    if (isVerifiedEscort(userRoles, profile)) {
      return <>{children}</>;
    }
  }
  
  // Check if user has at least one of the allowed roles
  const hasAllowedRole = allowedRoles.some(role => userRoles.includes(role));
  
  // If user doesn't have required role, redirect to fallback path
  if (!hasAllowedRole) {
    return <Navigate to={fallbackPath} replace />;
  }
  
  // User has required role, render children
  return <>{children}</>;
};

export default RoleGuard;
