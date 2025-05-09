
import React from 'react';
import { CheckIcon, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BoostPackage } from '@/types/boost';

interface BoostPackageCardProps {
  pkg: BoostPackage;
  isSelected: boolean;
  onSelect: () => void;
  className?: string;
  isPopular?: boolean;
  formatDuration?: (duration: string) => string;
}

const BoostPackageCard: React.FC<BoostPackageCardProps> = ({
  pkg,
  isSelected,
  onSelect,
  className,
  isPopular,
  formatDuration
}) => {
  // Use formatted duration if available
  const duration = formatDuration && pkg.duration 
    ? formatDuration(pkg.duration) 
    : pkg.duration || '';
  
  return (
    <div
      className={cn(
        "p-3 border rounded-md cursor-pointer transition-all",
        isSelected 
          ? "border-primary bg-primary/5" 
          : "border-border hover:border-primary/50",
        className
      )}
      onClick={onSelect}
    >
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <h3 className="font-medium text-sm">{pkg.name}</h3>
            {(isPopular || pkg.isMostPopular) && (
              <span className="bg-amber-100 text-amber-800 text-[10px] px-1.5 py-0.5 rounded">
                Popular
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground">{pkg.description}</p>
        </div>
        
        <div className={cn(
          "w-5 h-5 rounded-full flex items-center justify-center border",
          isSelected 
            ? "bg-primary border-primary text-primary-foreground" 
            : "border-input bg-background"
        )}>
          {isSelected && <CheckIcon className="w-3 h-3" />}
        </div>
      </div>
      
      <div className="mt-3 grid grid-cols-2 gap-4">
        <div>
          <div className="text-xs text-muted-foreground">Duration</div>
          <div className="text-sm">{duration}</div>
        </div>
        
        <div>
          <div className="text-xs text-muted-foreground">Price</div>
          <div className="text-sm">{pkg.price_ubx || pkg.price} credits</div>
        </div>
      </div>
      
      <div className="mt-3">
        <div className="text-xs text-muted-foreground mb-1">Features</div>
        <ul className="text-xs space-y-1">
          {pkg.features?.slice(0, 3).map((feature, i) => (
            <li key={i} className="flex items-center gap-1.5">
              <Zap className="h-3 w-3 text-blue-500" strokeWidth={2.5} />
              <span>{feature}</span>
            </li>
          ))}
          {pkg.features && pkg.features.length > 3 && (
            <li className="text-xs text-muted-foreground">
              +{pkg.features.length - 3} more
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default BoostPackageCard;
