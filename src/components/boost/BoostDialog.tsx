
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Zap } from 'lucide-react';
import { useBoostDialog } from '@/hooks/boost/useBoostDialog';
import BoostDialogTabs from './dialog/BoostDialogTabs';
import { BoostEligibility, BoostStatus, BoostPackage } from '@/types/pulse-boost';

interface BoostDialogProps {
  profileId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BoostDialog: React.FC<BoostDialogProps> = ({
  profileId,
  open,
  onOpenChange,
}) => {
  const {
    activeTab,
    setActiveTab,
    selectedPackage,
    setSelectedPackage,
    handleBoost,
    handleCancelBoost,
    boostStatus,
    eligibility: boostEligibility,
    packages,
    loading,
    dailyBoostUsage,
    dailyBoostLimit,
    getBoostPrice,
    hermesStatus,
    formatBoostDuration = (d) => d,
  } = useBoostDialog(profileId);

  // Helper function to ensure eligibility matches the required type
  const getEligibility = (): BoostEligibility => {
    if (!boostEligibility) {
      return {
        eligible: false,
        reason: 'Unknown eligibility status',
        reasons: []
      };
    }
    
    // Transform if needed (handling property mismatches)
    const eligibilityObj: BoostEligibility = {
      eligible: boostEligibility.eligible || boostEligibility.isEligible || false,
      reason: boostEligibility.reason || '',
      reasons: boostEligibility.reasons || [],
      nextEligibleTime: boostEligibility.nextEligibleTime
    };
    
    return eligibilityObj;
  };

  // Ensure boostPackages meet the types required by pulse-boost.ts
  const sanitizePackages = (pkgs: any[]): BoostPackage[] => {
    return pkgs.map(pkg => ({
      ...pkg,
      description: pkg.description || '',
    })) as BoostPackage[];
  };

  // Also make sure boostStatus meets type requirements
  const sanitizeBoostStatus = (status: any): BoostStatus => {
    return {
      ...status,
      remainingTime: status?.remainingTime ? String(status.remainingTime) : '',
    };
  };

  // Create wrapper functions to match expected return types
  const handleBoostSuccess = async (): Promise<void> => {
    await handleBoost();
  };
  
  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Zap className="h-5 w-5 mr-2 text-primary" />
            Boost Profile
          </DialogTitle>
        </DialogHeader>

        <BoostDialogTabs
          boostStatus={sanitizeBoostStatus(boostStatus)}
          packages={sanitizePackages(packages)}
          eligibility={getEligibility()}
          onSuccess={handleBoostSuccess}
          onBoostSuccess={handleBoost}
          profileId={profileId}
          onClose={handleClose}
        />
      </DialogContent>
    </Dialog>
  );
};

export default BoostDialog;
