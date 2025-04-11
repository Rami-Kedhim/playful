
import { useState } from "react";
import { Zap, Info } from "lucide-react";
import { Card } from "@/components/ui/card";
import { BoostPackage } from "@/types/boost";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface BoostPackageListProps {
  packages: BoostPackage[];
  selectedPackage: string | null;
  onSelectPackage: (packageId: string) => void;
  formatBoostDuration: (duration: string) => string;
  getBoostPrice: () => number;
}

const BoostPackageList = ({ 
  packages, 
  selectedPackage, 
  onSelectPackage,
  formatBoostDuration,
  getBoostPrice
}: BoostPackageListProps) => {
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-4">
        {packages.map((pkg) => (
          <Card 
            key={pkg.id}
            className={`p-4 cursor-pointer transition-all ${
              selectedPackage === pkg.id 
                ? "ring-2 ring-primary" 
                : "hover:shadow-md"
            }`}
            onClick={() => onSelectPackage(pkg.id)}
          >
            <div className="text-center">
              <h3 className="font-medium">{pkg.name}</h3>
              <div className="text-sm text-muted-foreground my-2">
                {formatBoostDuration(pkg.duration)}
              </div>
              <div className="flex items-center justify-center gap-1 mt-2">
                <Zap className="h-4 w-4 text-yellow-500" />
                <span className="text-lg font-bold">{pkg.price_ubx}</span>
                <span className="text-xs text-muted-foreground">UBX</span>
              </div>
              {pkg.features && pkg.features.length > 0 && (
                <div className="mt-3 text-xs text-left">
                  <p className="font-medium mb-1">Includes:</p>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {pkg.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
      
      <div className="flex justify-between items-center bg-muted p-3 rounded-md">
        <div className="flex items-center">
          <Zap className="h-4 w-4 text-yellow-500 mr-2" />
          <span className="text-sm">Your balance:</span>
          <span className="ml-2 font-medium">1000 UBX</span>
        </div>
        
        <div className="flex items-center text-muted-foreground text-sm">
          <span>Dynamic price:</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 mx-1 cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  The Oxum algorithm adjusts the boost price based on your profile quality, 
                  location, and current demand.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <span className="font-medium">{getBoostPrice()} UBX</span>
        </div>
      </div>
    </div>
  );
};

export default BoostPackageList;
