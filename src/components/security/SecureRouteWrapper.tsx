
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/auth/useAuthContext';
import { uberCore } from '@/core';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, ShieldAlert } from 'lucide-react';

interface SecureRouteWrapperProps {
  children: React.ReactNode;
  requiredRole?: string;
  fallbackPath?: string;
}

const SecureRouteWrapper: React.FC<SecureRouteWrapperProps> = ({
  children,
  requiredRole,
  fallbackPath = '/login'
}) => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);
  const [systemError, setSystemError] = useState<string | null>(null);

  useEffect(() => {
    const checkPermissions = async () => {
      try {
        // Check system integrity
        const integrityResult = await uberCore.checkSystemIntegrity();
        
        // Check if the system integrity is valid (using isValid as the property doesn't exist)
        if (integrityResult && (integrityResult.codeIntegrity === false || 
            integrityResult.dataIntegrity === false || 
            integrityResult.networkSecurity === false)) {
          setSystemError('System integrity check failed. Please contact support.');
          return;
        }
        
        // If not authenticated, redirect to login
        if (!isAuthenticated) {
          navigate(fallbackPath);
          return;
        }
        
        // Check role if required
        if (requiredRole && (!user?.roles || !user.roles.includes(requiredRole))) {
          navigate('/access-denied');
          return;
        }
        
        setIsChecking(false);
      } catch (error) {
        console.error('Security check error:', error);
        setSystemError('An error occurred during security checks.');
      }
    };
    
    checkPermissions();
  }, [user, isAuthenticated, requiredRole, navigate, fallbackPath]);
  
  if (systemError) {
    return (
      <Card className="p-8 max-w-md mx-auto mt-12 text-center">
        <ShieldAlert className="w-12 h-12 mx-auto mb-4 text-red-500" />
        <h2 className="text-xl font-bold mb-2">Security Error</h2>
        <p className="mb-4 text-muted-foreground">{systemError}</p>
        <Button onClick={() => window.location.reload()}>
          Refresh Application
        </Button>
      </Card>
    );
  }
  
  if (isChecking) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <div className="animate-pulse h-6 w-6 rounded-full bg-primary mb-4"></div>
        <p className="text-muted-foreground">Verifying security...</p>
      </div>
    );
  }
  
  return <>{children}</>;
};

export default SecureRouteWrapper;
