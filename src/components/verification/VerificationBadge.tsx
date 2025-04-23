
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Shield, ShieldCheck, ShieldAlert } from 'lucide-react';

interface VerificationBadgeProps {
  level: 'none' | 'basic' | 'enhanced' | 'premium' | string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const VerificationBadge: React.FC<VerificationBadgeProps> = ({ 
  level, 
  size = 'sm',
  showLabel = true
}) => {
  // Map string levels to our standard levels
  let standardLevel = level;
  if (level === 'verified') standardLevel = 'basic';
  if (!level || level === 'unverified') standardLevel = 'none';
  
  // Determine icon and text based on level
  const getIcon = () => {
    switch (standardLevel) {
      case 'none':
        return <ShieldAlert className={iconSizes[size]} />;
      case 'basic':
        return <Shield className={iconSizes[size]} />;
      case 'enhanced':
      case 'premium':
        return <ShieldCheck className={iconSizes[size]} />;
      default:
        return <Shield className={iconSizes[size]} />;
    }
  };
  
  const getText = () => {
    switch (standardLevel) {
      case 'none':
        return 'Not Verified';
      case 'basic':
        return 'Verified';
      case 'enhanced':
        return 'Enhanced';
      case 'premium':
        return 'Premium';
      default:
        return 'Unverified';
    }
  };
  
  const getVariant = () => {
    switch (standardLevel) {
      case 'none':
        return 'outline';
      case 'basic':
        return 'success';
      case 'enhanced':
        return 'success';
      case 'premium':
        return 'success';
      default:
        return 'outline';
    }
  };
  
  // Size maps
  const iconSizes: Record<string, string> = {
    'sm': 'h-3 w-3',
    'md': 'h-4 w-4',
    'lg': 'h-5 w-5'
  };
  
  const containerSizes: Record<string, string> = {
    'sm': 'text-xs',
    'md': 'text-sm',
    'lg': 'text-base'
  };
  
  return (
    <Badge variant={getVariant()} className={`gap-1 font-normal ${containerSizes[size]}`}>
      {getIcon()}
      {showLabel && <span>{getText()}</span>}
    </Badge>
  );
};

export default VerificationBadge;
