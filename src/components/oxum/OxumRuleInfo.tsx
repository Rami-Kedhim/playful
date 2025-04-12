
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GLOBAL_UBX_RATE } from '@/utils/oxum/globalPricing';
import { CheckCircle, Info } from 'lucide-react';
import UBXPriceDisplay from './UBXPriceDisplay';

interface OxumRuleInfoProps {
  showDetails?: boolean;
  className?: string;
}

/**
 * Component to display information about the Oxum Rule
 */
const OxumRuleInfo: React.FC<OxumRuleInfoProps> = ({
  showDetails = true,
  className = ''
}) => {
  return (
    <Card className={`${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
          <span>Oxum Rule Protection</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="text-sm space-y-4">
        <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-medium">
          <Info className="h-4 w-4" />
          <span>This transaction is protected by Oxum Rules</span>
        </div>
        
        {showDetails && (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Global Price</span>
              <UBXPriceDisplay 
                amount={GLOBAL_UBX_RATE} 
                isGlobalPrice={true}
                showConversion={true}
                size="sm"
              />
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Platform Fee</span>
              <span className="text-green-600 dark:text-green-400 font-medium">0%</span>
            </div>
            
            <div className="text-xs text-muted-foreground mt-2">
              <p>The Oxum Rule ensures:</p>
              <ul className="list-disc pl-4 mt-1 space-y-1">
                <li>All boost operations have a fixed global price</li>
                <li>Zero platform fees for all user-to-user transactions</li>
                <li>Complete price transparency</li>
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OxumRuleInfo;
