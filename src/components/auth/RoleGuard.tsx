
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

const RoleGuard = ({ 
  children, 
  allowedRoles, 
  redirectTo = '/unauthorized', 
  fallback 
}: RoleGuardProps) => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" />;
  }
  
  const userRoles = user.roles || [];
  
  const hasRequiredRole = userRoles.some(roleItem => {
    // Comprehensive null and type checking
    if (roleItem == null) return false;
    
    let roleName = '';
    
    // Check if roleItem is an object with a name property
    if (typeof roleItem === 'object' && roleItem !== null) {
      const roleObject = roleItem as { name?: string };
      roleName = roleObject.name ?? (typeof roleObject === 'string' ? roleObject : '');
    } else {
      // Safely convert to string if not an object
      roleName = String(roleItem).toLowerCase();
    }
    
    // Check if roleName is not empty and matches allowed roles
    return roleName && allowedRoles.some(role => role.toLowerCase() === roleName);
  });
  
  if (hasRequiredRole) {
    return <>{children}</>;
  }
  
  if (fallback) {
    return <>{fallback}</>;
  }
  
  return <Navigate to={redirectTo} replace />;
};

export default RoleGuard;
