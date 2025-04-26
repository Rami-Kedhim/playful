
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/auth';
import { useRole } from '@/hooks/auth/useRole';

interface RoleBasedRouteProps {
  children: ReactNode;
  allowedRoles: string[];
  redirectTo?: string;
  fallback?: ReactNode;
}

/**
 * Route component that restricts access based on user roles
 * Redirects unauthenticated users to login and unauthorized users to a specified path
 */
const RoleBasedRoute = ({ 
  children, 
  allowedRoles,
  redirectTo = '/unauthorized', 
  fallback 
}: RoleBasedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  const { hasAnyRole } = useRole();
  const location = useLocation();
  
  // Show loading state while checking authentication
  if (isLoading) {
    return <div className="flex justify-center items-center p-8">Loading...</div>;
  }
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} />;
  }
  
  // Check if user has any of the required roles
  if (hasAnyRole(allowedRoles)) {
    return <>{children}</>;
  }
  
  // Show fallback if provided, otherwise redirect
  if (fallback) {
    return <>{fallback}</>;
  }
  
  // Redirect to unauthorized page
  return <Navigate to={redirectTo} replace />;
};

export default RoleBasedRoute;
