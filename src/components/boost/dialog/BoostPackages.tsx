
import { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, Star, Zap } from "lucide-react";
import { BoostPackage, BoostPackagesProps } from "../types";

const BoostPackages: React.FC<BoostPackagesProps> = ({
  boostPackages,
  packages,
  selectedPackage,
  onSelectPackage,
  setSelectedPackage,
  formatBoostDuration,
  formatDuration,
  getBoostPrice,
  dailyBoostUsage = 0,
  dailyBoostLimit = 4,
  disabled = false
}) => {
  // Use either provided boostPackages or packages
  const availablePackages = boostPackages || packages || [];

  // Use the appropriate select callback
  const handleSelectPackage = (packageId: string) => {
    if (onSelectPackage) {
      onSelectPackage(packageId);
    } else if (setSelectedPackage) {
      setSelectedPackage(packageId);
    }
  };

  // Use the appropriate format function
  const formatDurationFn = (duration: string) => {
    if (formatBoostDuration) {
      return formatBoostDuration(duration);
    } else if (formatDuration) {
      return formatDuration(duration);
    }
    
    // Default format - handle HH:MM:SS format
    const parts = duration.split(':');
    if (parts.length === 3) {
      const hours = parseInt(parts[0]);
      const mins = parseInt(parts[1]);
      
      if (hours >= 24) {
        const days = Math.floor(hours / 24);
        return `${days} ${days === 1 ? 'day' : 'days'}`;
      } else if (hours > 0) {
        return `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
      } else if (mins > 0) {
        return `${mins} ${mins === 1 ? 'minute' : 'minutes'}`;
      }
    }
    
    return duration;
  };

  // Determine card icon based on package name or features
  const getPackageIcon = (pkg: BoostPackage) => {
    const name = pkg.name.toLowerCase();
    if (name.includes('premium') || name.includes('exclusive')) {
      return <Star className="h-5 w-5" />;
    } else if (name.includes('plus') || name.includes('advanced')) {
      return <Sparkles className="h-5 w-5" />;
    }
    return <Zap className="h-5 w-5" />;
  };

  const getPackageTierColor = (pkg: BoostPackage) => {
    const name = pkg.name.toLowerCase();
    if (name.includes('premium') || name.includes('exclusive')) {
      return "bg-gradient-to-br from-amber-500/20 to-amber-700/20 border-amber-500/30";
    } else if (name.includes('plus') || name.includes('advanced')) {
      return "bg-gradient-to-br from-blue-500/20 to-blue-700/20 border-blue-500/30";
    }
    return "bg-gradient-to-br from-gray-600/10 to-gray-800/10";
  };

  // Get price from package or function
  const getPrice = (pkg: BoostPackage) => {
    if (getBoostPrice) {
      return getBoostPrice();
    }
    return pkg.price_ubx;
  };

  // Check if daily boost limit is reached
  const isLimitReached = useMemo(() => {
    return dailyBoostUsage >= dailyBoostLimit;
  }, [dailyBoostUsage, dailyBoostLimit]);

  return (
    <div className="space-y-5">
      {isLimitReached && (
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-md p-3 text-sm">
          <p className="font-medium text-yellow-500">Daily boost limit reached</p>
          <p className="text-muted-foreground text-xs mt-1">
            You have used all {dailyBoostLimit} boosts for today. Boosting will be available again tomorrow.
          </p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {availablePackages.map((pkg) => (
          <Card
            key={pkg.id}
            className={`overflow-hidden transition-all ${
              selectedPackage === pkg.id
                ? "ring-2 ring-primary ring-offset-2"
                : ""
            } ${getPackageTierColor(pkg)}`}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0 mr-3 p-2 rounded-full bg-primary/10">
                    {getPackageIcon(pkg)}
                  </div>
                  <div>
                    <h3 className="font-medium">{pkg.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      {formatDurationFn(pkg.duration)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{getPrice(pkg)} UBX</p>
                </div>
              </div>

              <div className="mt-3">
                <p className="text-xs text-muted-foreground">
                  {pkg.description}
                </p>
              </div>

              <ul className="mt-3 text-xs space-y-1">
                {(pkg.features || []).map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <Check className="h-3 w-3 mr-2 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => handleSelectPackage(pkg.id)}
                variant={selectedPackage === pkg.id ? "secondary" : "outline"}
                className="w-full mt-4"
                disabled={isLimitReached || disabled}
              >
                {selectedPackage === pkg.id ? "Selected" : "Select"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {availablePackages.length === 0 && (
        <div className="text-center p-4">
          <p className="text-muted-foreground">No boost packages available</p>
        </div>
      )}
    </div>
  );
};

export default BoostPackages;
