
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';

interface SubmissionAlertProps {
  type: 'success' | 'error' | 'info';
  message: string;
  title?: string;
}

const SubmissionAlert: React.FC<SubmissionAlertProps> = ({ type, message, title }) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-4 w-4" />;
      case 'error':
        return <AlertCircle className="h-4 w-4" />;
      case 'info':
        return <Info className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };
  
  const getAlertVariant = () => {
    switch (type) {
      case 'success':
        return 'default';
      case 'error':
        return 'destructive';
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
      case 'info':
        return 'Information';
      default:
        return '';
    }
  };
  
  return (
    <Alert variant={getAlertVariant()} className="mb-4">
      {getIcon()}
      <AlertTitle>{title || getDefaultTitle()}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

export default SubmissionAlert;
