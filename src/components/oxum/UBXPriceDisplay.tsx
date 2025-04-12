
import React from 'react';
import { GLOBAL_UBX_RATE } from '@/utils/oxum/globalPricing';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from 'lucide-react';

interface UBXPriceDisplayProps {
  amount?: number;
  isGlobalPrice?: boolean;
  showConversion?: boolean;
  showTooltip?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'success' | 'warning' | 'error';
  className?: string;
}

/**
 * A component that displays UBX prices with Oxum Rule #001 enforcement
 * Always enforces the global pricing rule for boost prices
 */
const UBXPriceDisplay: React.FC<UBXPriceDisplayProps> = ({
  amount,
  isGlobalPrice = false,
  showConversion = false,
  showTooltip = false,
  size = 'md',
  variant = 'default',
  className
}) => {
  // If this is a global price or no amount provided, enforce the global rate
  const displayAmount = isGlobalPrice || amount === undefined ? GLOBAL_UBX_RATE : amount;
  
  // Convert to local currency if needed (simple placeholder - would integrate with currency service)
  const localEquivalent = showConversion ? `≈ $${(displayAmount * 0.01).toFixed(2)} USD` : null;
  
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
  
  const priceDisplay = (
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
  
  if (showTooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-1 cursor-help">
              {priceDisplay}
              <Info className="h-3 w-3 text-muted-foreground" />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p className="max-w-xs text-xs">
              Following Oxum Rule #001 on Global Price Symmetry, boost pricing is uniform worldwide.
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
  
  return (
    <div className="flex items-center gap-2">
      {priceDisplay}
      {showConversion && localEquivalent && (
        <span className="text-muted-foreground text-sm">{localEquivalent}</span>
      )}
    </div>
  );
};

export default UBXPriceDisplay;
