
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle, Info } from "lucide-react";

interface SubmissionAlertProps {
  type: 'error' | 'success' | 'info';
  title?: string;
  message: string;
}

const SubmissionAlert = ({ type, title, message }: SubmissionAlertProps) => {
  const getAlertIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-4 w-4" />;
      case 'error':
        return <AlertCircle className="h-4 w-4" />;
      case 'info':
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const getAlertClass = () => {
    switch (type) {
      case 'success':
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case 'error':
        return "bg-destructive/10 text-destructive border-destructive/20";
      case 'info':
      default:
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    }
  };

  return (
    <Alert className={`mb-6 ${getAlertClass()}`}>
      {getAlertIcon()}
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

export default SubmissionAlert;
