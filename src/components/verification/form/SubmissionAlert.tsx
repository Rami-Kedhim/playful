
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface SubmissionAlertProps {
  type: 'success' | 'error';
  message: string;
}

const SubmissionAlert: React.FC<SubmissionAlertProps> = ({ type, message }) => {
  return (
    <Alert variant={type === 'success' ? 'default' : 'destructive'} className="mb-6">
      {type === 'success' ? (
        <CheckCircle className="h-4 w-4" />
      ) : (
        <AlertCircle className="h-4 w-4" />
      )}
      <AlertTitle>
        {type === 'success' ? 'Success' : 'Error'}
      </AlertTitle>
      <AlertDescription>
        {message}
      </AlertDescription>
    </Alert>
  );
};

export default SubmissionAlert;
