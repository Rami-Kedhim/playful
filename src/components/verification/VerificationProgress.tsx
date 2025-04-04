
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VerificationRequest } from '@/types/escort';

interface VerificationProgressProps {
  verificationRequest?: VerificationRequest | null;
  error?: string | null;
}

const VerificationProgress = ({ verificationRequest, error }: VerificationProgressProps) => {
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
          <Button className="w-full mt-4" variant="outline">
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!verificationRequest) {
    return null;
  }

  const getProgressDetails = () => {
    switch (verificationRequest.status) {
      case 'approved':
        return {
          title: 'Verification Approved',
          icon: <CheckCircle className="h-5 w-5 mr-2 text-green-500" />,
          progressValue: 100,
          badge: <Badge className="bg-green-500">Approved</Badge>,
          message: 'Your verification has been approved. Your profile now shows as verified to other users.'
        };
      case 'rejected':
        return {
          title: 'Verification Rejected',
          icon: <XCircle className="h-5 w-5 mr-2 text-destructive" />,
          progressValue: 100,
          badge: <Badge variant="destructive">Rejected</Badge>,
          message: 'Your verification was not approved. Please check your documents and try again.'
        };
      case 'pending':
      default:
        return {
          title: 'Verification In Progress',
          icon: <Clock className="h-5 w-5 mr-2 text-amber-500" />,
          progressValue: 33,
          badge: <Badge variant="outline" className="bg-amber-500/20 text-amber-500 border-amber-500/30">Pending</Badge>,
          message: 'Your verification is being processed. This typically takes 24-48 hours.'
        };
    }
  };

  const details = getProgressDetails();
  const submittedDate = new Date(verificationRequest.submittedAt).toLocaleDateString();

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="flex items-center text-lg">
            {details.icon}
            {details.title}
          </CardTitle>
          {details.badge}
        </div>
      </CardHeader>
      <CardContent>
        <div className="my-4">
          <Progress value={details.progressValue} className="h-2" />
        </div>
        
        <p className="text-sm text-muted-foreground mb-2">{details.message}</p>
        
        <div className="bg-muted/50 p-3 rounded-md text-sm mt-4">
          <div className="flex justify-between mb-1">
            <span className="text-muted-foreground">Submitted:</span>
            <span>{submittedDate}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-muted-foreground">Documents:</span>
            <span>{verificationRequest.documents.length} uploaded</span>
          </div>
        </div>
        
        {verificationRequest.status === 'rejected' && (
          <Button className="w-full mt-4">
            Submit New Verification
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default VerificationProgress;
