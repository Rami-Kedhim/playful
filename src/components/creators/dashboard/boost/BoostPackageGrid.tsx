
import { useState } from "react";
import { BoostPackage } from "@/types/boost";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatBoostDuration } from "@/utils/boostCalculator";

interface BoostPackageGridProps {
  packages: BoostPackage[];
  onSelectPackage: (pkg: BoostPackage) => void;
  selectedPackageId?: string;
}

const BoostPackageGrid = ({ 
  packages, 
  onSelectPackage,
  selectedPackageId
}: BoostPackageGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {packages.map((pkg) => (
        <Card 
          key={pkg.id}
          className={cn(
            "cursor-pointer transition-all hover:border-primary/50",
            selectedPackageId === pkg.id && "border-primary ring-1 ring-primary"
          )}
          onClick={() => onSelectPackage(pkg)}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{pkg.name}</CardTitle>
            <CardDescription>
              {formatBoostDuration(pkg.duration)}
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="text-2xl font-bold mb-4">
              {pkg.price_ubx} <span className="text-sm font-normal text-muted-foreground">UBX</span>
            </div>
            
            {pkg.features && (
              <ul className="text-sm space-y-2">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
          <CardFooter>
            <Button 
              variant={selectedPackageId === pkg.id ? "default" : "outline"} 
              className="w-full"
              onClick={() => onSelectPackage(pkg)}
            >
              {selectedPackageId === pkg.id ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Selected
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-2" />
                  Select
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default BoostPackageGrid;
