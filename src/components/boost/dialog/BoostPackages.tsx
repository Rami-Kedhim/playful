
import React, { useState } from 'react';
import { BoostPackage } from '@/types/pulse-boost';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import BoostPackageCard from '../BoostPackageCard';

export interface BoostPackagesProps {
  packages: BoostPackage[];
  onBoost?: (packageId: string) => Promise<boolean>;
  profileId: string;
  onSuccess?: () => Promise<void>;
}

const BoostPackages: React.FC<BoostPackagesProps> = ({ packages, onBoost, profileId, onSuccess }) => {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSelectPackage = (packageId: string) => {
    setSelectedPackage(packageId);
  };

  const handleApplyBoost = async () => {
    if (!selectedPackage) {
      toast({
        title: 'No package selected',
        description: 'Please select a boost package first.',
        variant: 'destructive'
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Call the provided onBoost function if available, otherwise use a dummy success
      const success = onBoost ? await onBoost(selectedPackage) : true;
      
      if (success) {
        toast({
          title: 'Boost applied successfully',
          description: 'Your profile has been boosted!'
        });
        
        if (onSuccess) {
          await onSuccess();
        }
      } else {
        toast({
          title: 'Failed to apply boost',
          description: 'Please try again or contact support.',
          variant: 'destructive'
        });
      }
    } catch (error) {
      console.error('Error applying boost:', error);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {packages.map((pkg) => (
          <BoostPackageCard
            key={pkg.id}
            pkg={pkg}
            isSelected={selectedPackage === pkg.id}
            onSelect={() => handleSelectPackage(pkg.id)}
            formatDuration={(duration) => typeof duration === 'string' ? duration : `${duration} minutes`}
          />
        ))}
      </div>

      <Button 
        className="w-full" 
        disabled={!selectedPackage || isSubmitting}
        onClick={handleApplyBoost}
      >
        {isSubmitting ? 'Applying boost...' : 'Apply Selected Boost'}
      </Button>
    </div>
  );
};

export default BoostPackages;
