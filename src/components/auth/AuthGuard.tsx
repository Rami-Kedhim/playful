import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/auth';
import { Loader2 } from 'lucide-react';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requiredRoles?: string[];
  redirectTo?: string;
}

const AuthGuard: React.FC<AuthGuardProps> = ({
  children,
  requireAuth = true,
  requiredRoles = [],
  redirectTo = '/auth'
}) => {
  const { isAuthenticated, isLoading, checkRole } = useAuth();
  const location = useLocation();

  // If still loading auth state, show loading spinner
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="mt-2 text-muted-foreground">Loading authentication...</p>
        </div>
      </div>
    );
  }

  // If authentication is required but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    // Redirect to login page with return URL
    return <Navigate to={`${redirectTo}?from=${encodeURIComponent(location.pathname)}`} replace />;
  }

  // If specific roles are required, check if the user has at least one of them
  if (requireAuth && isAuthenticated && requiredRoles.length > 0) {
    const hasRequiredRole = requiredRoles.some(role => checkRole(role));
    
    if (!hasRequiredRole) {
      // User doesn't have the required role
      return <Navigate to="/" replace />;
    }
  }

  // If no auth is required but user is already authenticated (like login page)
  if (!requireAuth && isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // All checks passed, render children
  return <>{children}</>;
};

export default AuthGuard;
