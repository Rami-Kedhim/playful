
import React from 'react';
import { Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface OxumInfoTooltipProps {
  rule?: 'global-price' | 'ethical-boost' | 'currency-conversion';
  children?: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

const OxumInfoTooltip: React.FC<OxumInfoTooltipProps> = ({ 
  rule = 'global-price', 
  children,
  position = 'top',
  className = ''
}) => {
  const getRuleContent = () => {
    switch (rule) {
      case 'global-price':
        return (
          <div className="space-y-2 max-w-xs">
            <h4 className="font-medium">Oxum Rule #001: Global Price Symmetry</h4>
            <p className="text-sm">
              All boost pricing is uniform worldwide at 1000 UBX, ensuring fairness
              and equality for all users regardless of location or economic status.
            </p>
          </div>
        );
      case 'ethical-boost':
        return (
          <div className="space-y-2 max-w-xs">
            <h4 className="font-medium">Oxum Ethical Boosting</h4>
            <p className="text-sm">
              Boost usage is limited to ensure fairness and prevent manipulation of
              visibility algorithms. This maintains platform integrity and equal 
              opportunity for all users.
            </p>
          </div>
        );
      case 'currency-conversion':
        return (
          <div className="space-y-2 max-w-xs">
            <h4 className="font-medium">UBX Currency Conversion</h4>
            <p className="text-sm">
              Currency conversion rates are approximate and for informational 
              purposes only. All transactions are processed in UBX, regardless
              of displayed alternative currency values.
            </p>
          </div>
        );
      default:
        return children || (
          <p className="text-sm max-w-xs">
            Oxum rules govern the platform to ensure fairness, integrity, and equality for all users.
          </p>
        );
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Info className={`h-4 w-4 text-muted-foreground cursor-help ${className}`} />
        </TooltipTrigger>
        <TooltipContent side={position}>
          {getRuleContent()}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default OxumInfoTooltip;
