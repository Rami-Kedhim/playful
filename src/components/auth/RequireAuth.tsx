
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUserAIContext } from '@/hooks/useUserAIContext';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface RequireAuthProps {
  children: React.ReactNode;
  requiredRoles?: string[];
  redirectPath?: string;
}

/**
 * Component that handles authentication and authorization logic for protected routes.
 * Redirects to login if user is not authenticated or doesn't have required roles.
 */
const RequireAuth: React.FC<RequireAuthProps> = ({
  children,
  requiredRoles = [],
  redirectPath = '/auth',
}) => {
  const { isAuthenticated, isLoading, userRoles } = useUserAIContext();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      toast.error("Authentication required", {
        description: "Please log in to access this page",
      });
      
      // Save the current location to redirect back after login
      navigate(redirectPath, {
        state: { from: location.pathname }
      });
      return;
    }

    // If roles are specified, check if user has any of the required roles
    if (requiredRoles.length > 0) {
      const hasRequiredRole = requiredRoles.some(role => 
        userRoles.includes(role)
      );

      if (!hasRequiredRole) {
        toast.error("Access denied", {
          description: "You don't have permission to access this page",
        });
        navigate('/');
        return;
      }
    }
  }, [isAuthenticated, isLoading, navigate, location, requiredRoles, userRoles, redirectPath]);

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-primary" />
          <p className="text-muted-foreground">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  // If not authenticated or doesn't have required roles, return null
  // The useEffect will handle redirects
  if (!isAuthenticated) {
    return null;
  }

  // Check for required roles
  if (requiredRoles.length > 0) {
    const hasRequiredRole = requiredRoles.some(role => 
      userRoles.includes(role)
    );
    
    if (!hasRequiredRole) {
      return null;
    }
  }

  return <>{children}</>;
};

export default RequireAuth;
