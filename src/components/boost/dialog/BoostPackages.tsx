
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Zap, Check } from 'lucide-react';
import { BoostPackagesProps } from '../types';
import { BoostPackage } from '@/types/boost';

const BoostPackages: React.FC<BoostPackagesProps> = ({
  packages,
  selectedId,
  onSelect,
  formatDuration,
  dailyUsage,
  dailyLimit,
  disabled = false
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">Select Boost Package</h3>
        <div className="text-xs text-muted-foreground">
          Daily usage: <span className="font-medium">{dailyUsage}/{dailyLimit}</span>
        </div>
      </div>

      <RadioGroup value={selectedId} onValueChange={onSelect} className="space-y-2">
        {packages.map((pkg: BoostPackage) => (
          <Card 
            key={pkg.id} 
            className={`border ${selectedId === pkg.id ? 'border-primary' : 'border-border'} cursor-pointer transition-all`}
          >
            <CardContent className="p-3 flex gap-2">
              <RadioGroupItem value={pkg.id} id={pkg.id} disabled={disabled} className="mt-1" />
              <div className="flex-1">
                <Label 
                  htmlFor={pkg.id} 
                  className={`flex items-start justify-between cursor-pointer ${disabled ? 'opacity-60' : ''}`}
                >
                  <div>
                    <div className="font-medium flex items-center">
                      {pkg.name}
                      {pkg.id === selectedId && (
                        <Check className="h-4 w-4 ml-1 text-primary" />
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Duration: {formatDuration(pkg.duration)}
                    </div>
                    {pkg.description && (
                      <div className="text-xs text-muted-foreground mt-1">
                        {pkg.description}
                      </div>
                    )}
                    {pkg.features && pkg.features.length > 0 && (
                      <ul className="text-xs text-muted-foreground mt-1 space-y-0.5">
                        {pkg.features.map((feature, i) => (
                          <li key={i} className="flex items-center">
                            <Zap className="h-3 w-3 mr-1 text-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="font-bold text-right">
                    {pkg.price_ubx} UBX
                  </div>
                </Label>
              </div>
            </CardContent>
          </Card>
        ))}
      </RadioGroup>
    </div>
  );
};

export default BoostPackages;
