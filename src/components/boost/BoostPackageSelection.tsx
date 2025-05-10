
import React from 'react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { BoostPackage } from "@/types/pulse-boost";
import BoostPackageCard from './BoostPackageCard';

interface BoostPackageSelectionProps {
  packages: BoostPackage[];
  selectedPackage: string | null;
  onSelectPackage: (packageId: string) => void;
  formatBoostDuration: (duration: string | number) => string;
  getBoostPrice?: () => number;
  isLoading?: boolean;
}

const BoostPackageSelection: React.FC<BoostPackageSelectionProps> = ({
  packages,
  selectedPackage,
  onSelectPackage,
  formatBoostDuration,
  getBoostPrice,
  isLoading = false
}) => {
  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-200 dark:bg-gray-800 h-40 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  if (packages.length === 0) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          No boost packages are currently available. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {packages.map((boostPackage) => (
          <BoostPackageCard
            key={boostPackage.id}
            package={boostPackage}
            isSelected={selectedPackage === boostPackage.id}
            onSelect={() => onSelectPackage(boostPackage.id)}
            formatDuration={formatBoostDuration}
          />
        ))}
      </div>
    </div>
  );
};

export default BoostPackageSelection;
