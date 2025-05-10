
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
import { BoostEligibility } from '@/types/pulse-boost';

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
    
    // Transform if needed (handling potential isEligible vs eligible property mismatch)
    return {
      eligible: boostEligibility.eligible || false,
      reason: boostEligibility.reason || '',
      reasons: boostEligibility.reasons || []
    };
  };

  const onCancelBoost = () => {
    handleCancelBoost();
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
          boostStatus={boostStatus}
          eligibility={getEligibility()}
          packages={packages}
          onBoostSuccess={handleBoost}
          profileId={profileId}
        />
      </DialogContent>
    </Dialog>
  );
};

export default BoostDialog;
