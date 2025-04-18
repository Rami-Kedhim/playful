
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Shield, ShieldCheck, ShieldAlert } from 'lucide-react';

interface VerificationLevelProps {
  level: 'basic' | 'verified' | 'premium' | string;
  size?: 'sm' | 'md' | 'lg';
}

const VerificationLevel: React.FC<VerificationLevelProps> = ({
  level = 'basic',
  size = 'md'
}) => {
  // Determine badge appearance based on verification level
  let icon;
  let badgeVariant: 'default' | 'secondary' | 'destructive' | 'outline' = 'outline';
  let badgeText = 'Basic';
  
  switch (level) {
    case 'premium':
      icon = <ShieldCheck className="mr-1 h-3.5 w-3.5 text-primary fill-primary" />;
      badgeVariant = 'default';
      badgeText = 'Premium';
      break;
    case 'verified':
      icon = <ShieldCheck className="mr-1 h-3.5 w-3.5" />;
      badgeVariant = 'secondary';
      badgeText = 'Verified';
      break;
    case 'basic':
      icon = <Shield className="mr-1 h-3.5 w-3.5" />;
      badgeVariant = 'outline';
      badgeText = 'Basic';
      break;
    default:
      icon = <ShieldAlert className="mr-1 h-3.5 w-3.5" />;
      badgeVariant = 'outline';
      badgeText = 'Basic';
  }
  
  // Adjust size
  const sizeClasses = {
    sm: 'text-xs py-0 h-5',
    md: 'text-sm py-0.5',
    lg: 'text-base py-1'
  }[size];
  
  return (
    <Badge 
      variant={badgeVariant} 
      className={`flex items-center ${sizeClasses}`}
    >
      {icon}
      {badgeText}
    </Badge>
  );
};

export default VerificationLevel;
