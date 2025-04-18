
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { InfoCircledIcon, CheckCircledIcon, CrossCircledIcon, UpdateIcon } from '@radix-ui/react-icons';
import { VerificationLevel } from '@/types/verification';

interface VerificationStatusProps {
  status: 'none' | 'pending' | 'approved' | 'rejected';
  level: VerificationLevel;
}

const VerificationStatus: React.FC<VerificationStatusProps> = ({ status, level }) => {
  if (status === 'none') {
    return (
      <Alert variant="default">
        <InfoCircledIcon className="h-4 w-4 mr-2" />
        <AlertTitle>Not Verified</AlertTitle>
        <AlertDescription>
          Your account is not verified. Please submit your verification documents.
        </AlertDescription>
      </Alert>
    );
  }

  if (status === 'pending') {
    return (
      <Alert variant="default" className="bg-amber-50 border-amber-200">
        <UpdateIcon className="h-4 w-4 mr-2 text-amber-500" />
        <AlertTitle className="text-amber-800">Verification in Progress</AlertTitle>
        <AlertDescription className="text-amber-700">
          Your verification documents are being reviewed. This process usually takes 1-2 business days.
        </AlertDescription>
      </Alert>
    );
  }

  if (status === 'approved') {
    return (
      <Alert variant="default" className="bg-green-50 border-green-200">
        <CheckCircledIcon className="h-4 w-4 mr-2 text-green-500" />
        <AlertTitle className="text-green-800">Verification Approved</AlertTitle>
        <AlertDescription className="text-green-700">
          Your account has been verified at the {level} level.
        </AlertDescription>
      </Alert>
    );
  }

  if (status === 'rejected') {
    return (
      <Alert variant="destructive">
        <CrossCircledIcon className="h-4 w-4 mr-2" />
        <AlertTitle>Verification Rejected</AlertTitle>
        <AlertDescription>
          Your verification was rejected. Please review the feedback and submit new documents.
        </AlertDescription>
      </Alert>
    );
  }

  return null;
};

export default VerificationStatus;
