
import React from 'react';
import { Shield, ShieldCheck, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';
import { VerificationLevel } from '@/types/verification';

interface VerificationBadgeProps {
  level: VerificationLevel | string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const VerificationBadge: React.FC<VerificationBadgeProps> = ({
  level,
  showText = false,
  size = 'md',
  className
}) => {
  const levelStyles = {
    [VerificationLevel.NONE]: {
      bg: 'bg-gray-100 dark:bg-gray-800',
      text: 'text-gray-500',
      icon: <Shield className="h-full w-full" />
    },
    [VerificationLevel.BASIC]: {
      bg: 'bg-blue-100 dark:bg-blue-900/30',
      text: 'text-blue-600 dark:text-blue-400',
      icon: <ShieldCheck className="h-full w-full" />
    },
    [VerificationLevel.ENHANCED]: {
      bg: 'bg-green-100 dark:bg-green-900/30',
      text: 'text-green-600 dark:text-green-400',
      icon: <ShieldCheck className="h-full w-full" />
    },
    [VerificationLevel.PREMIUM]: {
      bg: 'bg-purple-100 dark:bg-purple-900/30',
      text: 'text-purple-600 dark:text-purple-400',
      icon: <ShieldCheck className="h-full w-full" />
    }
  };

  const sizeStyles = {
    sm: 'h-4 w-4 text-xs',
    md: 'h-5 w-5 text-sm',
    lg: 'h-6 w-6 text-base'
  };

  const style = levelStyles[level as VerificationLevel] || levelStyles[VerificationLevel.NONE];

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className={cn('rounded-full p-1', style.bg, style.text, sizeStyles[size])}>
        {style.icon}
      </div>
      
      {showText && (
        <span className={cn('font-medium', style.text)}>
          {level === VerificationLevel.NONE ? 'Not Verified' : `${level} Verified`}
        </span>
      )}
    </div>
  );
};

export default VerificationBadge;
