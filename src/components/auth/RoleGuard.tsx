
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
    // Early return if roleItem is null or undefined
    if (roleItem === null || roleItem === undefined) return false;
    
    let roleName = '';
    
    if (typeof roleItem === 'object' && roleItem !== null && 'name' in roleItem) {
      // Only access name property after we've confirmed it exists
      const roleObject = roleItem as { name: string };
      // Use optional chaining to safely access the name property
      roleName = roleObject.name ?? '';
    } else {
      // Convert roleItem to string safely
      roleName = String(roleItem);
    }
    
    return roleName && allowedRoles.includes(roleName);
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
