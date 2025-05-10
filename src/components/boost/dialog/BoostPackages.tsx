
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { BoostPackage } from '@/types/pulse-boost';
import BoostPackageCard from '../BoostPackageCard';

interface BoostPackagesProps {
  packages: BoostPackage[];
  selected: string;
  onSelect: (id: string) => void;
  onBoost: () => void;
  isLoading: boolean;
  usageCount: number;
  dailyLimit: number;
  getPrice?: () => number;
  formatDuration?: (duration: string) => string;
}

const BoostPackages: React.FC<BoostPackagesProps> = ({
  packages,
  selected,
  onSelect,
  onBoost,
  isLoading,
  usageCount,
  dailyLimit,
  getPrice,
  formatDuration = (duration) => duration
}) => {
  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground mb-2">
        Select a boost package ({usageCount}/{dailyLimit} today)
      </div>
      
      <div className="space-y-3">
        {packages.map((pkg) => (
          <BoostPackageCard
            key={pkg.id}
            pkg={pkg}
            isSelected={selected === pkg.id}
            onSelect={() => onSelect(pkg.id)}
            isPopular={pkg.isPopular || pkg.isMostPopular}
            formatDuration={formatDuration}
          />
        ))}
      </div>
      
      <div className="flex items-center justify-between pt-3 border-t">
        <div className="text-sm">
          <div className="font-medium">Total</div>
          <div className="text-muted-foreground">
            {getPrice ? `${getPrice()} credits` : 'Select a package'}
          </div>
        </div>
        
        <Button 
          onClick={onBoost}
          disabled={!selected || isLoading}
          className="min-w-[100px]"
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Boost Now'}
        </Button>
      </div>
    </div>
  );
};

export default BoostPackages;
