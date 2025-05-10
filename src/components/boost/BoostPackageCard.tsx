
import React from 'react';
import { cn } from '@/lib/utils';
import { BoostPackage } from '@/types/pulse-boost';

interface BoostPackageCardProps {
  pkg: BoostPackage;
  className?: string;
  isSelected?: boolean;
  onSelect?: () => void;
  formatDuration?: (duration: string) => string;
  isPopular?: boolean;
}

const BoostPackageCard: React.FC<BoostPackageCardProps> = ({
  pkg,
  className,
  isSelected = false,
  onSelect = () => {},
  formatDuration = (d) => d,
  isPopular
}) => {
  const formatVisibility = (value: string | number | undefined): string => {
    if (value === undefined || value === null) return '';
    return typeof value === 'number' ? `${value.toString()}%` : value;
  };

  return (
    <div 
      className={cn(
        "border rounded-lg p-4 flex flex-col h-full hover:shadow-md transition-shadow cursor-pointer",
        isSelected && "border-primary shadow-md",
        (pkg.isMostPopular || isPopular) && "border-primary",
        className
      )}
      onClick={onSelect}
    >
      <h3 className="text-lg font-semibold mb-2">{pkg.name}</h3>
      <p className="text-muted-foreground text-sm mb-4">{pkg.description}</p>

      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium">Price:</span>
        <span className="text-primary font-bold">${pkg.price}</span>
      </div>

      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium">Duration:</span>
        <span className="text-primary">{formatDuration(pkg.duration)}</span>
      </div>

      {pkg.visibility && (
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Visibility:</span>
          <span className="text-primary">{formatVisibility(pkg.visibility)}</span>
        </div>
      )}

      <div className="mt-auto">
        {(pkg.isMostPopular || isPopular) && (
          <div className="bg-green-100 text-green-700 py-1 px-2 rounded-full text-xs font-semibold inline-block">
            Most Popular
          </div>
        )}
      </div>
    </div>
  );
};

export default BoostPackageCard;
