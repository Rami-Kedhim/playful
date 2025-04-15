
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, CheckCircle, InfoIcon } from 'lucide-react';

interface SubmissionAlertProps {
  type: 'success' | 'error' | 'info';
  title?: string;
  message: string;
}

const SubmissionAlert: React.FC<SubmissionAlertProps> = ({ type, title, message }) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-4 w-4" />;
      case 'error':
        return <AlertCircle className="h-4 w-4" />;
      case 'info':
      default:
        return <InfoIcon className="h-4 w-4" />;
    }
  };

  const getVariant = () => {
    switch (type) {
      case 'success':
        return 'default';
      case 'error':
        return 'destructive';
      case 'info':
      default:
        return 'default';
    }
  };

  return (
    <Alert variant={getVariant()} className="mb-4">
      {getIcon()}
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

export default SubmissionAlert;
