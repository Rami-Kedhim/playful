
import React from 'react';
import { BoostPackage } from '@/types/boost';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export interface BoostPackageGridProps {
  packages: BoostPackage[];
  selectedPackageId: string;
  onSelect: (id: string) => void;
}

const BoostPackageGrid = ({
  packages,
  selectedPackageId,
  onSelect
}: BoostPackageGridProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatDuration = (duration: string) => {
    // Simple formatting for durations like "24:00:00" or "1d"
    if (duration.includes(':')) {
      const [hours] = duration.split(':');
      const hoursNum = parseInt(hours, 10);
      if (hoursNum < 24) return `${hoursNum} hours`;
      return `${hoursNum / 24} days`;
    }
    return duration;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {packages.map((pkg) => (
        <Card 
          key={pkg.id}
          className={cn(
            "cursor-pointer transition-all",
            selectedPackageId === pkg.id ? "border-primary" : "hover:border-primary/50"
          )}
          onClick={() => onSelect(pkg.id)}
        >
          <CardHeader className="pb-2">
            <CardTitle>{pkg.name}</CardTitle>
            <CardDescription>
              {pkg.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-2 text-xl font-bold">
              {pkg.price_ubx ? `${pkg.price_ubx} UBX` : formatCurrency(pkg.price)}
            </div>
            <div className="text-sm text-muted-foreground mb-4">
              Duration: {pkg.duration ? formatDuration(pkg.duration.toString()) : 'Unknown'}
            </div>
            <ul className="space-y-1">
              {pkg.features?.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BoostPackageGrid;
