
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/auth';
import { useRole } from '@/hooks/auth';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: string[];
  requireAllRoles?: boolean;
  redirectPath?: string;
}

/**
 * Component that protects routes requiring authentication
 * Optionally checks for specific roles
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRoles = [], 
  requireAllRoles = false,
  redirectPath = "/auth"
}) => {
  const { isAuthenticated, isLoading } = useAuth();
  const { hasRole, hasAllRoles } = useRole();
  const location = useLocation();

  // Show loading state while authentication is being checked
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="text-sm text-muted-foreground">Verifying authentication...</span>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    // Save the current path to redirect back after login
    return <Navigate to={redirectPath} state={{ from: location.pathname }} replace />;
  }

  // Check role-based access if roles are required
  if (requiredRoles.length > 0) {
    const hasRequiredRoles = requireAllRoles
      ? hasAllRoles(requiredRoles)
      : hasRole(requiredRoles);
    
    if (!hasRequiredRoles) {
      return (
        <Navigate to="/" replace />
      );
    }
  }

  // If authenticated and has required roles (if any), render the children
  return <>{children}</>;
};

export default ProtectedRoute;
