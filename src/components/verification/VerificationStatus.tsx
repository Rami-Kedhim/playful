
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useVerificationStatus } from '@/hooks/verification/useVerificationStatus';
import { useAuth } from '@/hooks/auth';

export const VerificationStatus = () => {
  const { user } = useAuth();
  const { status, isVerified } = useVerificationStatus();

  if (!user) return null;
  
  // Check if user has submitted verification in user_metadata
  const hasSubmittedVerification = user.user_metadata && 
    user.user_metadata.verification_submitted === true;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Verification Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <span>Status:</span>
          <Badge variant={isVerified ? "success" : hasSubmittedVerification ? "warning" : "default"}>
            {isVerified ? "Verified" : hasSubmittedVerification ? "Pending" : "Not Started"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default VerificationStatus;
