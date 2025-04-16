
import React from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface SubmissionAlertProps {
  type: 'success' | 'error';
  title?: string;
  message: string;
}

const SubmissionAlert: React.FC<SubmissionAlertProps> = ({ type, title, message }) => {
  const variant = type === 'success' ? 'default' : 'destructive';
  
  return (
    <Alert variant={variant} className="mb-4">
      {type === 'success' ? (
        <CheckCircle className="h-4 w-4" />
      ) : (
        <AlertCircle className="h-4 w-4" />
      )}
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription>
        {message}
      </AlertDescription>
    </Alert>
  );
};

export default SubmissionAlert;
