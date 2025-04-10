
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/auth/useAuthContext';
import { UserRole } from '@/types/auth';

interface RoleBasedRouteProps {
  allowedRoles?: UserRole[];
  redirectPath?: string;
  children?: React.ReactNode;
}

const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({
  allowedRoles = [],
  redirectPath = '/auth',
  children
}) => {
  const { isAuthenticated, isLoading, checkRole, user } = useAuth();
  
  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-4 text-muted-foreground">Verifying access...</p>
      </div>
    );
  }
  
  // If no roles specified, just check if authenticated
  if (allowedRoles.length === 0) {
    if (!isAuthenticated) {
      return <Navigate to={redirectPath} replace />;
    }
    
    return children ? <>{children}</> : <Outlet />;
  }
  
  // Check if user has at least one of the allowed roles
  const hasRequiredRole = allowedRoles.some(role => checkRole(role));
  
  if (!isAuthenticated || !hasRequiredRole) {
    // If authenticated but wrong role, redirect to access denied
    const redirectTo = isAuthenticated ? '/access-denied' : redirectPath;
    return <Navigate to={redirectTo} replace />;
  }
  
  return children ? <>{children}</> : <Outlet />;
};

export default RoleBasedRoute;
