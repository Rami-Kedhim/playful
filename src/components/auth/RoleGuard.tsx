
import { ReactNode } from 'react';
import { useAuth } from '@/hooks/auth';
import { Navigate } from 'react-router-dom';
import { RoleObject } from '@/types/auth';

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
    if (!roleItem) return false;
    
    let roleName = '';
    
    if (typeof roleItem === 'object' && 'name' in roleItem) {
      const roleObj = roleItem as RoleObject;
      roleName = roleObj.name || '';
    } else {
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
