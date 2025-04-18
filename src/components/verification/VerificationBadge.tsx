
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Shield, ShieldCheck, ShieldOff } from 'lucide-react';

type VerificationLevel = 'none' | 'basic' | 'verified' | 'premium';

interface VerificationBadgeProps {
  level: VerificationLevel;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  showLabel?: boolean;
  className?: string;
}

export const VerificationBadge: React.FC<VerificationBadgeProps> = ({
  level,
  size = 'md',
  showIcon = true,
  showLabel = true,
  className = '',
}) => {
  if (level === 'none') return null;

  let icon = null;
  let label = '';
  let variant: 'default' | 'secondary' | 'outline' | 'destructive' = 'default';
  let color = '';

  switch (level) {
    case 'basic':
      icon = <Shield className="h-3.5 w-3.5 mr-1" />;
      label = 'Basic';
      variant = 'secondary';
      break;
    case 'verified':
      icon = <ShieldCheck className="h-3.5 w-3.5 mr-1" />;
      label = 'Verified';
      variant = 'default';
      color = 'bg-green-600 hover:bg-green-700';
      break;
    case 'premium':
      icon = <ShieldCheck className="h-3.5 w-3.5 mr-1" />;
      label = 'Premium';
      variant = 'default';
      color = 'bg-purple-600 hover:bg-purple-700';
      break;
    default:
      icon = <ShieldOff className="h-3.5 w-3.5 mr-1" />;
      label = 'Unverified';
      variant = 'outline';
  }

  const sizeClasses = size === 'sm' 
    ? 'text-xs px-1.5 py-0' 
    : size === 'lg' 
      ? 'text-base px-3 py-1' 
      : '';

  return (
    <Badge
      variant={variant}
      className={`flex items-center ${sizeClasses} ${color} ${className}`}
    >
      {showIcon && icon}
      {showLabel && <span>{label}</span>}
    </Badge>
  );
};

export default VerificationBadge;
