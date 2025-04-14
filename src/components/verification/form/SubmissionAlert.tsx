
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle, AlertTriangle } from "lucide-react";

interface SubmissionAlertProps {
  type: 'success' | 'error' | 'warning';
  title?: string;
  message: string;
}

const SubmissionAlert: React.FC<SubmissionAlertProps> = ({ 
  type, 
  title, 
  message 
}) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-4 w-4" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4" />;
      case 'error':
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getVariant = () => {
    switch (type) {
      case 'success':
        return 'success';
      case 'warning':
        return 'warning';
      case 'error':
      default:
        return 'destructive';
    }
  };

  const getDefaultTitle = () => {
    switch (type) {
      case 'success':
        return 'Success';
      case 'warning':
        return 'Warning';
      case 'error':
      default:
        return 'Error';
    }
  };

  return (
    <Alert variant={getVariant()}>
      {getIcon()}
      {(title || type !== 'success') && (
        <AlertTitle>{title || getDefaultTitle()}</AlertTitle>
      )}
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

export default SubmissionAlert;
