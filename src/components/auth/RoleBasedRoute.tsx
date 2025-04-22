
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/auth';

interface RoleBasedRouteProps {
  children: ReactNode;
  allowedRoles: string[];
  redirectTo?: string;
}

/**
 * A route component that restricts access based on user roles
 */
const RoleBasedRoute = ({
  children,
  allowedRoles,
  redirectTo = '/unauthorized'
}: RoleBasedRouteProps) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Show loading state while checking authentication
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Check if the user has at least one of the allowed roles
  const userRoles = user.roles || [];
  const hasAllowedRole = userRoles.some(role => {
    if (typeof role === 'string') {
      return allowedRoles.includes(role);
    }
    return false;
  });

  if (!hasAllowedRole) {
    return <Navigate to={redirectTo} replace />;
  }

  // User has the required role
  return <>{children}</>;
};

export default RoleBasedRoute;
