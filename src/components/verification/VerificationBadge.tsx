
import React from 'react';
import { Shield, ShieldCheck, ShieldAlert } from "lucide-react";
import { Badge, BadgeProps } from "@/components/ui/badge";

export interface VerificationBadgeProps extends Omit<BadgeProps, 'children'> {
  level: 'basic' | 'advanced' | 'premium';
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const VerificationBadge: React.FC<VerificationBadgeProps> = ({ 
  level, 
  showText = true,
  size = 'md',
  className,
  ...props
}) => {
  let icon;
  let badgeContent;
  let badgeStyles = '';
  
  // Icon and text based on verification level
  switch (level) {
    case 'premium':
      icon = <ShieldCheck className={`${size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'}`} />;
      badgeContent = 'Premium Verified';
      badgeStyles = 'bg-gradient-to-r from-amber-400 to-yellow-600 text-white border-amber-500';
      break;
    case 'advanced':
      icon = <Shield className={`${size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'}`} />;
      badgeContent = 'Advanced Verified';
      badgeStyles = 'bg-green-600 border-green-700 text-white';
      break;
    case 'basic':
    default:
      icon = <ShieldAlert className={`${size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'}`} />;
      badgeContent = 'Basic Verified';
      badgeStyles = 'bg-blue-600 border-blue-700 text-white';
      break;
  }
  
  return (
    <Badge 
      className={`${badgeStyles} ${className || ''} ${size === 'sm' ? 'text-xs py-0 px-1.5' : size === 'lg' ? 'text-sm py-1 px-3' : 'py-0.5 px-2'}`}
      {...props}
    >
      {icon}
      {showText && <span className="ml-1">{badgeContent}</span>}
    </Badge>
  );
};

export default VerificationBadge;
