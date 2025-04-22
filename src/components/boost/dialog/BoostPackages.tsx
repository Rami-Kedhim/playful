
import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Zap } from "lucide-react";
import { BoostPackage } from '@/types/boost';

export interface BoostPackagesProps {
  packages: BoostPackage[];
  selectedId: string;
  onSelect: (id: string) => void;
  formatDuration: (duration: string) => string;
  dailyUsage: number;
  dailyLimit: number;
  disabled?: boolean;
  getBoostPrice?: () => number;
}

const BoostPackages: React.FC<BoostPackagesProps> = ({
  packages,
  selectedId,
  onSelect,
  formatDuration,
  dailyUsage,
  dailyLimit,
  disabled = false,
  getBoostPrice
}) => {
  if (packages.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No packages available right now.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Select a Package</h3>
        <Badge variant="outline">
          {dailyUsage} / {dailyLimit} today
        </Badge>
      </div>
      
      <RadioGroup value={selectedId} onValueChange={onSelect}>
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="mb-3"
          >
            <label
              htmlFor={`pkg-${pkg.id}`}
              className="cursor-pointer"
            >
              <Card
                className={`transition-all ${
                  selectedId === pkg.id
                    ? "border-primary ring-1 ring-primary"
                    : ""
                } ${disabled ? "opacity-70" : "hover:border-primary/50"}`}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center">
                        <Zap className="mr-1 h-4 w-4 text-primary" />
                        {pkg.name}
                      </CardTitle>
                      <CardDescription>{pkg.description}</CardDescription>
                    </div>
                    <RadioGroupItem
                      value={pkg.id}
                      id={`pkg-${pkg.id}`}
                      className="mt-1"
                      disabled={disabled}
                    />
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-semibold">
                        {pkg.price_ubx} UBX
                      </span>
                      <span className="text-xs text-muted-foreground">
                        (≈ ${pkg.price})
                      </span>
                    </div>
                    
                    <span className="text-sm text-muted-foreground">
                      {formatDuration(pkg.duration)}
                    </span>
                  </div>
                  
                  <div className="mt-3 border-t pt-3">
                    <ul className="text-sm space-y-1">
                      {pkg.features?.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check className="h-3 w-3 text-primary flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default BoostPackages;
