
import React, { useState } from 'react';
import { Info, DollarSign, ArrowLeftRight } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatUBX, SupportedCurrency } from '@/utils/oxum/currencyUtils';
import { Button } from '@/components/ui/button';
import { GLOBAL_UBX_RATE } from '@/utils/oxum/globalPricing';

interface UBXPriceDisplayProps {
  amount: number;
  showTooltip?: boolean;
  showConversion?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  isGlobalPrice?: boolean;
}

const UBXPriceDisplay: React.FC<UBXPriceDisplayProps> = ({
  amount,
  showTooltip = true,
  showConversion = false,
  className = "",
  size = 'md',
  isGlobalPrice = false
}) => {
  const [showingCurrency, setShowingCurrency] = useState<SupportedCurrency>('UBX');
  const [showCurrency, setShowCurrency] = useState<boolean>(false);
  
  const toggleCurrency = () => {
    setShowingCurrency(curr => {
      if (curr === 'UBX') return 'USD';
      return 'UBX';
    });
    setShowCurrency(true);
  };
  
  // Size-based classes
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg font-semibold',
  };
  
  const formattedPrice = showCurrency && showConversion 
    ? formatUBX(amount, showingCurrency === 'UBX' ? 'USD' : 'UBX')
    : `${amount} UBX`;

  return (
    <div className={`inline-flex items-center gap-1.5 ${sizeClasses[size]} ${className}`}>
      <span className="flex items-center">
        {formattedPrice}
        {isGlobalPrice && (
          <span className="ml-1.5 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 text-xs py-0.5 px-1.5 rounded-full">
            Oxum
          </span>
        )}
      </span>
      
      {showConversion && (
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-5 w-5 rounded-full" 
          onClick={toggleCurrency}
        >
          <ArrowLeftRight className="h-3 w-3" />
        </Button>
      )}
      
      {showTooltip && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-4 w-4 text-muted-foreground cursor-help" />
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <div className="space-y-2 p-1">
                <p>
                  {isGlobalPrice ? (
                    <>
                      <strong>Oxum Rule #001:</strong> This price follows the Global Price Symmetry rule, 
                      ensuring fair and equal pricing worldwide at {GLOBAL_UBX_RATE} UBX.
                    </>
                  ) : (
                    <>
                      UBX is the platform's universal token used for all transactions.
                    </>
                  )}
                </p>
                {showConversion && (
                  <p className="text-xs text-muted-foreground">Click the toggle icon to switch between currencies.</p>
                )}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};

export default UBXPriceDisplay;
