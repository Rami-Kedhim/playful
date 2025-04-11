
import React, { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/auth/useAuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole
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

  // If role is required but user doesn't have it
  if (requiredRole && !checkRole(requiredRole)) {
    return <Navigate to="/" replace />;
  }

  // If authenticated (and has required role if specified), render children
  return <>{children}</>;
};

export default ProtectedRoute;
