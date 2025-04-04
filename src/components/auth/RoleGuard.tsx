
import React from 'react';
import { useAuth } from '@/hooks/auth/useAuth';
import { Navigate } from 'react-router-dom';

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
  fallbackPath = "/auth" 
}: RoleGuardProps) => {
  const { user, isLoading, userRoles } = useAuth();
  
  // Show loading state if auth is still being determined
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If no user, redirect to login
  if (!user) {
    return <Navigate to={fallbackPath} replace />;
  }
  
  // Check if user has at least one of the allowed roles
  // Handle both implementations - either userRoles array or user.role string
  let hasAllowedRole = false;
  
  if (userRoles && Array.isArray(userRoles)) {
    // If userRoles exists and is an array, check if any allowed role is in the array
    hasAllowedRole = allowedRoles.some(role => userRoles.includes(role));
  } else if (user.role) {
    // If user has a direct role property, check if it's in the allowed roles
    hasAllowedRole = allowedRoles.includes(user.role);
  }
  
  // If user doesn't have required role, redirect to fallback path
  if (!hasAllowedRole) {
    return <Navigate to={fallbackPath} replace />;
  }
  
  // User has required role, render children
  return <>{children}</>;
};

export default RoleGuard;
