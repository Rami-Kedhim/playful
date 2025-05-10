
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { BoostPackage } from '@/types/pulse-boost';

interface BoostPackageCardProps {
  package: BoostPackage;
  isSelected: boolean;
  onSelect: () => void;
  formatDuration?: (duration: string | number) => string;
  isPopular?: boolean;
}

const BoostPackageCard: React.FC<BoostPackageCardProps> = ({
  package: pkg,
  isSelected,
  onSelect,
  formatDuration = (d) => String(d),
  isPopular = false
}) => {
  return (
    <Card 
      className={`cursor-pointer transition border-2 ${isSelected ? 'border-primary' : 'border-gray-200 dark:border-gray-800'}`}
      onClick={onSelect}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">{pkg.name}</h3>
              {isPopular && <Badge variant="outline" className="bg-primary/10">Popular</Badge>}
            </div>
            <p className="text-sm text-muted-foreground">
              {formatDuration(pkg.duration)}
            </p>
            
            {pkg.features && pkg.features.length > 0 && (
              <ul className="mt-2 space-y-1">
                {pkg.features.map((feature, index) => (
                  <li key={index} className="text-xs flex items-center gap-1">
                    <Check className="h-3 w-3 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          <div className="text-right">
            <div className="font-bold text-lg">${pkg.price}</div>
            {pkg.price_ubx && (
              <div className="text-xs text-muted-foreground">{pkg.price_ubx} UBX</div>
            )}
            {pkg.visibility_increase && (
              <div className="text-xs mt-1 flex items-center justify-end gap-1">
                <Zap className="h-3 w-3 text-yellow-500" />
                +{pkg.visibility_increase}% visibility
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BoostPackageCard;
