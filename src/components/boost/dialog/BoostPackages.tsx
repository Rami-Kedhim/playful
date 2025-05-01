
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Check, Zap } from "lucide-react";
import { BoostPackage } from "@/types/boost";

interface BoostPackagesProps {
  packages: BoostPackage[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  formatDuration?: (duration: string) => string;
  disabled?: boolean;
  dailyUsage?: number;
  dailyLimit?: number;
  getBoostPrice?: (pkg?: BoostPackage) => number;
}

const BoostPackages = ({ 
  packages, 
  selectedId, 
  onSelect,
  formatDuration = (duration) => duration,
  disabled = false,
  dailyUsage = 0,
  dailyLimit = 5,
  getBoostPrice = (pkg) => pkg?.price || 0
}: BoostPackagesProps) => {
  if (!packages || packages.length === 0) {
    return <div className="text-center py-6">No boost packages available</div>;
  }

  return (
    <div className="space-y-4">
      {dailyLimit > 0 && (
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">Daily boost usage:</span>
          <span className="font-medium">{dailyUsage} / {dailyLimit}</span>
        </div>
      )}
      
      <RadioGroup value={selectedId || undefined} onValueChange={onSelect}>
        <div className="space-y-3">
          {packages.map((pkg) => (
            <div key={pkg.id} className="relative">
              <RadioGroupItem
                id={pkg.id}
                value={pkg.id}
                className="sr-only"
                disabled={disabled}
              />
              <Label
                htmlFor={pkg.id}
                className={`
                  flex cursor-pointer rounded-lg border border-muted p-4
                  ${selectedId === pkg.id ? "bg-primary/5 border-primary" : "hover:bg-accent"}
                  ${disabled ? "opacity-50 cursor-not-allowed" : ""}
                `}
              >
                <div className="flex flex-1 items-center justify-between">
                  <div className="space-y-1">
                    <div className="font-medium">{pkg.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {formatDuration(pkg.duration)}
                    </div>
                    {pkg.features && pkg.features.length > 0 && (
                      <ul className="text-xs space-y-1 mt-1">
                        {pkg.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-1">
                            <Check className="h-3 w-3 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  
                  <div className="flex flex-col items-end">
                    <Badge className="bg-primary mb-2">
                      <Zap className="h-3 w-3 mr-1" />
                      {pkg.boost_power ? `+${pkg.boost_power}%` : 'Boost'}
                    </Badge>
                    
                    <div className="text-sm font-medium">
                      {getBoostPrice(pkg)} UBX
                    </div>
                  </div>
                </div>
              </Label>
            </div>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
};

export default BoostPackages;
