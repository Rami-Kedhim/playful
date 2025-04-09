
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ShieldCheck, AlertTriangle, CheckCircle, Info } from 'lucide-react';

interface SubmissionAlertProps {
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  title?: string;
}

const SubmissionAlert = ({ type, message, title }: SubmissionAlertProps) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-4 w-4" />;
      case 'error':
        return <AlertTriangle className="h-4 w-4" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4" />;
      case 'info':
      default:
        return <Info className="h-4 w-4" />;
    }
  };
  
  const getVariant = () => {
    switch (type) {
      case 'success':
        return 'default';
      case 'error':
        return 'destructive';
      case 'warning':
        return 'default';
      case 'info':
      default:
        return 'default';
    }
  };
  
  return (
    <Alert variant={getVariant()} className="mb-4">
      <div className="flex items-center gap-2">
        {getIcon()}
        {title && <AlertTitle>{title}</AlertTitle>}
      </div>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

export default SubmissionAlert;
