import React, { useState, useEffect } from 'react';
import { useBoostManager } from '@/hooks/boost';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert'; // Import Alert components
import { AlertCircle } from 'lucide-react'; // Import AlertCircle icon
import BoostPackageSelection from './boost/BoostPackageSelection';
import BoostPurchaseConfirmation from './boost/BoostPurchaseConfirmation';
import BoostStatus from './boost/BoostStatus';
import HermesOxumQueueVisualization from './boost/HermesOxumQueueVisualization'; // Fixed import
import { BoostStatus as BoostStatusType, BoostPackage, BoostEligibility } from '@/types/boost';
import { BoostManagerContainerProps } from './boost/types';

interface CreatorBoostTabProps extends BoostManagerContainerProps {
  onClose: () => void;
}

const CreatorBoostTab: React.FC<CreatorBoostTabProps> = ({
  profileId,
  profileCompleteness,
  isVerified,
  rating,
  profileCreatedDate,
  country,
  role,
  ubxBalance,
  onClose
}) => {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localBoostStatus, setLocalBoostStatus] = useState<BoostStatusType>({
    isActive: false,
    remainingTime: '',
    packageName: '',
  });
  const [localPackages, setLocalPackages] = useState<BoostPackage[]>([]);

  const handleSelectPackage = (packageId: string) => {
    setSelectedPackage(packageId);
  };

  const handleContinueToPayment = () => {
    // Implement logic to continue to payment
    console.log('Continue to payment for package:', selectedPackage);
  };

  const handleBack = () => {
    // Implement logic to go back
    console.log('Go back to package selection');
  };

  const handlePurchase = async () => {
    if (!profileId || !selectedPackage) return;

    setIsSubmitting(true);
    try {
      if (purchaseBoost) {
        await purchaseBoost(profileId, selectedPackage);
        refreshStatus();
      }
    } catch (error) {
      console.error('Failed to purchase boost:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = async () => {
    setIsSubmitting(true);
    try {
      if (cancelBoost) {
        await cancelBoost();
        refreshStatus();
      }
    } catch (error) {
      console.error('Failed to cancel boost:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getBoostPrice = () => {
    if (!selectedPackage || !adaptGetBoostPrice) return 0;
    const selectedBoostPackage = packages.find(pkg => pkg.id === selectedPackage);
    return adaptGetBoostPrice(selectedBoostPackage?.price_ubx);
  };

  const selectedBoostPackage = packages.find(p => p.id === selectedPackage);

  // When using the imported hook
  const {
    boostStatus,
    hermesStatus,
    loading,
    error,
    packages,
    activateBoost,
    cancelBoost,
    isEligible,
    eligibilityReason,
    refreshStatus,
    eligibility, // Now available in the type
    dailyBoostUsage, // Now available in the type
    dailyBoostLimit, // Now available in the type
    purchaseBoost, // Now available in the type
    formatBoostDuration, // Now available in the type
    getBoostAnalytics, // Now available in the type
    fetchBoostPackages, // Now available in the type
    adaptGetBoostPrice, // Now available in the type
  } = useBoostManager(profileId); // profileId is now allowed to be string or object

  // Fix type assertions for state handling
  const localBoostStatus: BoostStatusType = {
    isActive: boostStatus?.isActive || false,
    remainingTime: boostStatus?.remainingTime || '',
    packageName: boostStatus?.packageName || '',
  };

  // In the useEffect, update with proper type conversion
  useEffect(() => {
    if (boostStatus) {
      const convertedStatus: BoostStatusType = {
        isActive: boostStatus.isActive,
        remainingTime: boostStatus.remainingTime?.toString() || '',
        // Add other necessary properties
        packageName: boostStatus.packageName,
        packageId: boostStatus.packageId,
        startedAt: boostStatus.startedAt,
        expiresAt: boostStatus.expiresAt,
        progress: boostStatus.progress,
      };
      setLocalBoostStatus(convertedStatus);
    }

    if (packages) {
      const convertedPackages: BoostPackage[] = packages.map(pkg => ({
        id: pkg.id,
        name: pkg.name,
        description: pkg.description,
        price: pkg.price,
        price_ubx: pkg.price_ubx,
        visibility: pkg.visibility,
        features: pkg.features,
        duration: pkg.duration,
      }));
      setLocalPackages(convertedPackages);
    }
  }, [boostStatus, packages]);

  // Fix BoostPackageSelection props
  return (
    <div className="space-y-6">
      <BoostStatus
        boostStatus={localBoostStatus}
        eligibility={{ eligible: isEligible, reason: eligibilityReason }}
        profileCompleteness={profileCompleteness || 0}
        rating={rating || 0}
        country={country || 'Unknown'}
        role={role || 'regular'}
        ubxBalance={ubxBalance || 0}
        boostPackages={localPackages}
        selectedPackage={selectedPackage} // Change from selected to selectedPackage
        onSelectPackage={handleSelectPackage} // Change from onSelect to onSelectPackage
        onPurchase={handlePurchase}
        onCancel={handleCancel}
        getBoostPrice={getBoostPrice}
        loading={isSubmitting}
      />

      <HermesOxumQueueVisualization profileId={profileId} activeBoosts={boostStatus?.isActive ? 1 : 0} />

      {!isEligible && (
        <Card>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4 mr-2" />
            <AlertDescription>
              {eligibility?.reason || eligibility?.reasons?.[0]}
            </AlertDescription>
          </Alert>
        </Card>
      )}
    </div>
  );
};

export default CreatorBoostTab;
