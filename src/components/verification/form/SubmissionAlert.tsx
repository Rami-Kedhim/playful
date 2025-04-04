
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface SubmissionAlertProps {
  message: string;
  type: 'error' | 'success';
  title?: string;
}

const SubmissionAlert = ({ message, type, title }: SubmissionAlertProps) => {
  if (!message) return null;
  
  return (
    <Alert variant={type === 'error' ? "destructive" : "default"} className="mb-6">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{title || (type === 'error' ? 'Submission Error' : 'Success')}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

export default SubmissionAlert;
