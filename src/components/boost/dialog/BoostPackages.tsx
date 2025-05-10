
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { BoostPackage } from "@/types/pulse-boost";
import BoostPackageCard from '../BoostPackageCard';

interface BoostPackagesProps {
  packages: BoostPackage[];
  profileId: string;
  onSuccess?: () => void | Promise<void>;
  onBoost?: () => Promise<boolean>;
}

const BoostPackages: React.FC<BoostPackagesProps> = ({
  packages,
  profileId,
  onSuccess,
  onBoost
}) => {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(
    packages.length > 0 ? packages[0].id : null
  );
  const [loading, setLoading] = useState(false);

  const handlePackageSelect = (packageId: string) => {
    setSelectedPackage(packageId);
  };

  const handleBoost = async () => {
    if (!selectedPackage) return;
    
    setLoading(true);
    try {
      if (onBoost) {
        await onBoost();
      }
      if (onSuccess) {
        const result = onSuccess();
        if (result instanceof Promise) {
          await result;
        }
      }
    } catch (error) {
      console.error("Error applying boost:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {packages.map((pkg) => (
          <BoostPackageCard
            key={pkg.id}
            pkg={pkg}
            isSelected={selectedPackage === pkg.id}
            onSelect={() => handlePackageSelect(pkg.id)}
          />
        ))}
      </div>
      
      <div className="flex justify-end mt-4">
        <Button
          onClick={handleBoost}
          disabled={!selectedPackage || loading}
        >
          {loading ? "Processing..." : "Apply Boost"}
        </Button>
      </div>
    </div>
  );
};

export default BoostPackages;
