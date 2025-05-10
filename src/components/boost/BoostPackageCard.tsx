
import React from 'react';
import { BoostPackage } from '@/types/pulse-boost';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BoostPackageCardProps {
  pkg: BoostPackage;
  isSelected: boolean;
  onSelect: () => void;
  formatDuration?: (duration: string | number) => string;
}

const BoostPackageCard: React.FC<BoostPackageCardProps> = ({
  pkg,
  isSelected,
  onSelect,
  formatDuration = (duration) => duration.toString()
}) => {
  return (
    <Card 
      className={`cursor-pointer transition-all border-2 ${isSelected ? 'border-primary' : 'border-transparent'}`}
      onClick={onSelect}
    >
      <CardHeader className="relative pb-2">
        <CardTitle className="text-lg flex items-center justify-between">
          {pkg.name}
          {pkg.isMostPopular && (
            <span className="bg-amber-500/20 text-amber-500 text-xs px-2 py-1 rounded-full flex items-center">
              <Sparkles className="h-3 w-3 mr-1" />
              Popular
            </span>
          )}
        </CardTitle>
        <p className="text-sm text-muted-foreground">{formatDuration(pkg.duration)}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="font-semibold text-xl">{pkg.price_ubx} UBX</p>
            <p className="text-sm text-muted-foreground">${pkg.price.toFixed(2)} USD</p>
          </div>
          
          <div className="space-y-2">
            {pkg.features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <Check className="h-4 w-4 text-green-500 mt-0.5" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
          
          <Button 
            variant={isSelected ? "default" : "outline"}
            className="w-full"
            onClick={onSelect}
          >
            {isSelected ? "Selected" : "Select"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BoostPackageCard;
