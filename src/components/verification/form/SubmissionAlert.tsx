
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface SubmissionAlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
}

const SubmissionAlert: React.FC<SubmissionAlertProps> = ({ type, title, message }) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-4 w-4" />;
      case 'error':
      case 'warning':
      case 'info':
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getVariant = () => {
    switch (type) {
      case 'error':
        return 'destructive';
      case 'warning':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getDefaultTitle = () => {
    switch (type) {
      case 'success':
        return 'Success';
      case 'error':
        return 'Error';
      case 'warning':
        return 'Warning';
      case 'info':
        return 'Info';
    }
  };

  return (
    <Alert variant={getVariant()} className="mb-6">
      {getIcon()}
      <AlertTitle>{title || getDefaultTitle()}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

export default SubmissionAlert;
