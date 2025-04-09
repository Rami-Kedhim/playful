
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { VerificationRequest } from '@/types/escort';
import { 
  calculateVerificationProgress, 
  getVerificationStatusMessage, 
  getVerificationStatusTitle,
  getEstimatedCompletionTime
} from '@/utils/verification/assessmentProgress';

interface VerificationProgressProps {
  verificationRequest?: VerificationRequest | null;
  error?: string | null;
  onRetry?: () => void;
}

const VerificationProgress = ({ verificationRequest, error, onRetry }: VerificationProgressProps) => {
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
              Try Again
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
  
  const getStatusIcon = () => {
    switch (verificationRequest.status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 mr-2 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 mr-2 text-destructive" />;
      case 'in_review':
        return <Clock className="h-5 w-5 mr-2 text-blue-500 animate-pulse" />;
      case 'pending':
      default:
        return <Clock className="h-5 w-5 mr-2 text-amber-500" />;
    }
  };
  
  const getStatusBadge = () => {
    switch (verificationRequest.status) {
      case 'approved':
        return <Badge className="bg-green-500">Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      case 'in_review':
        return <Badge variant="outline" className="bg-blue-500/20 text-blue-500 border-blue-500/30">In Review</Badge>;
      case 'pending':
      default:
        return <Badge variant="outline" className="bg-amber-500/20 text-amber-500 border-amber-500/30">Pending</Badge>;
    }
  };

  const submittedDate = new Date(verificationRequest.submittedAt).toLocaleDateString();
  const updatedDate = verificationRequest.updatedAt 
    ? new Date(verificationRequest.updatedAt).toLocaleDateString() 
    : null;

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="flex items-center text-lg">
            {getStatusIcon()}
            {statusTitle}
          </CardTitle>
          {getStatusBadge()}
        </div>
        {verificationRequest.status === 'pending' && (
          <CardDescription className="mt-2">
            Estimated completion time: {estimatedTime}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <div className="my-4">
          <Progress value={progressValue} className="h-2" />
        </div>
        
        <p className="text-sm text-muted-foreground mb-2">{statusMessage}</p>
        
        <div className="bg-muted/50 p-3 rounded-md text-sm mt-4">
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
      </CardContent>
    </Card>
  );
};

export default VerificationProgress;
