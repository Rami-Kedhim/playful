
import React from 'react';
import { BoostPackage } from '@/types/pulse-boost';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import BoostPackageCard from '../BoostPackageCard';

interface BoostPackagesProps {
  packages: BoostPackage[];
  selectedPackage: string | null;
  onSelectPackage: (packageId: string) => void;
  isLoading?: boolean;
  error?: string;
}

const BoostPackages: React.FC<BoostPackagesProps> = ({
  packages,
  selectedPackage,
  onSelectPackage,
  isLoading = false,
  error
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

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (packages.length === 0) {
    return (
      <Alert variant="default">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          No boost packages are currently available. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {packages.map((pkg) => (
        <BoostPackageCard
          key={pkg.id}
          pkg={pkg}
          isSelected={selectedPackage === pkg.id}
          onSelect={() => onSelectPackage(pkg.id)}
        />
      ))}
    </div>
  );
};

export default BoostPackages;
