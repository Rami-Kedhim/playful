
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Zap, Clock } from 'lucide-react';
import { BoostPackage } from '@/types/boost';

interface BoostPackagesProps {
  packages: BoostPackage[];
  selectedId: string;
  onSelect: (id: string) => void;
  formatDuration?: (duration: string) => string;
  dailyUsage: number;
  dailyLimit: number;
  disabled?: boolean;
}

const BoostPackages: React.FC<BoostPackagesProps> = ({
  packages,
  selectedId,
  onSelect,
  formatDuration = (d) => d,
  dailyUsage,
  dailyLimit,
  disabled = false
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Badge variant="outline" className="font-normal">
          Daily Usage: {dailyUsage}/{dailyLimit}
        </Badge>
      </div>

      <RadioGroup value={selectedId} onValueChange={onSelect}>
        {packages.map((pkg) => (
          <Card key={pkg.id} className={`mb-3 overflow-hidden ${pkg.isMostPopular ? 'border-primary' : ''}`}>
            {pkg.isMostPopular && (
              <div className="bg-primary text-primary-foreground text-xs px-3 py-1 text-center">
                Most Popular
              </div>
            )}
            
            <CardContent className={`p-4 ${disabled ? 'opacity-50' : ''}`}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={pkg.id} id={pkg.id} disabled={disabled} />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <label htmlFor={pkg.id} className="text-base font-medium block cursor-pointer">
                        {pkg.name}
                      </label>
                      <p className="text-sm text-muted-foreground mt-1">{pkg.description}</p>
                    </div>
                    <span className="text-lg font-bold">{pkg.price_ubx} UBX</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {formatDuration(pkg.duration)}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Zap className="h-3 w-3 mr-1" />
                      {pkg.boost_power}% Boost Power
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mt-2">
                    {pkg.features?.map((feature, i) => (
                      <Badge key={i} variant="outline" className="text-xs py-0">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </RadioGroup>
    </div>
  );
};

export default BoostPackages;
