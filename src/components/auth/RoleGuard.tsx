
import React from 'react';
import { useAuth } from '@/hooks/auth/useAuth';
import { useRole } from '@/hooks/auth/useRole';
import { Navigate } from 'react-router-dom';
import { Loader2, ShieldAlert } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserRole } from '@/types/auth';

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  fallbackPath?: string;
  requireAllRoles?: boolean;
  showAccessDenied?: boolean;
}

/**
 * A component that only renders its children if the current user has one or all of the allowed roles
 */
const RoleGuard = ({ 
  children, 
  allowedRoles, 
  fallbackPath = "/", 
  requireAllRoles = false,
  showAccessDenied = false
}: RoleGuardProps) => {
  const { user, isLoading } = useAuth();
  const { hasRole, hasAllRoles, isAdmin } = useRole();
  
  // Show loading state if auth is still being determined
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Verifying permissions...</p>
        </div>
      </div>
    );
  }

  // If no user, redirect to login
  if (!user) {
    return <Navigate to="/auth" state={{ from: window.location.pathname }} replace />;
  }
  
  // Special handling for admin (admins can access everything)
  if (isAdmin()) {
    return <>{children}</>;
  }

  // Check if user has required role(s)
  const hasAccess = requireAllRoles 
    ? hasAllRoles(allowedRoles as UserRole[])
    : hasRole(allowedRoles as UserRole[]);

  // If user doesn't have required role(s)
  if (!hasAccess) {
    if (showAccessDenied) {
      return (
        <div className="flex flex-col items-center justify-center py-10">
          <Card className="max-w-md mx-auto">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <ShieldAlert className="h-16 w-16 text-destructive" />
              </div>
              <CardTitle>Access Denied</CardTitle>
              <CardDescription>
                You don't have permission to access this page.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <p className="text-sm text-center text-muted-foreground">
                This page requires one of the following roles: {allowedRoles.join(', ')}
              </p>
              <Button onClick={() => window.location.href = fallbackPath}>
                Return to Home Page
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    }
    
    return <Navigate to={fallbackPath} replace />;
  }
  
  // If user has required role, render children
  return <>{children}</>;
};

export default RoleGuard;
