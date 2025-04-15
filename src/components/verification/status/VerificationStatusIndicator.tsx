
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';
import { VerificationStatus } from '@/types/escort';

interface VerificationStatusIndicatorProps {
  status: VerificationStatus;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

const VerificationStatusIndicator = ({ 
  status, 
  size = 'md', 
  showLabel = true,
  className = ''
}: VerificationStatusIndicatorProps) => {
  const sizeClasses = {
    sm: 'text-xs py-0.5 px-1.5',
    md: 'text-sm py-1 px-2',
    lg: 'text-sm py-1.5 px-2.5',
  };

  const iconSize = size === 'sm' ? 'h-3 w-3 mr-1' : size === 'lg' ? 'h-5 w-5 mr-1.5' : 'h-4 w-4 mr-1';

  switch (status) {
    case 'approved':
      return (
        <Badge 
          variant="outline" 
          className={`bg-green-500/10 text-green-500 border-green-500/30 ${sizeClasses[size]} ${className}`}
        >
          <CheckCircle className={iconSize} />
          {showLabel && 'Approved'}
        </Badge>
      );
    case 'rejected':
      return (
        <Badge 
          variant="outline" 
          className={`bg-red-500/10 text-red-500 border-red-500/30 ${sizeClasses[size]} ${className}`}
        >
          <XCircle className={iconSize} />
          {showLabel && 'Rejected'}
        </Badge>
      );
    case 'in_review':
      return (
        <Badge 
          variant="outline" 
          className={`bg-blue-500/10 text-blue-500 border-blue-500/30 ${sizeClasses[size]} ${className}`}
        >
          <Clock className={`${iconSize} animate-pulse`} />
          {showLabel && 'In Review'}
        </Badge>
      );
    case 'pending':
      return (
        <Badge 
          variant="outline" 
          className={`bg-amber-500/10 text-amber-500 border-amber-500/30 ${sizeClasses[size]} ${className}`}
        >
          <Clock className={iconSize} />
          {showLabel && 'Pending'}
        </Badge>
      );
    default:
      return (
        <Badge 
          variant="outline" 
          className={`bg-gray-500/10 text-gray-500 border-gray-500/30 ${sizeClasses[size]} ${className}`}
        >
          <AlertTriangle className={iconSize} />
          {showLabel && 'Unknown'}
        </Badge>
      );
  }
};

export default VerificationStatusIndicator;
