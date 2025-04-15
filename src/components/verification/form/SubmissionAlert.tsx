
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, CheckCircle } from 'lucide-react';

interface SubmissionAlertProps {
  type: 'success' | 'error';
  title?: string;
  message: string;
}

const SubmissionAlert: React.FC<SubmissionAlertProps> = ({ type, title, message }) => {
  const isError = type === 'error';
  const Icon = isError ? AlertTriangle : CheckCircle;
  const defaultTitle = isError ? 'Error' : 'Success';

  return (
    <Alert variant={isError ? 'destructive' : 'default'} className="mb-6">
      <Icon className="h-4 w-4" />
      <AlertTitle>{title || defaultTitle}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

export default SubmissionAlert;
