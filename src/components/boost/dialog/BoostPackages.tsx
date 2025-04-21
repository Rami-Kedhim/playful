
import React from 'react';
import { Card } from "@/components/ui/card";
import { BoostPackage } from "../types";
import { CheckCircle, Clock } from "lucide-react";

interface BoostPackagesProps {
  boostPackages: BoostPackage[];
  selectedPackage: string;
  onSelectPackage: (packageId: string) => void;
  formatDuration: (duration: string) => string;
  disabled: boolean;
}

const BoostPackages: React.FC<BoostPackagesProps> = ({
  boostPackages,
  selectedPackage,
  onSelectPackage,
  formatDuration,
  disabled
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {boostPackages.map((pkg) => (
        <Card
          key={pkg.id}
          className={`p-4 cursor-pointer transition-all hover:shadow-md ${
            selectedPackage === pkg.id
              ? "border-primary ring-2 ring-primary/20"
              : ""
          } ${disabled ? "opacity-60 pointer-events-none" : ""}`}
          onClick={() => !disabled && onSelectPackage(pkg.id)}
        >
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium">{pkg.name}</h4>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="mr-1 h-3 w-3" />
                {formatDuration(pkg.duration)}
              </div>
            </div>
            {selectedPackage === pkg.id && (
              <CheckCircle className="h-5 w-5 text-primary" />
            )}
          </div>

          <div className="mt-3 text-sm space-y-1">
            {pkg.features.map((feature, i) => (
              <div key={i} className="flex items-center">
                <CheckCircle className="h-3 w-3 text-green-500 mr-2" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          <div className="mt-3 pt-2 border-t flex items-center justify-between">
            <span className="text-sm font-semibold">{pkg.price_ubx} UBX</span>
            {pkg.description && (
              <span className="text-xs text-muted-foreground">{pkg.description}</span>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default BoostPackages;
