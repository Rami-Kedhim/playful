
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/auth';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: string;
  redirectTo?: string;
}

/**
 * A route component that requires authentication
 * Redirects to login if not authenticated
 */
const ProtectedRoute = ({
  children,
  requiredRole,
  redirectTo = '/login'
}: ProtectedRouteProps) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Show loading state while checking authentication
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // If a specific role is required, check for it
  if (requiredRole && user) {
    const userRoles = user.roles || [];
    const hasRole = userRoles.some(role => {
      if (typeof role === 'string') {
        return role === requiredRole;
      }
      return false;
    });

    if (!hasRole) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // User is authenticated (and has required role if specified)
  return <>{children}</>;
};

export default ProtectedRoute;
