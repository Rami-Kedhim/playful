
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, Shield, ShieldAlert, BadgeCheck } from 'lucide-react';
import { VerificationLevel } from '@/types/verification';

export interface VerificationBadgeProps {
  level: VerificationLevel | string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showTooltip?: boolean;
}

const VerificationBadge: React.FC<VerificationBadgeProps> = ({ 
  level, 
  showLabel = true,
  size = 'md',
  showTooltip = false
}) => {
  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  };
  
  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };
  
  const getVerificationDetails = () => {
    switch (level) {
      case 'premium':
        return {
          icon: <ShieldCheck className={`${iconSizes[size]} mr-1 fill-green-300`} />,
          label: 'Platinum Verified',
          className: 'bg-green-600 text-white hover:bg-green-700'
        };
      case 'enhanced':
      case 'standard':
        return {
          icon: <Shield className={`${iconSizes[size]} mr-1 fill-blue-300`} />,
          label: 'Enhanced Verified',
          className: 'bg-blue-600 text-white hover:bg-blue-700'
        };
      case 'basic':
        return {
          icon: <ShieldAlert className={`${iconSizes[size]} mr-1 fill-amber-300`} />,
          label: 'Basic Verified',
          className: 'bg-amber-500 text-white hover:bg-amber-600'
        };
      default:
        return {
          icon: <BadgeCheck className={`${iconSizes[size]} mr-1`} />,
          label: 'Unverified',
          className: 'bg-gray-500 text-white hover:bg-gray-600'
        };
    }
  };
  
  const { icon, label, className } = getVerificationDetails();
  
  if (level === 'none') return null;
  
  return (
    <Badge className={`${className} ${textSizes[size]} flex items-center`}>
      {icon}
      {showLabel && <span>{label}</span>}
    </Badge>
  );
};

export default VerificationBadge;
