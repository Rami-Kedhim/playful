
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useVerificationStatus } from './hooks/useVerificationStatus';
import { useAuth } from '@/hooks/auth';

export const VerificationStatus = () => {
  const { user } = useAuth();
  const { status } = useVerificationStatus();

  if (!user) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Verification Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <span>Status:</span>
          <Badge variant={status.isVerified ? "success" : "warning"}>
            {status.isVerified ? "Verified" : "Pending"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default VerificationStatus;
