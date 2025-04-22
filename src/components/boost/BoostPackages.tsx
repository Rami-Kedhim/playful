
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Zap } from 'lucide-react';
import { BoostPackage } from '@/types/boost';

export interface BoostPackagesProps {
  packages: BoostPackage[];
  selectedId: string;
  onSelect: (id: string) => void;
  formatDuration: (duration: string) => string;
  dailyUsage: number;
  dailyLimit: number;
  disabled?: boolean;
  getBoostPrice?: () => number; // Add this to fix TypeScript error
}

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
      <div className="text-sm text-muted-foreground mb-2">
        Daily boost usage: {dailyUsage}/{dailyLimit}
      </div>
      
      <div className="grid grid-cols-1 gap-3">
        {packages.map((pkg) => (
          <Card 
            key={pkg.id} 
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedId === pkg.id ? 'border-primary' : 'border-border'
            } ${disabled ? 'opacity-50' : ''}`}
            onClick={() => !disabled && onSelect(pkg.id)}
          >
            <CardHeader className="p-3 pb-0">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Zap className={`mr-2 h-4 w-4 ${selectedId === pkg.id ? 'text-primary' : 'text-muted-foreground'}`} />
                  <h3 className="font-medium">{pkg.name}</h3>
                </div>
                {pkg.is_featured && (
                  <Badge variant="secondary" className="text-xs">
                    Popular
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-3">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">{formatDuration(pkg.duration)}</p>
                </div>
                <div className="flex items-center">
                  <span className="font-bold mr-2">{pkg.price_ubx} UBX</span>
                  {selectedId === pkg.id && (
                    <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  )}
                </div>
              </div>
              {pkg.description && (
                <p className="text-xs text-muted-foreground mt-2">{pkg.description}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BoostPackages;
