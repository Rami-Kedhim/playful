
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Loader2 } from "lucide-react";
import { GLOBAL_UBX_RATE } from "@/utils/oxum/globalPricing";

export interface BoostPackagesProps {
  packages?: any[];
  boostPackages?: any[];
  selectedPackage: string | null;
  onSelectPackage: (packageId: string) => void;
  formatBoostDuration?: (duration: string) => string;
  formatDuration?: (duration: string) => string;
  getBoostPrice?: () => number;
  dailyBoostUsage?: number;
  dailyBoostLimit?: number;
  onPurchase?: () => void;
  loading?: boolean;
  onCancel?: () => void;
  disabled?: boolean;
}

const BoostPackages = ({
  packages = [],
  boostPackages = [],
  selectedPackage,
  onSelectPackage,
  formatBoostDuration,
  formatDuration,
  dailyBoostUsage = 0,
  dailyBoostLimit = 4,
  onPurchase,
  loading = false,
  onCancel,
  disabled = false
}: BoostPackagesProps) => {
  // Use either packages or boostPackages
  const packagesToDisplay = packages.length > 0 ? packages : boostPackages;
  
  // Use the appropriate formatter function
  const formatDurationFn = formatBoostDuration || formatDuration || ((duration: string) => duration);

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground mb-2">
        Daily boost usage: <span className="font-medium">{dailyBoostUsage} of {dailyBoostLimit}</span>
      </div>
      
      <div className="grid grid-cols-1 gap-3">
        {packagesToDisplay.map((pkg) => (
          <Card
            key={pkg.id}
            className={`p-4 cursor-pointer border-2 ${
              selectedPackage === pkg.id ? 'border-primary' : 'border-border'
            }`}
            onClick={() => onSelectPackage(pkg.id)}
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium">{pkg.name}</div>
                <div className="text-xs text-muted-foreground">
                  Duration: {formatDurationFn(pkg.duration)}
                </div>
                {pkg.description && (
                  <div className="text-xs text-muted-foreground mt-1">
                    {pkg.description}
                  </div>
                )}
              </div>
              <div className="flex flex-col items-end">
                <div className="font-bold">{GLOBAL_UBX_RATE} UBX</div>
                {selectedPackage === pkg.id && (
                  <div className="text-primary">
                    <Check size={16} />
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="flex justify-between space-x-2 mt-4">
        <Button
          variant="outline"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          onClick={onPurchase}
          disabled={!selectedPackage || loading || disabled || dailyBoostUsage >= dailyBoostLimit}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            'Purchase Boost'
          )}
        </Button>
      </div>
    </div>
  );
};

export default BoostPackages;
