
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, CheckCircle } from 'lucide-react';

interface SubmissionAlertProps {
  type: 'error' | 'success';
  title?: string;
  message: string;
}

const SubmissionAlert = ({ type, title, message }: SubmissionAlertProps) => {
  return (
    <Alert variant={type === 'error' ? 'destructive' : 'default'} className="mb-6">
      {type === 'error' ? (
        <AlertTriangle className="h-4 w-4" />
      ) : (
        <CheckCircle className="h-4 w-4" />
      )}
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

export default SubmissionAlert;
