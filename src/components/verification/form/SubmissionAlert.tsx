
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
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <Alert 
      variant={type === 'error' ? 'destructive' : 'default'} 
      className="mb-6"
    >
      {getIcon()}
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

export default SubmissionAlert;
