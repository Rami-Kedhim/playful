
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck } from 'lucide-react';

interface VerificationBadgeProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const VerificationBadge: React.FC<VerificationBadgeProps> = ({ 
  size = 'md', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'text-xs py-0 px-1',
    md: 'text-sm',
    lg: 'text-base px-3 py-1'
  };
  
  return (
    <Badge 
      variant="success" 
      className={`flex items-center gap-1 ${sizeClasses[size]} ${className}`}
    >
      <ShieldCheck className={`${size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'}`} />
      Verified
    </Badge>
  );
};
