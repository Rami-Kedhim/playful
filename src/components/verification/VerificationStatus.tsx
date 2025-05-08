
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { VerificationStatus as VerificationStatusEnum } from '@/types/verification';

interface VerificationStatusProps {
  status: string;
  level?: string;
  onRequestVerification?: () => void;
  rejectionReason?: string;
  requestId?: string;
}

const VerificationEmptyState = ({ onRequestVerification }: { onRequestVerification?: () => void }) => (
  <div className="text-center p-6">
    <div className="mx-auto bg-muted rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
      <AlertCircle className="h-6 w-6 text-muted-foreground" />
    </div>
    <h3 className="font-medium text-lg mb-2">Not Verified</h3>
    <p className="text-muted-foreground mb-4">
      Your account is not verified. Verification increases trust and visibility.
    </p>
    {onRequestVerification && (
      <Button onClick={onRequestVerification}>Request Verification</Button>
    )}
  </div>
);

const VerificationPendingState = ({ requestId }: { requestId?: string }) => (
  <div className="text-center p-6">
    <div className="mx-auto bg-yellow-100 dark:bg-yellow-900/30 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
      <Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
    </div>
    <h3 className="font-medium text-lg mb-2">Verification Pending</h3>
    <p className="text-muted-foreground mb-4">
      Your verification request is being processed. This usually takes 1-2 business days.
    </p>
    {requestId && (
      <div className="text-xs text-muted-foreground">
        Request ID: {requestId}
      </div>
    )}
  </div>
);

const VerificationApprovedState = ({ level }: { level?: string }) => (
  <div className="text-center p-6">
    <div className="mx-auto bg-green-100 dark:bg-green-900/30 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
      <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
    </div>
    <h3 className="font-medium text-lg mb-2">Verified Account</h3>
    <p className="text-muted-foreground mb-4">
      Your account is verified. {level && `Verification level: ${level}`}
    </p>
    <div>
      <Progress value={100} className="bg-muted h-2" />
      <div className="flex justify-between mt-2 text-xs text-muted-foreground">
        <span>Verification complete</span>
        <span>100%</span>
      </div>
    </div>
  </div>
);

const VerificationRejectedState = ({ rejectionReason, onRequestVerification }: { 
  rejectionReason?: string;
  onRequestVerification?: () => void;
}) => (
  <div className="text-center p-6">
    <div className="mx-auto bg-red-100 dark:bg-red-900/30 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
      <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
    </div>
    <h3 className="font-medium text-lg mb-2">Verification Rejected</h3>
    <p className="text-muted-foreground mb-4">
      {rejectionReason || 'Your verification request was rejected. Please try again with the correct documentation.'}
    </p>
    {onRequestVerification && (
      <Button onClick={onRequestVerification}>Try Again</Button>
    )}
  </div>
);

const renderVerificationStatus = (props: VerificationStatusProps) => {
  const { status, level, onRequestVerification, rejectionReason, requestId } = props;
  
  switch(status) {
    case 'NONE':
      return <VerificationEmptyState onRequestVerification={onRequestVerification} />;
    case 'PENDING':
    case 'IN_REVIEW':
      return <VerificationPendingState requestId={requestId} />;
    case 'APPROVED':
      return <VerificationApprovedState level={level} />;
    case 'REJECTED':
      return <VerificationRejectedState 
        rejectionReason={rejectionReason} 
        onRequestVerification={onRequestVerification} 
      />;
    case 'EXPIRED':
      return <VerificationRejectedState 
        rejectionReason="Your verification has expired. Please submit a new verification request." 
        onRequestVerification={onRequestVerification} 
      />;
    default:
      return <VerificationEmptyState onRequestVerification={onRequestVerification} />;
  }
};

const VerificationStatus = (props: VerificationStatusProps) => {
  return (
    <Card>
      <CardContent className="px-0 py-0">
        <Tabs defaultValue="status">
          <TabsList className="w-full rounded-none border-b">
            <TabsTrigger value="status" className="flex-1">Status</TabsTrigger>
            <TabsTrigger value="upgrade" className="flex-1">Upgrade</TabsTrigger>
          </TabsList>
          <TabsContent value="status" className="m-0">
            {renderVerificationStatus(props)}
          </TabsContent>
          <TabsContent value="upgrade" className="m-0 p-6">
            <h3 className="font-medium text-lg mb-2">Upgrade Verification</h3>
            <p className="text-muted-foreground mb-4">
              Upgrade your verification level to get more features and visibility.
            </p>
            <Button disabled={props.status !== 'APPROVED'}>Upgrade Now</Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default VerificationStatus;
