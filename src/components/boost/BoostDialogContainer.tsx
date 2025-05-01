
import React, { useState, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import BoostDialogTabs from './dialog/BoostDialogTabs';
import { useBoostContext } from '@/hooks/boost/useBoostContext';
import { HermesStatus } from '@/types/boost';

export interface BoostDialogContainerProps {
  profileId: string;
  onSuccess?: () => Promise<boolean>;
  buttonText?: string;
  buttonVariant?: string;
  buttonSize?: string;
  buttonProps?: {
    text: string;
    variant: string;
    size: string;
  };
  open?: boolean;
  setOpen?: (open: boolean) => void;
}

const BoostDialogContainer: React.FC<BoostDialogContainerProps> = ({
  profileId,
  onSuccess,
  buttonText = "Boost Profile",
  buttonVariant = "default",
  buttonSize = "default",
  buttonProps,
  open: externalOpen,
  setOpen: setExternalOpen,
}) => {
  const finalButtonText = buttonProps?.text || buttonText;
  const finalButtonVariant = buttonProps?.variant || buttonVariant;
  const finalButtonSize = buttonProps?.size || buttonSize;

  const [internalOpen, setInternalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("packages");
  const boostContext = useBoostContext();
  const {
    boostStatus,
    loading: isLoading,
    packages: boostPackages,
    cancelBoost,
  } = boostContext;

  const [selectedPackage, setSelectedPackage] = useState<string>("");

  const open = externalOpen !== undefined ? externalOpen : internalOpen;
  const setOpen = setExternalOpen || setInternalOpen;

  const handleDialogClose = useCallback(() => {
    setOpen(false);
    setActiveTab("packages");
  }, [setOpen]);

  const handleCancelBoost = useCallback(async () => {
    try {
      const result = boostContext.cancelBoost ? await boostContext.cancelBoost() : false;
      if (result) {
        if (onSuccess) {
          await onSuccess();
        }
        handleDialogClose();
      }
      return result;
    } catch (error) {
      console.error('Error cancelling boost:', error);
      return false;
    }
  }, [boostContext, onSuccess, handleDialogClose]);

  const handleBoost = useCallback(async () => {
    if (!selectedPackage) return false;
    
    const pkg = boostPackages.find(p => p.id === selectedPackage);
    if (!pkg) return false;

    try {
      const result = boostContext.boostProfile ? 
        await boostContext.boostProfile(profileId, pkg.id) : 
        false;
        
      if (result && onSuccess) {
        await onSuccess();
        handleDialogClose();
      }
      return result;
    } catch (error) {
      console.error("Error purchasing boost:", error);
      return false;
    }
  }, [selectedPackage, boostPackages, boostContext, profileId, onSuccess, handleDialogClose]);

  const getBoostPrice = useCallback(() => {
    if (!selectedPackage) return 0;
    
    const pkg = boostPackages.find(p => p.id === selectedPackage);
    return pkg?.price_ubx || pkg?.price || 0;
  }, [selectedPackage, boostPackages]);

  // Provide all required properties for HermesStatus
  const hermesStatusData: HermesStatus = {
    position: 0,
    activeUsers: 0,
    estimatedVisibility: 0,
    lastUpdateTime: '',
    boostScore: 0,
    effectivenessScore: 0
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={finalButtonVariant as any} size={finalButtonSize as any}>
          {finalButtonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Profile Boost</DialogTitle>
        </DialogHeader>
        
        <BoostDialogTabs 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          loading={isLoading}
          boostStatus={boostStatus || { isActive: false }}
          eligibility={{ isEligible: true }}
          boostPackages={boostPackages || []}
          selectedPackage={selectedPackage}
          setSelectedPackage={setSelectedPackage}
          handleBoost={handleBoost}
          handleCancel={handleCancelBoost}
          dailyBoostUsage={boostContext.dailyBoostUsage || 0}
          dailyBoostLimit={boostContext.dailyBoostLimit || 5}
          handleDialogClose={handleDialogClose}
          getBoostPrice={getBoostPrice}
          hermesStatus={hermesStatusData}
          formatBoostDuration={(duration) => `${duration}`}
        />
      </DialogContent>
    </Dialog>
  );
};

export default BoostDialogContainer;
