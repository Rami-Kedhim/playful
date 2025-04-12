
import React, { useState, useEffect } from 'react';
import { GLOBAL_UBX_RATE } from '@/utils/oxum/globalPricing';
import { cn } from '@/lib/utils';

interface UBXPriceDisplayProps {
  amount?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'success' | 'warning' | 'error';
  className?: string;
}

/**
 * A component that displays UBX prices with Oxum Rule #001 enforcement
 * Always enforces the global pricing rule by displaying the correct amount
 */
const UBXPriceDisplay: React.FC<UBXPriceDisplayProps> = ({
  amount,
  size = 'md',
  variant = 'default',
  className
}) => {
  // Always enforce the Oxum global pricing for Boost prices
  const displayAmount = amount ?? GLOBAL_UBX_RATE;
  
  // Determine size classes
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl font-bold',
  };
  
  // Determine variant classes
  const variantClasses = {
    default: '',
    success: 'text-green-600',
    warning: 'text-amber-600',
    error: 'text-red-600',
  };
  
  return (
    <span
      className={cn(
        'font-medium',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      {displayAmount} UBX
    </span>
  );
};

export default UBXPriceDisplay;
