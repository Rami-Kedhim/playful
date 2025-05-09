
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BoostPackage } from "@/types/boost";

interface BoostPackageGridProps {
  packages: BoostPackage[];
  selectedPackageId?: string | null;
  selectedPackage?: string | null;
  onSelect: (id: string) => void;
  onSelectPackage?: (pkg: any) => void;
  onActivate?: () => void;
  isLoading?: boolean;
  formatDuration?: (duration: string) => string;
}

const BoostPackageGrid: React.FC<BoostPackageGridProps> = ({
  packages,
  selectedPackage,
  selectedPackageId,
  onSelect,
  onSelectPackage,
  onActivate,
  isLoading = false,
  formatDuration = (duration) => duration || ''
}) => {
  // Use either selectedPackage or selectedPackageId
  const selected = selectedPackageId || selectedPackage;
  
  // Use either onSelect or onSelectPackage
  const handleSelect = (id: string) => {
    if (onSelectPackage) {
      const pkg = packages.find(p => p.id === id);
      onSelectPackage(pkg);
    } else if (onSelect) {
      onSelect(id);
    }
  };

  if (!packages || packages.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Packages Available</CardTitle>
          <CardDescription>
            There are currently no boost packages available for your profile.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {packages.map((pkg) => (
        <Card 
          key={pkg.id}
          className={`transition-all cursor-pointer ${
            selected === pkg.id ? "ring-2 ring-primary" : "hover:shadow-md"
          }`}
          onClick={() => handleSelect(pkg.id)}
        >
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{pkg.name}</CardTitle>
                <CardDescription>{formatDuration(pkg.duration || '')}</CardDescription>
              </div>
              {pkg.isMostPopular && (
                <Badge variant="secondary" className="bg-amber-100 text-amber-800 border-amber-200">
                  Popular
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <span className="text-2xl font-bold">{pkg.price_ubx || pkg.price} UBX</span>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                <Zap className="h-3 w-3 mr-1" />
                {pkg.boost_power ? `+${pkg.boost_power}%` : 'Boost'}
              </Badge>
            </div>
            
            <div className="space-y-2 text-sm text-muted-foreground">
              {pkg.features?.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <Zap className="h-3 w-3 text-primary mt-1 mr-2" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            
            {selected === pkg.id && onActivate && (
              <Button 
                className="w-full mt-4" 
                onClick={(e) => {
                  e.stopPropagation();
                  onActivate();
                }}
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Select This Package"}
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BoostPackageGrid;
