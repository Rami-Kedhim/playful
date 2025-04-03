
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const RoleGuard = ({ children, allowedRoles }: RoleGuardProps) => {
  const { user, userRoles, isLoading } = useAuth();

  // Show loading state if auth is still being determined
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Check if user has any of the allowed roles
  const hasRole = allowedRoles.some(role => userRoles.includes(role));
  
  // Redirect to home if not authorized
  if (!hasRole) {
    return <Navigate to="/" replace />;
  }

  // Render children if authorized
  return <>{children}</>;
};

export default RoleGuard;
