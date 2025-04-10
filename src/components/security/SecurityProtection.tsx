
import React from 'react';
import { Button } from '@/components/ui/button';
import { Shield, Loader2 } from 'lucide-react';
import { useSecurity } from '@/hooks/useSecurity';

interface SecurityProtectionProps {
  operation: 'payment' | 'identity-verification' | 'profile-update' | 'withdrawal';
  children: React.ReactNode;
  title?: string;
  description?: string;
  redirectOnVerified?: string;
}

/**
 * Component that protects sensitive operations with verification
 */
const SecurityProtection: React.FC<SecurityProtectionProps> = ({
  operation,
  children,
  title,
  description,
  redirectOnVerified
}) => {
  const { isVerified, isCheckingStatus, requestVerification } = useSecurity({
    operation,
    redirectOnVerified,
    title,
    description
  });
  
  if (isCheckingStatus) {
    return (
      <div className="flex flex-col items-center justify-center p-6">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-center text-muted-foreground">Verifying your security status...</p>
      </div>
    );
  }
  
  if (!isVerified) {
    return (
      <div className="flex flex-col items-center text-center p-6 border rounded-lg bg-muted/30">
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <Shield className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-lg font-medium mb-2">Verification Required</h3>
        <p className="text-muted-foreground mb-4">
          For your security, we need to verify your identity before you can {operation.replace('-', ' ')}.
        </p>
        <Button onClick={requestVerification}>
          Verify Identity
        </Button>
      </div>
    );
  }
  
  // If verified, render children
  return <>{children}</>;
};

export default SecurityProtection;
