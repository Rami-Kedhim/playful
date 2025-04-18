
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Clock, AlertTriangle, Shield } from 'lucide-react';

interface VerificationStatusIndicatorProps {
  status: 'unverified' | 'pending' | 'verified' | 'rejected';
  size?: 'sm' | 'md' | 'lg';
}

const VerificationStatusIndicator: React.FC<VerificationStatusIndicatorProps> = ({
  status,
  size = 'md'
}) => {
  // Define styling based on status
  const getStatusConfig = () => {
    switch (status) {
      case 'verified':
        return {
          icon: <CheckCircle2 className="mr-1 h-3.5 w-3.5" />,
          label: 'Verified',
          variant: 'success' as const
        };
      case 'pending':
        return {
          icon: <Clock className="mr-1 h-3.5 w-3.5" />,
          label: 'Pending',
          variant: 'warning' as const
        };
      case 'rejected':
        return {
          icon: <AlertTriangle className="mr-1 h-3.5 w-3.5" />,
          label: 'Rejected',
          variant: 'destructive' as const
        };
      default:
        return {
          icon: <Shield className="mr-1 h-3.5 w-3.5" />,
          label: 'Unverified',
          variant: 'outline' as const
        };
    }
  };
  
  const { icon, label, variant } = getStatusConfig();
  
  // Size classes
  const sizeClasses = {
    sm: 'text-xs py-0 h-5',
    md: 'text-sm py-0.5',
    lg: 'text-base py-1'
  }[size];
  
  return (
    <Badge 
      variant={variant} 
      className={`flex items-center ${sizeClasses}`}
    >
      {icon}
      {label}
    </Badge>
  );
};

export default VerificationStatusIndicator;
