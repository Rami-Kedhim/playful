import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
  allowUnauthenticated?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
  allowUnauthenticated = false,
}) => {
  const { user, isLoading, isAuthenticated, userRoles } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // Show toast if authenticated but missing required role
    if (
      !isLoading && 
      isAuthenticated && 
      requiredRole && 
      !userRoles.includes(requiredRole)
    ) {
      toast({
        title: "Access denied",
        description: "You don't have permission to access this page.",
        variant: "destructive",
      });
    }
  }, [isLoading, isAuthenticated, requiredRole, userRoles]);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh] w-full">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  // If unauthenticated access is allowed, or the user is authenticated
  if (allowUnauthenticated || isAuthenticated) {
    // If a role is required and user doesn't have that role, redirect to home
    if (requiredRole && isAuthenticated && !userRoles.includes(requiredRole)) {
      return <Navigate to="/" state={{ from: location }} replace />;
    }
    
    // Otherwise, render the children
    return <>{children}</>;
  }

  // If not authenticated and authentication is required, redirect to login
  return <Navigate to="/auth" state={{ from: location }} replace />;
};

export default ProtectedRoute;
