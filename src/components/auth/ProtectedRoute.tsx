
import React, { ReactNode } from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/auth/useAuthContext';
import { UserRole } from '@/types/auth';

interface ProtectedRouteProps {
  children?: ReactNode;
  requiredRole?: string;
  allowedRoles?: UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole,
  allowedRoles = []
}) => {
  const { isAuthenticated, isLoading, checkRole } = useAuth();
  const location = useLocation();

  // Show nothing while loading
  if (isLoading) {
    return null;
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location.pathname }} replace />;
  }

  // If specific role is required but user doesn't have it
  if (requiredRole && !checkRole(requiredRole)) {
    return <Navigate to="/" replace />;
  }
  
  // If allowed roles are specified, check if user has at least one of them
  if (allowedRoles.length > 0) {
    const hasRequiredRole = allowedRoles.some(role => checkRole(role));
    if (!hasRequiredRole) {
      return <Navigate to="/access-denied" replace />;
    }
  }

  // If authenticated (and has required role if specified), render children
  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
