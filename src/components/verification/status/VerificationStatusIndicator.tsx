
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle, X, AlertTriangle, TimerReset } from 'lucide-react';
import { VerificationStatus } from '@/types/verification';

interface VerificationStatusIndicatorProps {
  status: string;
  size?: 'sm' | 'default';
}

const VerificationStatusIndicator: React.FC<VerificationStatusIndicatorProps> = ({ 
  status, 
  size = 'default' 
}) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case VerificationStatus.PENDING:
        return {
          icon: <Clock className="h-3 w-3 mr-1" />,
          label: 'Pending',
          variant: 'outline' as const
        };
      case VerificationStatus.IN_REVIEW:
        return {
          icon: <AlertTriangle className="h-3 w-3 mr-1" />,
          label: 'In Review',
          variant: 'secondary' as const
        };
      case VerificationStatus.APPROVED:
        return {
          icon: <CheckCircle className="h-3 w-3 mr-1" />,
          label: 'Approved',
          variant: 'success' as const
        };
      case VerificationStatus.REJECTED:
        return {
          icon: <X className="h-3 w-3 mr-1" />,
          label: 'Rejected',
          variant: 'destructive' as const
        };
      case VerificationStatus.EXPIRED:
        return {
          icon: <TimerReset className="h-3 w-3 mr-1" />,
          label: 'Expired',
          variant: 'outline' as const
        };
      default:
        return {
          icon: <Clock className="h-3 w-3 mr-1" />,
          label: 'Unknown',
          variant: 'outline' as const
        };
    }
  };

  const { icon, label, variant } = getStatusConfig(status);

  return (
    <Badge variant={variant} className={size === 'sm' ? 'text-xs py-0 px-2' : ''}>
      <span className="flex items-center">
        {icon}
        {label}
      </span>
    </Badge>
  );
};

export default VerificationStatusIndicator;
