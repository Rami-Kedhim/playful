
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
    // Skip null or undefined role items
    if (roleItem === null || roleItem === undefined) return false;
    
    let roleName = '';
    
    // Type guard to ensure roleItem exists and check its type
    if (typeof roleItem === 'object' && roleItem !== null && 'name' in roleItem) {
      // Access name property only after null check
      const name = roleItem.name;
      // Convert to string with null check
      roleName = name ? String(name) : '';
    } else if (roleItem !== null && roleItem !== undefined) {
      // Convert to string only if not null
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
