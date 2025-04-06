
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/auth/useAuth";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children,
  requiredRole 
}) => {
  const { user, isLoading, isAuthenticated, userRoles } = useAuth();
  const location = useLocation();
  
  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }
  
  // If not authenticated, redirect to login page with return path
  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }
  
  // If role is required and user doesn't have that role, redirect to home
  if (requiredRole && user && !userRoles.includes(requiredRole)) {
    return <Navigate to="/" replace />;
  }
  
  // If authenticated and has required role (or no role required), render children
  return <>{children}</>;
};

export default ProtectedRoute;
