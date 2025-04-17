
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { RefreshCw, AlertTriangle, CheckCircle } from 'lucide-react';
import { VerificationRequest, VerificationStatus } from '@/types/verification';
import { toast } from '@/components/ui/use-toast';
import VerificationStatusIndicator from './status/VerificationStatusIndicator';
import VerificationTimeline from './status/VerificationTimeline';

interface VerificationProgressProps {
  verificationRequest?: VerificationRequest | null;
  error?: string | null;
  onRetry?: () => void;
}

const VerificationProgress = ({ verificationRequest, error, onRetry }: VerificationProgressProps) => {
  const [timeRemaining, setTimeRemaining] = useState<string | null>(null);
  
  useEffect(() => {
    if (verificationRequest?.status === VerificationStatus.PENDING || verificationRequest?.status === VerificationStatus.IN_REVIEW) {
      const updateRemainingTime = () => {
        // Use either submittedAt or created_at
        const submittedAt = verificationRequest.submittedAt || verificationRequest.created_at;
        if (!submittedAt) return;
        
        const estimatedCompletionMs = new Date(submittedAt).getTime() + 48 * 60 * 60 * 1000;
        const now = Date.now();
        const diffMs = estimatedCompletionMs - now;

        if (diffMs <= 0) {
          setTimeRemaining('Estimated completion time passed');
          return;
        }

        const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
        const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

        setTimeRemaining(`${diffHrs}h ${diffMins}m remaining`);
      };

      updateRemainingTime();
      const interval = setInterval(updateRemainingTime, 60 * 1000);
      
      return () => {
        clearInterval(interval);
      };
    }
  }, [verificationRequest]);
  
  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
            Error Checking Verification
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{error}</p>
          {onRetry && (
            <Button className="w-full mt-4" variant="outline" onClick={onRetry}>
              <RefreshCw className="h-4 w-4 mr-2" /> Try Again
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  if (!verificationRequest) {
    return null;
  }

  const calculateVerificationProgress = (status: VerificationStatus): number => {
    switch (status) {
      case VerificationStatus.PENDING: return 25;
      case VerificationStatus.IN_REVIEW: return 50;
      case VerificationStatus.APPROVED: return 100;
      case VerificationStatus.REJECTED: return 100;
      case VerificationStatus.EXPIRED: return 100;
      default: return 0;
    }
  };

  const getVerificationStatusMessage = (status: VerificationStatus): string => {
    switch (status) {
      case VerificationStatus.PENDING: return 'Your verification request has been received and is waiting to be reviewed by our team.';
      case VerificationStatus.IN_REVIEW: return 'Our team is currently reviewing your verification documents.';
      case VerificationStatus.APPROVED: return 'Congratulations! Your verification has been approved.';
      case VerificationStatus.REJECTED: return 'Unfortunately, your verification request was rejected. Please check the reason below.';
      case VerificationStatus.EXPIRED: return 'Your verification has expired. Please submit a new verification request.';
      default: return 'Unknown status';
    }
  };

  const safeStatus = (statusValue: string): VerificationStatus => {
    const validStatuses: VerificationStatus[] = [
      VerificationStatus.PENDING, 
      VerificationStatus.IN_REVIEW,
      VerificationStatus.APPROVED,
      VerificationStatus.REJECTED,
      VerificationStatus.EXPIRED
    ];
    
    return validStatuses.includes(statusValue as VerificationStatus) 
      ? (statusValue as VerificationStatus) 
      : VerificationStatus.PENDING;
  };

  // Handle status value
  const status = safeStatus(verificationRequest.status as string);
  const progress = calculateVerificationProgress(status);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Verification Status
          <VerificationStatusIndicator status={status} />
        </CardTitle>
        <CardDescription>
          {getVerificationStatusMessage(status)}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-end">
            <span className="text-xs text-muted-foreground">
              {progress}% complete
            </span>
          </div>
        </div>

        <div className="border-t border-b py-4">
          <h3 className="font-medium mb-2">Request Details</h3>
          <div className="grid gap-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Submitted on</span>
              <span className="text-sm">
                {new Date(verificationRequest.submittedAt || verificationRequest.created_at || Date.now()).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Level requested</span>
              <span className="text-sm capitalize">
                {verificationRequest.level || verificationRequest.verificationLevel || verificationRequest.requested_level || 'basic'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Documents submitted</span>
              <span className="text-sm">
                {verificationRequest.documents?.length || 0}
              </span>
            </div>
            {status === VerificationStatus.IN_REVIEW && timeRemaining && (
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Estimated time</span>
                <span className="text-sm">{timeRemaining}</span>
              </div>
            )}
            {status === VerificationStatus.REJECTED && (verificationRequest.rejectionReason || verificationRequest.rejection_reason || verificationRequest.reviewer_notes) && (
              <div className="mt-2">
                <span className="text-sm text-muted-foreground block">Rejection reason:</span>
                <p className="text-sm mt-1 p-2 bg-red-50 dark:bg-red-900/20 rounded-md">
                  {verificationRequest.rejectionReason || verificationRequest.rejection_reason || verificationRequest.reviewer_notes}
                </p>
              </div>
            )}
          </div>
        </div>

        <VerificationTimeline verificationRequest={verificationRequest} />

        {status === VerificationStatus.REJECTED && (
          <Button className="w-full" onClick={() => toast({ title: "New request initiated", description: "Redirecting to verification form..." })}>
            Submit New Request
          </Button>
        )}

        {status === VerificationStatus.APPROVED && (
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-md border border-green-200 dark:border-green-900/30 flex items-center gap-3">
            <CheckCircle className="text-green-500 h-5 w-5 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-green-700 dark:text-green-300">Verification Successful</h3>
              <p className="text-sm text-green-600/80 dark:text-green-400/80">
                Your account is now verified. You have full access to all platform features.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VerificationProgress;
