
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useVerificationStatus } from '@/hooks/verification/useVerificationStatus';
import { useAuth } from '@/hooks/auth';
import { VerificationStatus as VerificationStatusEnum } from '@/types/verification';
import { Shield, CheckCircle, Clock } from 'lucide-react';

export const VerificationStatus = () => {
  const { user } = useAuth();
  const { status, isVerified, verificationRequest } = useVerificationStatus();

  if (!user) return null;
  
  const getStatusIcon = () => {
    if (isVerified) return <CheckCircle className="h-4 w-4 mr-1" />;
    if (status.status === VerificationStatusEnum.PENDING) return <Clock className="h-4 w-4 mr-1" />;
    return <Shield className="h-4 w-4 mr-1" />;
  };
  
  const getStatusBadgeVariant = () => {
    if (isVerified) return "success";
    if (status.status === VerificationStatusEnum.PENDING) return "warning";
    return "default";
  };
  
  const getStatusText = () => {
    if (isVerified) return "Verified";
    if (status.status === VerificationStatusEnum.PENDING) return "Pending";
    if (status.status === VerificationStatusEnum.IN_REVIEW) return "In Review";
    if (status.status === VerificationStatusEnum.REJECTED) return "Rejected";
    return "Not Started";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Verification Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Status:</span>
            <Badge variant={getStatusBadgeVariant()} className="flex items-center">
              {getStatusIcon()}
              {getStatusText()}
            </Badge>
          </div>
          
          {status.lastSubmitted && (
            <div className="flex items-center justify-between text-sm">
              <span>Last submitted:</span>
              <span className="text-muted-foreground">
                {new Date(status.lastSubmitted).toLocaleDateString()}
              </span>
            </div>
          )}
          
          {status.reason && (
            <div className="mt-4 text-sm">
              <span className="font-medium">Reason:</span>
              <p className="text-muted-foreground mt-1">{status.reason}</p>
            </div>
          )}
          
          {verificationRequest?.requested_level && (
            <div className="flex items-center justify-between text-sm">
              <span>Requested level:</span>
              <Badge variant="outline" className="capitalize">
                {verificationRequest.requested_level}
              </Badge>
            </div>
          )}
          
          {!isVerified && !status.lastSubmitted && (
            <div className="mt-4 text-sm text-muted-foreground">
              Complete the verification process to unlock all platform features.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default VerificationStatus;
