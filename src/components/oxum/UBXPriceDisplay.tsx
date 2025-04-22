
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { GLOBAL_UBX_RATE, convertUbxToLocalCurrency } from '@/utils/oxum/globalPricing';

interface UBXPriceDisplayProps {
  amount: number;
  size?: 'sm' | 'md' | 'lg';
  showConversion?: boolean;
  isGlobalPrice?: boolean;
}

const UBXPriceDisplay: React.FC<UBXPriceDisplayProps> = ({
  amount,
  size = 'md',
  showConversion = true,
  isGlobalPrice = false
}) => {
  // Size classes for different sizes
  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base font-medium',
  };
  
  const priceClasses = `${sizeClasses[size]} ${isGlobalPrice ? 'font-medium text-primary' : ''}`;
  
  if (!showConversion) {
    return <span className={priceClasses}>{amount} UBX</span>;
  }
  
  // For tooltip conversion
  const usdPrice = convertUbxToLocalCurrency(amount, 'USD');
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className={`${priceClasses} cursor-help`}>{amount} UBX</span>
        </TooltipTrigger>
        <TooltipContent side="top">
          <div className="text-xs">
            <p>≈ {usdPrice}</p>
            {isGlobalPrice && (
              <p className="text-muted-foreground mt-1">Fixed global price (Oxum Rule #001)</p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default UBXPriceDisplay;
