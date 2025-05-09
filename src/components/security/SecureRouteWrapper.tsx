
import React, { useEffect, useState } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/auth/useAuthContext';
import { uberCore } from '@/core/UberCore';
import { Card } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { SessionValidationResult, SystemIntegrityResult } from '@/types/core-systems';

interface SecureRouteWrapperProps {
  requireAuth?: boolean;
  allowedRoles?: string[];
  redirectTo?: string;
}

const SecureRouteWrapper: React.FC<SecureRouteWrapperProps> = ({
  requireAuth = true,
  allowedRoles,
  redirectTo = '/auth'
}) => {
  const { user, isAuthenticated, checkRole } = useAuth();
  const location = useLocation();
  const [isValidating, setIsValidating] = useState(true);
  const [sessionValid, setSessionValid] = useState(true);
  const [integrityValid, setIntegrityValid] = useState(true);

  useEffect(() => {
    const validateSession = async () => {
      try {
        // Get current session ID from localStorage or cookies
        const sessionId = localStorage.getItem('sessionId') || 'default-session';
        
        const [sessionResult, integrityResult] = await Promise.all([
          uberCore.validateSession(sessionId),
          uberCore.checkSystemIntegrity()
        ]);
        
        setSessionValid(sessionResult.valid);
        setIntegrityValid(integrityResult.valid);
      } catch (error) {
        console.error('Session validation failed', error);
        setSessionValid(false);
      } finally {
        setIsValidating(false);
      }
    };
    
    validateSession();
  }, [location.pathname]);
  
  if (isValidating) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="p-8 flex flex-col items-center">
          <Loader2 className="h-16 w-16 animate-spin text-primary mb-4" />
          <h2 className="text-xl font-semibold">Validating secure session...</h2>
        </Card>
      </div>
    );
  }
  
  if (!sessionValid || !integrityValid) {
    return <Navigate to="/error/security" replace />;
  }
  
  if (requireAuth && !isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }
  
  if (allowedRoles && allowedRoles.length > 0 && (!user || !allowedRoles.some(role => checkRole(role)))) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  return <Outlet />;
};

export default SecureRouteWrapper;
