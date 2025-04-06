
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/auth/useAuth';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRoles = [] 
}) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  // Show loading state while authentication is being checked
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Verifying authentication...</span>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    // Save the current path to redirect back after login
    return <Navigate to={`/auth?from=${encodeURIComponent(location.pathname)}`} replace />;
  }

  // Check role-based access if roles are required
  if (requiredRoles.length > 0) {
    const userRoles = user?.userRoles || [];
    const hasRequiredRole = requiredRoles.some(role => userRoles.includes(role));
    
    if (!hasRequiredRole) {
      return (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-6">
            You don't have permission to access this page.
          </p>
          <Navigate to="/" replace />
        </div>
      );
    }
  }

  // If authenticated and has required roles (if any), render the children
  return <>{children}</>;
};

export default ProtectedRoute;
