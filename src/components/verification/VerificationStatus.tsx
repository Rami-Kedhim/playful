
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle, Clock, Shield } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useVerificationStatus } from './hooks/useVerificationStatus';
import { VerificationLevel, VerificationStatus as VerificationStatusEnum } from '@/types/verification';

const VerificationStatus: React.FC = () => {
  const { status: verificationStatus, loading, error, verificationRequest } = useVerificationStatus();
  
  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }
  
  const getStatusBadge = () => {
    switch (verificationStatus) {
      case VerificationStatusEnum.APPROVED:
        return <Badge className="bg-green-500">Verified</Badge>;
      case VerificationStatusEnum.PENDING:
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case VerificationStatusEnum.IN_REVIEW:
        return <Badge className="bg-blue-500">In Review</Badge>;
      case VerificationStatusEnum.REJECTED:
        return <Badge className="bg-red-500">Rejected</Badge>;
      default:
        return <Badge>Not Verified</Badge>;
    }
  };
  
  if (!verificationRequest) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Verification Status
            <Badge variant="outline">Not Submitted</Badge>
          </CardTitle>
          <CardDescription>You have not submitted any verification documents yet.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <p className="text-sm text-muted-foreground">
              Verify your identity to unlock all features and build trust with other users.
            </p>
            <Button>Start Verification</Button>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Verification Status
          {getStatusBadge()}
        </CardTitle>
        <CardDescription>
          {verificationRequest.requested_level === VerificationLevel.BASIC 
            ? "Basic verification" 
            : verificationRequest.requested_level === VerificationLevel.ENHANCED
              ? "Enhanced verification"
              : "Premium verification"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {verificationStatus === VerificationStatusEnum.PENDING && (
            <Alert>
              <Clock className="h-4 w-4" />
              <AlertTitle>Pending Review</AlertTitle>
              <AlertDescription>
                Your verification is pending review. This typically takes 1-3 business days.
              </AlertDescription>
            </Alert>
          )}
          
          {verificationStatus === VerificationStatusEnum.APPROVED && (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <AlertTitle className="text-green-700">Verification Approved</AlertTitle>
              <AlertDescription className="text-green-600">
                Your account has been verified. You now have access to all features.
              </AlertDescription>
            </Alert>
          )}
          
          {verificationStatus === VerificationStatusEnum.REJECTED && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Verification Rejected</AlertTitle>
              <AlertDescription>
                {verificationRequest.rejectionReason || "Your verification was rejected. Please submit clearer documents."}
              </AlertDescription>
            </Alert>
          )}
          
          {verificationRequest.documents && verificationRequest.documents.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-semibold mb-2">Submitted Documents</h3>
              <ul className="space-y-2">
                {verificationRequest.documents.map((doc, index) => (
                  <li key={index} className="text-sm flex items-center">
                    <Shield className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="capitalize">{doc.documentType.replace('_', ' ')}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {verificationStatus === VerificationStatusEnum.REJECTED && (
            <Button className="w-full mt-4">Submit New Verification</Button>
          )}
          
          {verificationRequest.submittedAt && (
            <p className="text-xs text-muted-foreground mt-4">
              Submitted on: {new Date(verificationRequest.submittedAt).toLocaleDateString()}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default VerificationStatus;
