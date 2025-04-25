
import { ReactNode } from 'react';
import { useAuth } from '@/hooks/auth';
import { Navigate } from 'react-router-dom';
import { UserRole } from '@/types/user';

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles: string[];
  redirectTo?: string;
  fallback?: ReactNode;
}

/**
 * A component that restricts access based on user roles
 */
const RoleGuard = ({ 
  children, 
  allowedRoles, 
  redirectTo = '/unauthorized', 
  fallback 
}: RoleGuardProps) => {
  const { user, isAuthenticated } = useAuth();
  
  // Check if the user is authenticated
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" />;
  }
  
  // Extract user roles
  const userRoles = user.roles || [];
  
  // Check if the user has at least one of the allowed roles
  const hasRequiredRole = userRoles.some(role => {
    if (role === null) return false; // Explicitly handle null role
    
    // Handle both string roles and object roles with a name property
    const roleName = typeof role === 'object' && role !== null 
      ? (role.name || '') // Use empty string as fallback if name property is missing
      : (role || ''); // Add null/undefined check here by providing fallback
    
    // Ensure roleName is a string before inclusion check
    return typeof roleName === 'string' && allowedRoles.includes(roleName);
  });
  
  // If user has the required role, render the children
  if (hasRequiredRole) {
    return <>{children}</>;
  }
  
  // If a fallback is provided, render it
  if (fallback) {
    return <>{fallback}</>;
  }
  
  // Otherwise redirect to the specified route
  return <Navigate to={redirectTo} />;
};

export default RoleGuard;
