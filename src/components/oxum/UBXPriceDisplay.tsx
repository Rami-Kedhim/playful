
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { CircleDollarSign, Shield } from 'lucide-react';

interface UBXPriceDisplayProps {
  amount: number;
  size?: 'sm' | 'md' | 'lg';
  isGlobalPrice?: boolean;
  showConversion?: boolean;
  className?: string;
}

/**
 * Component for displaying UBX prices with Oxum Rule compliance indicators
 */
const UBXPriceDisplay: React.FC<UBXPriceDisplayProps> = ({
  amount,
  size = 'md',
  isGlobalPrice = false,
  showConversion = false,
  className = '',
}) => {
  // Approximate USD conversion rate
  const ubxToUsdRate = 0.005; // 1 UBX ≈ $0.005 USD
  const usdValue = amount * ubxToUsdRate;
  
  const sizeClasses = {
    sm: 'text-xs py-0',
    md: 'text-sm py-0.5',
    lg: 'text-base py-1',
  };
  
  const priceDisplay = (
    <span className={`font-medium ${className}`}>
      {amount} UBX
    </span>
  );
  
  // For Oxum Rule compliant prices (i.e., the global boosting price)
  if (isGlobalPrice) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge 
              variant="outline" 
              className={`flex items-center gap-1 bg-green-50 text-green-800 border-green-200
                dark:bg-green-900/20 dark:text-green-400 dark:border-green-800
                ${sizeClasses[size]}`}
            >
              <Shield className={size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'} />
              {priceDisplay}
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <div className="max-w-xs">
              <p className="font-medium mb-1">Oxum Rule Compliant Price</p>
              <p className="text-xs">
                This price follows the Oxum Global Price Symmetry rule, ensuring all users worldwide pay exactly the same amount for boosting.
              </p>
              {showConversion && (
                <p className="text-xs mt-1">
                  ≈ ${usdValue.toFixed(2)} USD
                </p>
              )}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
  
  // For regular prices
  if (showConversion) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className={`inline-flex items-center gap-1 ${className}`}>
              <CircleDollarSign className={size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'} />
              {priceDisplay}
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs">
              ≈ ${usdValue.toFixed(2)} USD
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
  
  return (
    <span className={`inline-flex items-center gap-1 ${className}`}>
      <CircleDollarSign className={size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'} />
      {priceDisplay}
    </span>
  );
};

export default UBXPriceDisplay;
