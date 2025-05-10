
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/auth/useAuth';
import { Loader2 } from 'lucide-react';

interface SecureRouteWrapperProps {
  children: React.ReactNode;
  adminOnly?: boolean;
  escortOnly?: boolean;
  clientOnly?: boolean;
}

const SecureRouteWrapper: React.FC<SecureRouteWrapperProps> = ({
  children,
  adminOnly = false,
  escortOnly = false,
  clientOnly = false
}) => {
  const { isAuthenticated, loading, user } = useAuth();
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        setAuthorized(false);
      } else if (adminOnly && (!user?.roles?.includes('admin'))) {
        setAuthorized(false);
      } else if (escortOnly && (!user?.roles?.includes('escort'))) {
        setAuthorized(false);
      } else if (clientOnly && (!user?.roles?.includes('client'))) {
        setAuthorized(false);
      } else {
        setAuthorized(true);
      }
    }
  }, [loading, isAuthenticated, user, adminOnly, escortOnly, clientOnly]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (authorized === false) {
    return <Navigate to="/login" replace />;
  }

  if (authorized === true) {
    return <>{children}</>;
  }

  return null;
};

export default SecureRouteWrapper;
