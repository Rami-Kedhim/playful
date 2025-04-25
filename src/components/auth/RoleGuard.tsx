
import { ReactNode } from 'react';
import { useAuth } from '@/hooks/auth';
import { Navigate } from 'react-router-dom';

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
    
    // Properly handle null/undefined roleItem with more thorough checks
    let roleName = '';
    if (roleItem && typeof roleItem === 'object') {
      roleName = roleItem.name || '';
    } else if (roleItem) {
      roleName = String(roleItem);
    }
    
    return typeof roleName === 'string' && allowedRoles.includes(roleName);
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
