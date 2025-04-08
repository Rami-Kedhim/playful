
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useBrainHubAuth } from '@/hooks/useBrainHubAuth';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Shield, AlertTriangle } from 'lucide-react';

interface BrainHubProtectedProps {
  children: React.ReactNode;
  requiredAccess?: 'viewer' | 'analyst' | 'admin';
}

/**
 * Protected route wrapper specifically for Brain Hub routes
 * Checks both authentication and Brain Hub-specific permissions
 */
const BrainHubProtected: React.FC<BrainHubProtectedProps> = ({ 
  children, 
  requiredAccess = 'viewer'
}) => {
  const { hasAccess, accessLevel } = useBrainHubAuth();
  
  // Access level hierarchy for permission checking
  const accessLevels = {
    viewer: 1,
    analyst: 2,
    admin: 3
  };

  const hasRequiredAccess = accessLevels[accessLevel] >= accessLevels[requiredAccess];
  
  // First check if user is authenticated at all
  return (
    <ProtectedRoute>
      {hasAccess && hasRequiredAccess ? (
        <>{children}</>
      ) : hasAccess ? (
        <div className="p-8">
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Access Restricted</AlertTitle>
            <AlertDescription>
              You don't have sufficient permissions to access this Brain Hub feature.
              This requires {requiredAccess} access level or higher.
            </AlertDescription>
          </Alert>
        </div>
      ) : (
        <Navigate to="/auth" state={{ from: '/brain-hub' }} replace />
      )}
    </ProtectedRoute>
  );
};

export default BrainHubProtected;
