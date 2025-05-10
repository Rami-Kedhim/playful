
import React from 'react';
import { BoostPackage } from '@/types/pulse-boost';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BoostPackageCardProps {
  pkg: BoostPackage;
  packageData?: BoostPackage; // Added for backward compatibility
  isSelected: boolean;
  onSelect?: () => void;
  onClick?: () => void; // Added for compatibility with CreatorBoostTab
  formatDuration?: (duration: string | number) => string;
}

const BoostPackageCard: React.FC<BoostPackageCardProps> = ({
  pkg,
  packageData, // Support both pkg and packageData
  isSelected,
  onSelect,
  onClick,
  formatDuration = (duration) => duration.toString()
}) => {
  // Use either pkg or packageData, prioritizing pkg
  const boostPackage = pkg || packageData;
  
  const handleClick = () => {
    if (onClick) onClick();
    if (onSelect) onSelect();
  };

  return (
    <Card 
      className={`cursor-pointer transition-all border-2 ${isSelected ? 'border-primary' : 'border-transparent'}`}
      onClick={handleClick}
    >
      <CardHeader className="relative pb-2">
        <CardTitle className="text-lg flex items-center justify-between">
          {boostPackage.name}
          {boostPackage.isMostPopular && (
            <span className="bg-amber-500/20 text-amber-500 text-xs px-2 py-1 rounded-full flex items-center">
              <Sparkles className="h-3 w-3 mr-1" />
              Popular
            </span>
          )}
        </CardTitle>
        <p className="text-sm text-muted-foreground">{formatDuration(boostPackage.duration)}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="font-semibold text-xl">{boostPackage.price_ubx} UBX</p>
            <p className="text-sm text-muted-foreground">${boostPackage.price.toFixed(2)} USD</p>
          </div>
          
          <div className="space-y-2">
            {boostPackage.features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <Check className="h-4 w-4 text-green-500 mt-0.5" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
          
          <Button 
            variant={isSelected ? "default" : "outline"}
            className="w-full"
            onClick={handleClick}
          >
            {isSelected ? "Selected" : "Select"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BoostPackageCard;
