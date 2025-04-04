
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Clock, AlertCircle, ShieldCheck, Shield } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { VerificationRequest, VerificationStatus } from '@/types/escort';
import { 
  calculateVerificationProgress, 
  getVerificationStatusMessage,
  isVerificationInProgress
} from '@/utils/verification/assessmentProgress';

interface VerificationProgressProps {
  verificationRequest?: VerificationRequest;
  error?: string;
}

const VerificationProgress = ({ verificationRequest, error }: VerificationProgressProps) => {
  const progress = calculateVerificationProgress(verificationRequest);
  const statusMessage = getVerificationStatusMessage(verificationRequest);
  const inProgress = isVerificationInProgress(verificationRequest);
  
  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error checking verification status</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {verificationRequest?.status === 'approved' ? (
            <>
              <ShieldCheck className="h-5 w-5 text-green-500" />
              Verification Complete
            </>
          ) : verificationRequest?.status === 'rejected' ? (
            <>
              <AlertCircle className="h-5 w-5 text-red-500" />
              Verification Rejected
            </>
          ) : inProgress ? (
            <>
              <Clock className="h-5 w-5 text-amber-500 animate-pulse" />
              Verification In Progress
            </>
          ) : (
            <>
              <Shield className="h-5 w-5 text-muted-foreground" />
              Verification Status
            </>
          )}
        </CardTitle>
        <CardDescription>
          {inProgress ? 
            "Our team is reviewing your verification documents. This process usually takes 24-48 hours." : 
            verificationRequest?.status === 'approved' ? 
              "Your account has been successfully verified. Thank you for completing this process." :
              verificationRequest?.status === 'rejected' ? 
                "Your verification was rejected. Please review the feedback and submit again." :
                "Submit your verification documents to get verified on the platform."
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Verification Progress</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
          
          <div className="flex items-center gap-2 text-sm mt-4">
            <div className={`w-3 h-3 rounded-full ${
              verificationRequest?.status === 'approved' ? 'bg-green-500' : 
              verificationRequest?.status === 'rejected' ? 'bg-red-500' : 
              inProgress ? 'bg-amber-500' : 'bg-gray-300'
            }`} />
            <span>{statusMessage}</span>
          </div>
          
          {verificationRequest?.submittedAt && (
            <div className="text-xs text-muted-foreground mt-2">
              Submitted: {new Date(verificationRequest.submittedAt).toLocaleDateString()}
            </div>
          )}
          
          {verificationRequest?.status === 'rejected' && verificationRequest.notes && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Rejection Reason</AlertTitle>
              <AlertDescription>
                {verificationRequest.notes}
              </AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default VerificationProgress;
