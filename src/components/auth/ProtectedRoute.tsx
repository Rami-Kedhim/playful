
import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/auth/useAuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children?: React.ReactNode;
  redirectPath?: string;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  redirectPath = "/auth",
  allowedRoles = []
}) => {
  const { isAuthenticated, isLoading, checkRole } = useAuth();
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
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }
  
  // Check if user has required role(s) when specified
  if (allowedRoles.length > 0) {
    const hasRequiredRole = allowedRoles.some(role => checkRole(role));
    
    if (!hasRequiredRole) {
      return <Navigate to="/access-denied" replace />;
    }
  }

  // If authenticated and has required role, render the children or the Outlet
  return <>{children || <Outlet />}</>;
};

export default ProtectedRoute;
