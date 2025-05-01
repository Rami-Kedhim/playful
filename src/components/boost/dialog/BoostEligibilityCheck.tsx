
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, Clock } from 'lucide-react';
import { BoostEligibility } from '@/types/boost';

interface BoostEligibilityCheckProps {
  eligibility: BoostEligibility;
  onClose: () => void;
}

const BoostEligibilityCheck: React.FC<BoostEligibilityCheckProps> = ({
  eligibility,
  onClose
}) => {
  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <div className="flex items-start space-x-3">
          <div className="rounded-full bg-yellow-100 p-2 dark:bg-yellow-900">
            <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
          </div>
          <div>
            <h3 className="font-medium">Boost Not Available</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {eligibility.reason || "You're not eligible to boost at this time"}
            </p>
          </div>
        </div>
        
        {eligibility.reasons && eligibility.reasons.length > 0 && (
          <div className="bg-muted/50 rounded p-3">
            <ul className="text-sm space-y-1 list-disc pl-4">
              {eligibility.reasons.map((reason, i) => (
                <li key={i}>{reason}</li>
              ))}
            </ul>
          </div>
        )}
        
        {eligibility.nextEligibleTime && (
          <div className="flex items-center justify-center space-x-2 text-sm">
            <Clock className="h-4 w-4" />
            <span>Next eligible: {eligibility.nextEligibleTime}</span>
          </div>
        )}
        
        <Button 
          variant="outline" 
          className="w-full"
          onClick={onClose}
        >
          Got It
        </Button>
      </CardContent>
    </Card>
  );
};

export default BoostEligibilityCheck;
