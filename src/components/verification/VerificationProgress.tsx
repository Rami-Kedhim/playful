
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { RefreshCw, AlertTriangle, CheckCircle } from 'lucide-react';
import { VerificationRequest } from '@/types/escort';
import { 
  calculateVerificationProgress, 
  getVerificationStatusMessage, 
  getVerificationStatusTitle,
  getEstimatedCompletionTime,
  isVerificationInProgress
} from '@/utils/verification/assessmentProgress';
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
    if (verificationRequest?.status === 'pending' || verificationRequest?.status === 'in_review') {
      const updateRemainingTime = () => {
        const estimatedCompletionMs = new Date(verificationRequest.submittedAt).getTime() + 48 * 60 * 60 * 1000; // 48 hours
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

  const progressValue = calculateVerificationProgress(verificationRequest.status);
  const statusMessage = getVerificationStatusMessage(verificationRequest.status);
  const statusTitle = getVerificationStatusTitle(verificationRequest.status);
  const estimatedTime = getEstimatedCompletionTime(verificationRequest.status);
  
  const submittedDate = new Date(verificationRequest.submittedAt).toLocaleDateString();
  const updatedDate = verificationRequest.updatedAt 
    ? new Date(verificationRequest.updatedAt).toLocaleDateString() 
    : null;

  const handleCancelVerification = () => {
    // In a real app, this would make an API call to cancel the verification
    toast({
      title: "Verification Cancelled",
      description: "Your verification request has been cancelled.",
    });
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="flex items-center text-lg">
            {statusTitle}
          </CardTitle>
          <VerificationStatusIndicator status={verificationRequest.status} />
        </div>
        {isVerificationInProgress(verificationRequest.status) && (
          <CardDescription className="mt-2">
            {timeRemaining || `Estimated completion time: ${estimatedTime}`}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <div className="my-4">
          <Progress value={progressValue} className="h-2" />
        </div>
        
        <p className="text-sm text-muted-foreground mb-6">{statusMessage}</p>
        
        <div className="bg-muted/30 p-4 rounded-md mb-6">
          <VerificationTimeline verificationRequest={verificationRequest} />
        </div>
        
        <div className="bg-muted/50 p-3 rounded-md text-sm">
          <div className="flex justify-between mb-1">
            <span className="text-muted-foreground">Submitted:</span>
            <span>{submittedDate}</span>
          </div>
          
          {updatedDate && (
            <div className="flex justify-between mb-1">
              <span className="text-muted-foreground">Last Updated:</span>
              <span>{updatedDate}</span>
            </div>
          )}
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Documents:</span>
            <span>{verificationRequest.documents.length} uploaded</span>
          </div>
        </div>
        
        {verificationRequest.status === 'rejected' && (
          <div className="mt-4">
            <Button className="w-full">
              Submit New Verification
            </Button>
            {verificationRequest.rejectionReason && (
              <div className="mt-3 p-3 border border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800 rounded-md">
                <h4 className="text-sm font-medium mb-1">Reason for rejection:</h4>
                <p className="text-sm text-muted-foreground">{verificationRequest.rejectionReason}</p>
              </div>
            )}
          </div>
        )}
        
        {verificationRequest.status === 'pending' && (
          <Button 
            variant="outline" 
            className="w-full mt-4" 
            onClick={handleCancelVerification}
          >
            Cancel Verification Request
          </Button>
        )}
        
        {verificationRequest.status === 'approved' && (
          <div className="mt-4 p-3 border border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800 rounded-md">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <h4 className="text-sm font-medium">Your profile is now verified!</h4>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Your verification badge is now displayed on your profile and you have access to all premium features.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VerificationProgress;
