
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
import { useBoostContext } from '@/contexts/BoostContext';

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
  // Use buttonProps if provided, otherwise use individual props
  const finalButtonText = buttonProps?.text || buttonText;
  const finalButtonVariant = buttonProps?.variant || buttonVariant;
  const finalButtonSize = buttonProps?.size || buttonSize;

  const [internalOpen, setInternalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("packages");
  const {
    boostStatus,
    eligibility,
    boostPackages,
    loading,
    dailyBoostUsage,
    dailyBoostLimit,
    purchaseBoost,
    cancelBoost
  } = useBoostContext();

  const [selectedPackage, setSelectedPackage] = useState<string>("");

  const open = externalOpen !== undefined ? externalOpen : internalOpen;
  const setOpen = setExternalOpen || setInternalOpen;

  const handleDialogClose = useCallback(() => {
    setOpen(false);
    setActiveTab("packages");
  }, [setOpen]);

  const handleCancelBoost = useCallback(async () => {
    try {
      const result = await cancelBoost();
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
  }, [cancelBoost, onSuccess, handleDialogClose]);

  const handleBoost = useCallback(async () => {
    if (!selectedPackage) return;
    
    const pkg = boostPackages.find(p => p.id === selectedPackage);
    if (!pkg) return;

    try {
      const result = await purchaseBoost(pkg);
      if (result && onSuccess) {
        await onSuccess();
        handleDialogClose();
      }
    } catch (error) {
      console.error("Error purchasing boost:", error);
    }
  }, [selectedPackage, boostPackages, purchaseBoost, onSuccess, handleDialogClose]);

  // Function to get price for selected boost package
  const getBoostPrice = useCallback(() => {
    if (!selectedPackage) return 0;
    
    const pkg = boostPackages.find(p => p.id === selectedPackage);
    return pkg?.price || 0;
  }, [selectedPackage, boostPackages]);

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
          loading={loading}
          boostStatus={boostStatus || { isActive: false, startTime: '', endTime: '', remainingTime: '' }}
          eligibility={eligibility || { isEligible: false, reason: 'Unknown' }}
          boostPackages={boostPackages}
          selectedPackage={selectedPackage}
          setSelectedPackage={setSelectedPackage}
          handleBoost={handleBoost}
          handleCancel={handleCancelBoost}
          dailyBoostUsage={dailyBoostUsage}
          dailyBoostLimit={dailyBoostLimit}
          handleDialogClose={handleDialogClose}
          getBoostPrice={getBoostPrice}
          hermesStatus={{
            position: 0,
            activeUsers: 0,
            estimatedVisibility: 0,
            lastUpdateTime: ''
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default BoostDialogContainer;
