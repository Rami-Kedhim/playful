
import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { oxumCurrencyUtils } from '@/utils/oxum/oxumCurrencyUtils';
import { GLOBAL_UBX_RATE } from '@/utils/oxum/globalPricing';
import { cn } from '@/utils/cn';

interface UBXCurrencyDisplayProps {
  amount?: number;
  isBoostPrice?: boolean;
  showCurrencySelector?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'success' | 'warning' | 'error';
  className?: string;
}

/**
 * A component that displays UBX prices with local currency conversion
 * Enforces Oxum Rule #001 for boost prices
 */
const UBXCurrencyDisplay: React.FC<UBXCurrencyDisplayProps> = ({
  amount,
  isBoostPrice = false,
  showCurrencySelector = false,
  size = 'md',
  variant = 'default',
  className
}) => {
  // If this is a boost price, enforce the global rate
  const actualAmount = isBoostPrice ? GLOBAL_UBX_RATE : (amount ?? 0);
  
  // Currency state
  const [currency, setCurrency] = useState<'USD' | 'EUR' | 'GBP' | 'JPY'>('USD');
  const currencies = oxumCurrencyUtils.getSupportedCurrencies();
  
  // Format the price
  const formattedUBX = `${actualAmount} UBX`;
  const formattedLocal = oxumCurrencyUtils.convertAndFormatUBX(
    actualAmount,
    currency,
    isBoostPrice
  );
  
  // Size classes
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl font-bold',
  };
  
  // Variant classes
  const variantClasses = {
    default: '',
    success: 'text-green-600',
    warning: 'text-amber-600',
    error: 'text-red-600',
  };

  return (
    <div className="flex flex-col">
      <div 
        className={cn(
          'flex items-center gap-2',
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
      >
        <span className="font-medium">{formattedUBX}</span>
        <span className="text-muted-foreground">≈</span>
        <span>{formattedLocal}</span>
      </div>
      
      {showCurrencySelector && (
        <div className="mt-2 w-24">
          <Select
            value={currency}
            onValueChange={(value) => setCurrency(value as any)}
          >
            <SelectTrigger className="h-8 text-xs">
              <SelectValue placeholder="Currency" />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((curr) => (
                <SelectItem key={curr} value={curr} className="text-xs">{curr}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
};

export default UBXCurrencyDisplay;
