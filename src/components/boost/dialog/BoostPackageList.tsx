
import React from 'react';
import { BoostPackage } from '@/types/pulse-boost';
import { cn } from '@/lib/utils';
import { CheckCircle } from 'lucide-react';

interface BoostPackageListProps {
  packages: BoostPackage[];
  selectedPackage: string | null;
  onSelectPackage: (id: string) => void;
  formatBoostDuration?: (duration: string) => string;
  getBoostPrice?: (id: string) => number;
}

const BoostPackageList: React.FC<BoostPackageListProps> = ({
  packages,
  selectedPackage,
  onSelectPackage,
  formatBoostDuration = (duration) => duration,
  getBoostPrice = (id) => 0
}) => {
  const formatVisibility = (value: string | number | undefined): string => {
    if (value === undefined || value === null) return '';
    if (typeof value === 'number') {
      return `${value.toString()}%`;
    }
    return value;
  };

  return (
    <div className="space-y-4">
      {packages.map((pkg) => (
        <div
          key={pkg.id}
          className={cn(
            "border rounded-md p-4 cursor-pointer transition-all hover:border-primary",
            selectedPackage === pkg.id ? "border-primary bg-primary/5" : ""
          )}
          onClick={() => onSelectPackage(pkg.id)}
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{pkg.name}</h3>
              <p className="text-sm text-muted-foreground">{pkg.description}</p>
              
              {pkg.features && pkg.features.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="text-sm flex items-center gap-1">
                      <CheckCircle className="h-3 w-3 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            
            <div className="text-right">
              <div className="font-bold">${pkg.price}</div>
              <div className="text-xs text-muted-foreground">
                {formatBoostDuration(pkg.duration ? pkg.duration.toString() : '')}
              </div>
              
              {pkg.visibility && (
                <div className="text-xs text-muted-foreground">
                  {formatVisibility(pkg.visibility)} visibility
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BoostPackageList;
