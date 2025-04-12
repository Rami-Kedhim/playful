
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Lock, Shield, CircleDollarSign, Check, AlertCircle } from 'lucide-react';
import { GLOBAL_UBX_RATE } from '@/utils/oxum/globalPricing';
import UBXPriceDisplay from './UBXPriceDisplay';

interface OxumRuleInfoProps {
  variant?: 'full' | 'compact' | 'mini';
  showBoostPrice?: boolean;
  isAdmin?: boolean;
}

/**
 * Component to display information about the Oxum Rule to users
 */
const OxumRuleInfo: React.FC<OxumRuleInfoProps> = ({
  variant = 'compact',
  showBoostPrice = true,
  isAdmin = false
}) => {
  // Mini variant - just a badge with tooltip
  if (variant === 'mini') {
    return (
      <Badge 
        variant="outline" 
        className="bg-green-50 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
      >
        <Lock className="h-3 w-3 mr-1" />
        <span>Oxum Protected</span>
      </Badge>
    );
  }
  
  // Compact variant - a simple alert
  if (variant === 'compact') {
    return (
      <Alert>
        <CircleDollarSign className="h-4 w-4" />
        <AlertTitle className="flex items-center gap-2">
          Oxum Rule Protected Platform
          <Badge variant="outline" className="bg-green-50 text-green-800">Active</Badge>
        </AlertTitle>
        <AlertDescription>
          <p>
            UberEscorts never charges fees on user-to-user transactions. The only monetized feature is 
            profile boosting at a fixed global price of <UBXPriceDisplay amount={GLOBAL_UBX_RATE} isGlobalPrice size="sm" />.
          </p>
        </AlertDescription>
      </Alert>
    );
  }
  
  // Full variant - complete card with details
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lock className="h-5 w-5 text-primary" />
          Oxum Rule: Financial Transparency
        </CardTitle>
        <CardDescription>
          Core ethical principle governing all financial interactions on the platform
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-md border border-green-200 dark:border-green-800">
          <h3 className="font-medium mb-1 flex items-center gap-2">
            <Shield className="h-4 w-4 text-green-600" />
            Zero-Fee Guarantee
          </h3>
          <p className="text-sm">
            UberEscorts never imposes fees, commissions, or revenue-sharing on any user-to-user interactions.
            This applies to bookings, tips, gifts, messaging, and content access.
          </p>
        </div>
        
        {showBoostPrice && (
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md border border-blue-200 dark:border-blue-800">
            <h3 className="font-medium mb-1 flex items-center gap-2">
              <CircleDollarSign className="h-4 w-4 text-blue-600" />
              Global Price Symmetry
            </h3>
            <p className="text-sm mb-2">
              The only monetized feature is the Boosting System, which uses a globally fixed price of:
            </p>
            <div className="flex justify-center my-2">
              <UBXPriceDisplay amount={GLOBAL_UBX_RATE} size="lg" isGlobalPrice showConversion />
            </div>
          </div>
        )}
        
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
            <p className="text-sm">100% of payments between users go directly to the recipient</p>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
            <p className="text-sm">Boosting uses the exact same price worldwide for all users</p>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
            <p className="text-sm">This rule is immutable and enforced by the Brain Hub system</p>
          </div>
        </div>
        
        {isAdmin && (
          <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-md border border-amber-200 dark:border-amber-800">
            <h3 className="font-medium mb-1 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-amber-600" />
              Administrator Notice
            </h3>
            <p className="text-sm">
              As an administrator, you are bound by the Oxum Rule. No override is possible for 
              user-to-user transaction fees or boost pricing. Any attempt to modify these values will 
              be automatically blocked by the system.
            </p>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="text-xs text-muted-foreground border-t pt-4">
        The Oxum Rule is a core principle of the UberEscorts platform. It cannot be modified or disabled.
      </CardFooter>
    </Card>
  );
};

export default OxumRuleInfo;
