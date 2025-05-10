
import React from 'react';
import { BoostPackage } from '@/types/pulse-boost';
import { Card } from '@/components/ui/card';
import { Check } from 'lucide-react';

export interface BoostPackageCardProps {
  pkg: BoostPackage;
  isSelected: boolean;
  onSelect?: () => void;
  onClick?: () => void;
  formatDuration?: (duration: number) => string;
}

const BoostPackageCard: React.FC<BoostPackageCardProps> = ({
  pkg,
  isSelected,
  onSelect,
  onClick,
  formatDuration
}) => {
  const handleClick = () => {
    if (onSelect) onSelect();
    if (onClick) onClick();
  };

  return (
    <Card 
      className={`p-4 cursor-pointer transition-all ${
        isSelected 
          ? 'border-2 border-primary shadow-md' 
          : 'border hover:border-primary/50'
      }`}
      onClick={handleClick}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold">{pkg.name}</h3>
          <p className="text-sm text-muted-foreground">{pkg.description}</p>
        </div>
        {isSelected && <Check className="h-5 w-5 text-primary" />}
      </div>
      
      <div className="mt-4">
        <div className="text-lg font-bold">{pkg.price_ubx} UBX</div>
        <div className="text-sm text-muted-foreground">
          {formatDuration ? formatDuration(pkg.durationMinutes) : pkg.duration}
        </div>
      </div>
      
      <div className="mt-4 space-y-2">
        {pkg.features.map((feature, i) => (
          <div key={i} className="flex items-start gap-2">
            <Check className="h-4 w-4 text-green-500 mt-0.5" />
            <span className="text-sm">{feature}</span>
          </div>
        ))}
      </div>
      
      {pkg.isMostPopular && (
        <div className="absolute top-2 right-2 bg-primary/15 text-primary text-xs px-2 py-1 rounded-full">
          Most Popular
        </div>
      )}
    </Card>
  );
};

export default BoostPackageCard;
