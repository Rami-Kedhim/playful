
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';

interface SubmissionAlertProps {
  type: 'success' | 'error' | 'info' | 'warning';
  title?: string;
  message: string;
  className?: string;
}

const SubmissionAlert: React.FC<SubmissionAlertProps> = ({
  type,
  title,
  message,
  className = ''
}) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-4 w-4" />;
      case 'error':
        return <AlertCircle className="h-4 w-4" />;
      case 'info':
      case 'warning':
      default:
        return <Info className="h-4 w-4" />;
    }
  };
  
  const getAlertClass = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 text-green-800 border-green-200';
      case 'error':
        return 'bg-red-50 text-red-800 border-red-200';
      case 'warning':
        return 'bg-yellow-50 text-yellow-800 border-yellow-200';
      case 'info':
      default:
        return 'bg-blue-50 text-blue-800 border-blue-200';
    }
  };
  
  return (
    <Alert className={`${getAlertClass()} ${className}`}>
      <div className="flex items-start">
        <div className="mr-2 mt-0.5">{getIcon()}</div>
        <div>
          {title && <AlertTitle>{title}</AlertTitle>}
          <AlertDescription>{message}</AlertDescription>
        </div>
      </div>
    </Alert>
  );
};

export default SubmissionAlert;
