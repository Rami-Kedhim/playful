import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Zap } from 'lucide-react';
import { useBoostDialog } from '@/hooks/boost/useBoostDialog';
import BoostDialogTabs from './dialog/BoostDialogTabs';

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
    eligibility,
    packages,
    loading,
    dailyBoostUsage,
    dailyBoostLimit,
    getBoostPrice,
    hermesStatus,
    formatBoostDuration = (d) => d,
  } = useBoostDialog(profileId);

  // Helper function to initialize eligibility
  const initializeEligibility = (): BoostEligibility => {
    return {
      eligible: true,
      reason: '',
      reasons: [],
    };
  };

  const [eligibility, setEligibility] = useState<BoostEligibility>(initializeEligibility());

  const onCancelBoost = () => {
    handleCancelBoost();
    setEligibility(initializeEligibility());
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
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          boostStatus={boostStatus}
          eligibility={eligibility}
          boostPackages={packages}
          selectedPackage={selectedPackage}
          setSelectedPackage={setSelectedPackage}
          handleBoost={handleBoost}
          handleCancel={onCancelBoost}
          loading={loading}
          dailyBoostUsage={dailyBoostUsage}
          dailyBoostLimit={dailyBoostLimit}
          handleDialogClose={() => onOpenChange(false)}
          getBoostPrice={getBoostPrice}
          hermesStatus={hermesStatus}
          formatBoostDuration={formatBoostDuration}
        />
      </DialogContent>
    </Dialog>
  );
};

export default BoostDialog;
