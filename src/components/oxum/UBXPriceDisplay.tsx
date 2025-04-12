
import React from 'react';

export interface UBXPriceDisplayProps {
  amount: number;
  isGlobalPrice?: boolean;
  showConversion?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Component to display UBX prices in a standardized format
 */
const UBXPriceDisplay: React.FC<UBXPriceDisplayProps> = ({
  amount,
  isGlobalPrice = false,
  showConversion = false,
  size = 'md',
  className = ''
}) => {
  // Calculate equivalent fiat value (simplified example)
  const estimatedUSDValue = (amount * 0.1).toFixed(2);
  
  // Size classes
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg font-semibold'
  };
  
  // Accent color for global prices
  const priceColor = isGlobalPrice ? 'text-primary' : '';
  
  return (
    <div className={`flex flex-col ${sizeClasses[size]} ${className}`}>
      <div className={`flex items-center gap-1 ${priceColor}`}>
        <span className="font-semibold">{amount}</span>
        <span className="text-muted-foreground">UBX</span>
        {isGlobalPrice && (
          <span className="text-xs bg-primary/10 text-primary px-1 py-0.5 rounded">GLOBAL</span>
        )}
      </div>
      
      {showConversion && (
        <span className="text-xs text-muted-foreground">
          ≈ ${estimatedUSDValue} USD
        </span>
      )}
    </div>
  );
};

export default UBXPriceDisplay;
