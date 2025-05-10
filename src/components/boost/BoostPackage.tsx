import React from 'react';
import { cn } from '@/lib/utils';
import { BoostPackage as BoostPackageType } from '@/types/pulse-boost';

interface BoostPackageProps {
  pkg: BoostPackageType;
  className?: string;
}

const BoostPackage = ({ 
  pkg,
  className
}: BoostPackageProps) => {

  const formatVisibility = (value: string | number | undefined): string => {
    if (value === undefined || value === null) return '';
    return typeof value === 'number' ? `${value}%` : value;
  };

  return (
    <div className={cn(
      "border rounded-lg p-4 flex flex-col h-full hover:shadow-md transition-shadow",
      pkg.isMostPopular && "border-primary",
      className
    )}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold">{pkg.name}</h3>
        {pkg.isMostPopular && (
          <span className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
            Popular
          </span>
        )}
      </div>
      <p className="text-sm text-muted-foreground mb-4">{pkg.description}</p>

      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium">Price:</span>
        <span className="text-lg font-bold">${pkg.price}</span>
      </div>

      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium">Duration:</span>
        <span className="text-sm">{pkg.duration}</span>
      </div>

      {pkg.visibility && (
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Visibility:</span>
          <span className="text-sm">{formatVisibility(pkg.visibility)}</span>
        </div>
      )}

      {pkg.features && pkg.features.length > 0 && (
        <div className="mb-4">
          <span className="text-sm font-medium">Features:</span>
          <ul className="list-disc list-inside text-sm text-muted-foreground">
            {pkg.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BoostPackage;
