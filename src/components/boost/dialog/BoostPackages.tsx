
import React from 'react';
import { RadioGroup } from '@/components/ui/radio-group';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BoostPackage } from '@/types/boost';

interface BoostPackagesProps {
  packages: BoostPackage[];
  selectedPackage: string | null;
  onSelectPackage: (packageId: string) => void;
  formatDuration: (duration: string) => string;
  getBoostPrice?: () => number;
  dailyBoostUsage?: number;
  dailyBoostLimit?: number;
  disabled?: boolean;
}

const BoostPackages = ({
  packages,
  selectedPackage,
  onSelectPackage,
  formatDuration,
  getBoostPrice,
  dailyBoostUsage = 0,
  dailyBoostLimit = 4,
  disabled = false
}: BoostPackagesProps) => {
  if (!packages || packages.length === 0) {
    return (
      <div className="p-6 text-center">
        <p className="text-muted-foreground">No boost packages available</p>
      </div>
    );
  }
  
  return (
    <div>
      {dailyBoostUsage > 0 && dailyBoostLimit > 0 && (
        <div className="mb-4 text-sm">
          <p className="text-muted-foreground">
            Daily boost usage: <span className="font-medium">{dailyBoostUsage}/{dailyBoostLimit}</span>
          </p>
        </div>
      )}
      
      <RadioGroup
        value={selectedPackage || undefined}
        onValueChange={onSelectPackage}
        className="space-y-3"
        disabled={disabled}
      >
        {packages.map((pkg) => (
          <Card
            key={pkg.id}
            className={cn(
              "cursor-pointer border-2 transition-colors",
              pkg.id === selectedPackage 
                ? "border-primary/70 bg-primary/5" 
                : "hover:border-muted-foreground/20"
            )}
            onClick={() => !disabled && onSelectPackage(pkg.id)}
          >
            <CardHeader className="p-4 pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center">
                  <Zap className={cn(
                    "h-4 w-4 mr-2",
                    pkg.id === selectedPackage ? "text-primary" : "text-muted-foreground"
                  )} />
                  {pkg.name}
                </CardTitle>
                <Badge variant="outline">
                  {formatDuration(pkg.duration)}
                </Badge>
              </div>
              <CardDescription>
                {pkg.description || "Boost your visibility and get more views"}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              {pkg.features && pkg.features.length > 0 && (
                <ul className="text-sm space-y-1.5 mt-2">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              )}
              
              <div className="mt-3 text-sm font-medium">
                Price: {pkg.price_ubx} UBX
              </div>
            </CardContent>
          </Card>
        ))}
      </RadioGroup>
    </div>
  );
};

export default BoostPackages;
