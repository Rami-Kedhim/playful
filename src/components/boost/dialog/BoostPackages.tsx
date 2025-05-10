
import React, { useState } from 'react';
import { BoostPackage } from '@/types/pulse-boost';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import BoostPackageCard from '../BoostPackageCard';

interface BoostPackagesProps {
  packages: BoostPackage[];
  onBoost: () => Promise<boolean>;
  profileId: string;
}

const BoostPackages: React.FC<BoostPackagesProps> = ({ packages, onBoost, profileId }) => {
  const [selectedPackageId, setSelectedPackageId] = useState<string>(
    packages.length > 0 ? packages[0].id : ''
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleBoost = async () => {
    if (!selectedPackageId) return;
    
    setIsLoading(true);
    try {
      await onBoost();
    } finally {
      setIsLoading(false);
    }
  };

  if (packages.length === 0) {
    return <div className="text-center py-8">No boost packages available</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {packages.map((pkg) => (
          <BoostPackageCard
            key={pkg.id}
            packageData={pkg}
            isSelected={selectedPackageId === pkg.id}
            onClick={() => setSelectedPackageId(pkg.id)}
          />
        ))}
      </div>

      <Button 
        onClick={handleBoost} 
        disabled={isLoading || !selectedPackageId} 
        className="w-full"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          'Apply Boost'
        )}
      </Button>
    </div>
  );
};

export default BoostPackages;
