
import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import type { UserRole } from "@/types/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: (UserRole | string)[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location.pathname }} replace />;
  }

  // If allowedRoles is specified, check if user has one of the allowed roles
  if (allowedRoles && allowedRoles.length > 0 && user) {
    const userRoles = user.roles || [user.role || 'user'];
    const hasAllowedRole = allowedRoles.some(role => {
      // Check against string roles or role objects
      const userRoleStrings = userRoles.map(r => typeof r === 'string' ? r : r.name);
      return userRoleStrings.includes(role);
    });
    
    if (!hasAllowedRole) {
      // User doesn't have required role, redirect to access-denied
      return <Navigate to="/access-denied" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
