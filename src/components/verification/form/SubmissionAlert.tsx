
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface SubmissionAlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  title?: string;
}

const SubmissionAlert: React.FC<SubmissionAlertProps> = ({ type, message, title }) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-4 w-4" />;
      case 'error':
      case 'warning':
      case 'info':
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getVariant = () => {
    switch (type) {
      case 'success':
        return 'default';
      case 'error':
        return 'destructive';
      case 'warning':
        return 'warning';
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
