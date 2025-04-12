
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/auth/useAuthContext';
import { toast } from 'sonner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRoles = [] }) => {
  const { isAuthenticated, isLoading, user, checkRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Wait until auth state is loaded before making decisions
    if (!isLoading) {
      if (!isAuthenticated) {
        // Redirect to login if not authenticated
        toast.error("Authentication Required", {
          description: "Please log in to access this page."
        });
        
        // Store the attempted URL for redirection after login
        navigate('/auth', { state: { from: location } });
      } 
      // If roles are required, check them
      else if (requiredRoles.length > 0) {
        const hasRequiredRole = requiredRoles.some(role => checkRole(role));
        
        if (!hasRequiredRole) {
          toast.error("Access Denied", {
            description: "You don't have permission to access this page."
          });
          navigate('/'); // Redirect to home if not authorized
        }
      }
    }
  }, [isAuthenticated, isLoading, navigate, location, requiredRoles, checkRole]);

  // Show nothing while checking authentication
  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  // If authenticated and authorized (or no roles required), render children
  return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoute;
