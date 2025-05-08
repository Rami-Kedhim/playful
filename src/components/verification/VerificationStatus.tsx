
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { VerificationStatus as VerificationStatusEnum, VERIFICATION_LEVELS } from '@/types/verification';
import { useVerificationStatus } from './hooks/useVerificationStatus';
import { Clock, CheckCircle, XCircle, AlertCircle, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/utils/date-utils';

const VerificationStatus = ({ onRequestVerification }) => {
  const { status, verificationRequest, loading, error } = useVerificationStatus();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-destructive bg-destructive/5">
        <CardHeader>
          <CardTitle className="flex items-center text-destructive">
            <AlertCircle className="mr-2 h-5 w-5" />
            Error
          </CardTitle>
          <CardDescription>
            There was an error loading your verification status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{error}</p>
        </CardContent>
        <CardFooter>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </CardFooter>
      </Card>
    );
  }

  if (!status || !verificationRequest) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Verification Status</CardTitle>
          <CardDescription>You haven't requested verification yet</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Verifying your profile helps establish trust with other users and unlocks additional features.
          </p>
        </CardContent>
        <CardFooter>
          <Button onClick={onRequestVerification}>Request Verification</Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Verification Status</CardTitle>
            <CardDescription>
              {verificationRequest.requested_level ? 
                `You requested ${verificationRequest.requested_level} verification` : 
                `You requested ${VERIFICATION_LEVELS.BASIC} verification`}
            </CardDescription>
          </div>
          <StatusBadge status={status} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-1">Submitted</h4>
            <p className="text-sm text-muted-foreground">
              {formatDate(verificationRequest.submittedAt || verificationRequest.created_at || new Date().toISOString())}
            </p>
          </div>

          {verificationRequest.documents && verificationRequest.documents.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-1">Documents</h4>
              <div className="flex flex-wrap gap-2">
                {verificationRequest.documents.map((doc) => (
                  <Badge key={doc.id} variant="outline" className="flex items-center">
                    <FileText className="h-3 w-3 mr-1" />
                    {doc.type || doc.documentType || "Document"}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {(verificationRequest.rejectionReason || verificationRequest.reviewer_notes) && (
            <div>
              <h4 className="text-sm font-medium text-destructive mb-1">Feedback</h4>
              <p className="text-sm text-destructive/80 bg-destructive/5 p-3 rounded-md">
                {verificationRequest.rejectionReason || verificationRequest.reviewer_notes}
              </p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        {status === "rejected" && (
          <Button onClick={onRequestVerification}>Submit Again</Button>
        )}
      </CardFooter>
    </Card>
  );
};

const StatusBadge = ({ status }) => {
  switch (status) {
    case VerificationStatusEnum.PENDING:
      return <Badge variant="outline" className="flex items-center"><Clock className="h-3 w-3 mr-1" /> Pending</Badge>;
    case VerificationStatusEnum.IN_REVIEW:
      return <Badge variant="secondary" className="flex items-center"><Clock className="h-3 w-3 mr-1" /> In Review</Badge>;
    case VerificationStatusEnum.APPROVED:
      return <Badge variant="success" className="flex items-center"><CheckCircle className="h-3 w-3 mr-1" /> Approved</Badge>;
    case VerificationStatusEnum.REJECTED:
      return <Badge variant="destructive" className="flex items-center"><XCircle className="h-3 w-3 mr-1" /> Rejected</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

export default VerificationStatus;
