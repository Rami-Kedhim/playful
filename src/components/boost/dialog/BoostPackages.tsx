
import React from 'react';
import { BoostPackage } from '@/types/pulse-boost';
import { Button } from '@/components/ui/button';
import BoostPackageCard from '@/components/boost/BoostPackageCard';

interface BoostPackagesProps {
  packages: BoostPackage[];
  onBoost: () => Promise<boolean>;
  profileId?: string; // Add this prop to resolve the error
}

const BoostPackages: React.FC<BoostPackagesProps> = ({
  packages,
  onBoost,
  profileId
}) => {
  const [selectedPackage, setSelectedPackage] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleBoost = async () => {
    if (!selectedPackage) return;
    
    setIsLoading(true);
    try {
      await onBoost();
    } catch (error) {
      console.error('Error boosting profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Simple duration formatter
  const formatDuration = (duration: string | number): string => {
    if (typeof duration === 'number') {
      // Convert hours to readable format
      const hours = Math.floor(duration);
      const minutes = Math.round((duration - hours) * 60);
      return minutes > 0 ? `${hours}h ${minutes}m` : `${hours} hours`;
    }
    return duration;
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {packages.map((pkg) => (
          <BoostPackageCard
            key={pkg.id}
            package={pkg}
            isSelected={selectedPackage === pkg.id}
            onSelect={() => setSelectedPackage(pkg.id)}
            formatDuration={formatDuration}
            isPopular={pkg.isPopular || false}
          />
        ))}
      </div>
      
      <Button 
        onClick={handleBoost} 
        disabled={!selectedPackage || isLoading}
        className="w-full"
      >
        {isLoading ? 'Processing...' : 'Boost Profile'}
      </Button>
    </div>
  );
};

export default BoostPackages;
