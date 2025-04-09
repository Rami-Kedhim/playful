
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Shield, ShieldCheck, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface VerificationBadgeProps {
  level: 'none' | 'basic' | 'enhanced' | 'premium';
  size?: 'sm' | 'md' | 'lg';
  showTooltip?: boolean;
  className?: string;
}

const VerificationBadge = ({ level, size = 'md', showTooltip = true, className }: VerificationBadgeProps) => {
  if (level === 'none') return null;
  
  const getBadgeContent = () => {
    const sizeClasses = {
      sm: 'text-xs py-0.5 px-1.5',
      md: 'text-xs py-1 px-2',
      lg: 'text-sm py-1 px-2.5',
    };
    
    const iconSize = size === 'sm' ? 'h-3 w-3 mr-1' : size === 'lg' ? 'h-5 w-5 mr-2' : 'h-4 w-4 mr-1';
    
    switch (level) {
      case 'basic':
        return (
          <Badge 
            variant="outline" 
            className={`bg-blue-500/10 text-blue-500 border-blue-500/30 ${sizeClasses[size]} ${className || ''}`}
          >
            <Shield className={iconSize} /> Verified
          </Badge>
        );
      case 'enhanced':
        return (
          <Badge 
            variant="outline" 
            className={`bg-green-500/10 text-green-500 border-green-500/30 ${sizeClasses[size]} ${className || ''}`}
          >
            <ShieldCheck className={iconSize} /> Enhanced Verified
          </Badge>
        );
      case 'premium':
        return (
          <Badge 
            className={`bg-gradient-to-r from-amber-500 to-purple-500 border-0 ${sizeClasses[size]} ${className || ''}`}
          >
            <CheckCircle2 className={iconSize} /> Premium Verified
          </Badge>
        );
      default:
        return null;
    }
  };
  
  const getTooltipContent = () => {
    switch (level) {
      case 'basic':
        return 'This profile has completed basic identity verification';
      case 'enhanced':
        return 'This profile has completed enhanced verification with additional security checks';
      case 'premium':
        return 'This profile has our highest level of verification with premium security features';
      default:
        return '';
    }
  };
  
  const badge = getBadgeContent();
  
  if (!badge) return null;
  
  if (!showTooltip) return badge;
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {badge}
        </TooltipTrigger>
        <TooltipContent>
          <p>{getTooltipContent()}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default VerificationBadge;
