
import React from 'react';
import { BoostPackage } from '@/types/boost';
import { Badge } from '@/components/ui/badge';
import { Check, Star } from 'lucide-react';

interface BoostPackagesProps {
  packages: BoostPackage[];
  selectedId: string;
  onSelect: (id: string) => void;
  formatDuration?: (duration: string) => string;
  dailyUsage?: number;
  dailyLimit?: number;
  disabled?: boolean;
}

const BoostPackages: React.FC<BoostPackagesProps> = ({
  packages,
  selectedId,
  onSelect,
  formatDuration = d => d,
  dailyUsage = 0,
  dailyLimit = 3,
  disabled = false
}) => {
  if (!packages || !packages.length) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        No boost packages available
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {packages.map(pkg => (
        <div
          key={pkg.id}
          className={`p-3 border rounded-lg cursor-pointer transition-all ${
            selectedId === pkg.id
              ? 'border-primary bg-primary/5'
              : 'border-border hover:border-primary/50'
          } ${disabled ? 'opacity-70 pointer-events-none' : ''}`}
          onClick={() => !disabled && onSelect(pkg.id)}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{pkg.name}</h3>
                {(pkg.isMostPopular || pkg.isPopular) && (
                  <Badge variant="secondary" className="text-xs font-normal">
                    <Star className="h-3 w-3 mr-1" /> Popular
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{pkg.description}</p>
            </div>
            <div className="text-right">
              <div className="font-semibold">{pkg.price_ubx} UBX</div>
              <div className="text-xs text-muted-foreground">
                {formatDuration(pkg.duration)}
              </div>
            </div>
          </div>

          {pkg.features && pkg.features.length > 0 && (
            <div className="mt-2 grid grid-cols-2 gap-1 text-xs">
              {pkg.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-1">
                  <Check className="h-3 w-3 text-green-500" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {dailyUsage >= dailyLimit && (
        <div className="py-2 px-3 bg-yellow-50 dark:bg-yellow-950/30 text-yellow-800 dark:text-yellow-300 text-xs rounded-md">
          You've reached your daily boost limit ({dailyLimit} per day)
        </div>
      )}
    </div>
  );
};

export default BoostPackages;
