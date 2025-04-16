
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { RefreshCw, AlertTriangle, CheckCircle } from 'lucide-react';
import { VerificationRequest, VerificationStatus } from '@/types/escort';
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
        const estimatedCompletionMs = new Date(verificationRequest.submittedAt || verificationRequest.created_at).getTime() + 48 * 60 * 60 * 1000;
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
      case 'pending': return 25;
      case 'in_review': return 50;
      case 'approved': return 100;
      case 'rejected': return 100;
      default: return 0;
    }
  };

  const getVerificationStatusMessage = (status: VerificationStatus): string => {
    switch (status) {
      case 'pending': return 'Your verification request has been received and is waiting to be reviewed by our team.';
      case 'in_review': return 'Our team is currently reviewing your verification documents.';
      case 'approved': return 'Congratulations! Your verification has been approved.';
      case 'rejected': return 'Unfortunately, your verification request was rejected. Please check the reason below.';
      default: return 'Unknown status';
    }
  };

  const getVerificationStatusTitle = (status: VerificationStatus): string => {
    switch (status) {
      case 'pending': return 'Verification Pending';
      case 'in_review': return 'Verification In Review';
      case 'approved': return 'Verification Approved';
      case 'rejected': return 'Verification Rejected';
      default: return 'Verification Status';
    }
  };

  const getEstimatedCompletionTime = (status: VerificationStatus): string => {
    switch (status) {
      case 'pending': return '24-48 hours';
      case 'in_review': return '24 hours';
      default: return 'N/A';
    }
  };

  const isVerificationInProgress = (status: VerificationStatus): boolean => {
    return status === 'pending' || status === 'in_review';
  };

  const progressValue = calculateVerificationProgress(verificationRequest.status);
  const statusMessage = getVerificationStatusMessage(verificationRequest.status);
  const statusTitle = getVerificationStatusTitle(verificationRequest.status);
  const estimatedTime = getEstimatedCompletionTime(verificationRequest.status);
  
  const submittedDate = new Date(verificationRequest.submittedAt || verificationRequest.created_at).toLocaleDateString();
  const updatedDate = verificationRequest.updated_at 
    ? new Date(verificationRequest.updated_at).toLocaleDateString() 
    : '—';

  const handleCancelVerification = () => {
    toast({
      title: "Verification Cancelled",
      description: "Your verification request has been cancelled.",
    });
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    
    try {
      return new Date(dateString).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return "Invalid date";
    }
  };

  const getVerificationSteps = (request: VerificationRequest | null) => {
    if (!request) return [];
    
    const steps = [
      {
        id: 'submitted',
        name: 'Submitted',
        status: 'complete',
        date: formatDate(request.created_at)
      },
      {
        id: 'review',
        name: 'In Review',
        status: request.status === 'pending' ? 'current' 
          : ['in_review', 'approved', 'rejected'].includes(request.status) ? 'complete' : 'upcoming',
        date: request.updated_at ? formatDate(request.updated_at) : 'Waiting'
      },
    ];
    
    return steps;
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
