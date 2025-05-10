
import React, { useState, useEffect } from 'react';
import BoostStatusDisplay from './BoostStatusDisplay';
import BoostDialog from './dialog/BoostDialog';
import { pulseBoostService } from '@/services/boost/pulseBoostService';
import { 
  convertPulseBoostPackageToBoostPackage,
  convertBoostStatusToPulseBoostStatus,
  convertBoostPackageToPulseBoostPackage,
  convertBoostPackagesArrayToPulseBoostPackagesArray,
  convertBoostEligibilityToPulseBoostEligibility
} from '@/utils/boost/typeConverters';
import { BoostPackage, BoostStatus, BoostEligibility } from '@/types/boost';

interface PulseBoostManagerProps {
  profileId: string;
}

const PulseBoostManager: React.FC<PulseBoostManagerProps> = ({ profileId }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [boostPackages, setBoostPackages] = useState<BoostPackage[]>([]);
  const [boostStatus, setBoostStatus] = useState<BoostStatus>({
    isActive: false,
    progress: 0,
    remainingTime: '0',
    isExpiring: false
  });
  
  const [eligibility, setEligibility] = useState<BoostEligibility>({
    eligible: true,
    isEligible: true,
    reasons: []
  });
  
  const [loading, setLoading] = useState(true);
  
  // Fetch boost packages on component mount
  useEffect(() => {
    const fetchBoostData = async () => {
      try {
        setLoading(true);
        
        // Fetch boost packages
        const packages = await pulseBoostService.getBoostPackages();
        // Convert the packages to the appropriate type
        const convertedPackages = packages.map(pkg => convertPulseBoostPackageToBoostPackage(pkg));
        setBoostPackages(convertedPackages);
        
        // Simulate getting boost status from API
        // In a real implementation, this would be a call to pulseBoostService.getBoostStatus(profileId)
        const mockActiveStatus = {
          isActive: Math.random() > 0.5, // Randomly set as active or not for demo
          packageName: 'Premium Boost',
          packageId: convertedPackages[1]?.id,
          progress: 65,
          remainingTime: '17h 23m',
          isExpiring: Math.random() > 0.7 // Randomly set as expiring
        };
        
        setBoostStatus(mockActiveStatus);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching boost data:', error);
        setLoading(false);
      }
    };
    
    fetchBoostData();
  }, [profileId]);
  
  // Apply a boost
  const handleApplyBoost = async (packageId: string): Promise<boolean> => {
    try {
      setLoading(true);
      
      // In a real app, this would call the API to purchase a boost
      // const result = await pulseBoostService.purchaseBoost(profileId, packageId);
      
      // For demo, simulate a successful purchase
      const selectedPackage = boostPackages.find(pkg => pkg.id === packageId);
      
      if (selectedPackage) {
        // Update boost status with the newly purchased boost
        const newStatus = {
          isActive: true,
          packageName: selectedPackage.name,
          packageId: selectedPackage.id,
          progress: 100, // Start at 100%
          remainingTime: '23h 59m',
          isExpiring: false,
        };
        
        setBoostStatus(newStatus);
      }
      
      // Close the dialog
      setIsDialogOpen(false);
      setLoading(false);
      return true;
    } catch (error) {
      console.error('Error applying boost:', error);
      setLoading(false);
      return false;
    }
  };
  
  // Cancel an active boost
  const handleCancelBoost = async (): Promise<boolean> => {
    try {
      setLoading(true);
      
      // In a real app, this would call the API to cancel the boost
      // const result = await pulseBoostService.cancelBoost(profileId);
      
      // For demo, simply update the status
      setBoostStatus({
        isActive: false,
        progress: 0,
        remainingTime: '0',
        isExpiring: false
      });
      
      setLoading(false);
      return true;
    } catch (error) {
      console.error('Error cancelling boost:', error);
      setLoading(false);
      return false;
    }
  };

  // Convert types for passing to BoostDialog
  const pulseBoostStatus = convertBoostStatusToPulseBoostStatus(boostStatus);
  const pulseEligibility = convertBoostEligibilityToPulseBoostEligibility(eligibility);
  const pulsePackages = convertBoostPackagesArrayToPulseBoostPackagesArray(boostPackages);

  return (
    <div className="space-y-6">
      <BoostStatusDisplay
        boostStatus={boostStatus}
        loading={loading}
        onCancel={handleCancelBoost}
        onApply={() => setIsDialogOpen(true)}
      />
      
      <BoostDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        profileId={profileId}
        boostStatus={pulseBoostStatus}
        eligibility={pulseEligibility}
        packages={pulsePackages}
        onBoost={handleApplyBoost}
        onCancel={handleCancelBoost}
        selectedPackage=""
        setSelectedPackage={() => {}}
      />
    </div>
  );
};

export default PulseBoostManager;
