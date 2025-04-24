
import { Alert, AlertTitle } from '@/components/ui/alert';
import { Shield } from 'lucide-react';

interface SubmissionAlertProps {
  type: 'error' | 'success';
  title?: string;
  message: string;
}

const SubmissionAlert = ({ type, title, message }: SubmissionAlertProps) => {
  return (
    <Alert variant={type === 'error' ? 'destructive' : 'default'} className="mb-6">
      <Shield className="h-4 w-4" />
      {title && <AlertTitle>{title}</AlertTitle>}
      <p className="text-sm">{message}</p>
    </Alert>
  );
};

export default SubmissionAlert;
