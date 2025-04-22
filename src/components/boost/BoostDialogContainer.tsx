
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import BoostDialogTabs from "./dialog/BoostDialogTabs";
import { useBoostAdapters, adaptBoostStatus, adaptBoostEligibility, adaptBoostPackages } from "@/hooks/boost/useBoostAdapters";
import { useAuth } from "@/hooks/auth/useAuth";
import { BoostStatus, BoostEligibility, BoostPackage } from "@/types/boost";

export interface BoostDialogContainerProps {
  profileId: string;
  onSuccess?: () => Promise<boolean>;
  buttonProps?: { text?: string; variant?: string; size?: string };
  open?: boolean;
  setOpen?: (open: boolean) => void;
  buttonText?: string;
  buttonVariant?: string;
  buttonSize?: string;
}

const BoostDialogContainer: React.FC<BoostDialogContainerProps> = ({
  profileId,
  onSuccess,
  buttonProps,
  open: propOpen,
  setOpen: propSetOpen,
  buttonText = "Boost Profile",
  buttonVariant = "default",
  buttonSize = "default"
}) => {
  const [open, setOpen] = useState(propOpen || false);
  const [activeTab, setActiveTab] = useState("boost");
  const { user } = useAuth();
  
  // Use controlled or uncontrolled open state based on props
  const dialogOpen = propOpen !== undefined ? propOpen : open;
  const setDialogOpen = propSetOpen || setOpen;

  const {
    boostStatus: rawBoostStatus,
    eligibility: rawEligibility,
    boostPackages: rawPackages,
    dailyBoostUsage,
    dailyBoostLimit,
    loading: boostLoading,
    purchaseBoost,
    cancelBoost,
    getBoostPrice
  } = useBoostAdapters(profileId || user?.id || '');

  // Convert types to ensure compatibility
  const boostStatus: BoostStatus = adaptBoostStatus(rawBoostStatus);
  const eligibility: BoostEligibility = adaptBoostEligibility(rawEligibility);
  const boostPackages: BoostPackage[] = adaptBoostPackages(rawPackages);

  // Mock Hermes boost status for now
  const hermesStatus = {
    position: 5,
    activeUsers: 120,
    estimatedVisibility: 85,
    lastUpdateTime: new Date().toISOString()
  };

  const [selectedPackage, setSelectedPackage] = useState("");

  useEffect(() => {
    // Set default selected package if packages exist and none is selected
    if (boostPackages.length > 0 && !selectedPackage) {
      setSelectedPackage(boostPackages[0].id);
    }
  }, [boostPackages, selectedPackage]);

  // Format duration string helper function
  const formatBoostDuration = (duration: string): string => {
    const [hours, minutes] = duration.split(':').map(Number);
    if (hours >= 24) {
      const days = Math.floor(hours / 24);
      return `${days} ${days === 1 ? 'day' : 'days'}`;
    }
    return `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
  };

  // Handle boost purchase
  const handlePurchase = async (): Promise<void> => {
    const selectedPkg = boostPackages.find(pkg => pkg.id === selectedPackage);
    if (!selectedPkg) return;

    const result = await purchaseBoost(selectedPkg);
    
    if (result && onSuccess) {
      await onSuccess();
    }

    if (result) {
      setDialogOpen(false);
    }
  };

  // Handle boost cancellation
  const handleBoost = async (): Promise<void> => {
    if (boostStatus?.isActive) {
      await cancelBoost();
    } else {
      await handlePurchase();
    }
  };

  // Handle boost cancel
  const handleCancel = async (): Promise<void> => {
    const result = await cancelBoost();
    if (result && onSuccess) {
      await onSuccess();
    }
  };

  // Dialog close handler
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const getBoostPriceWrapper = () => {
    return getBoostPrice();
  };

  return (
    <>
      <Button
        onClick={() => setDialogOpen(true)}
        variant={buttonProps?.variant || buttonVariant as any}
        size={buttonProps?.size || buttonSize as any}
      >
        {buttonProps?.text || buttonText}
      </Button>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-2xl">PULSE Boost System</DialogTitle>
          </DialogHeader>
          
          <BoostDialogTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            boostStatus={boostStatus}
            eligibility={eligibility}
            boostPackages={boostPackages}
            selectedPackage={selectedPackage}
            setSelectedPackage={setSelectedPackage}
            handleBoost={handleBoost}
            handleCancel={handleCancel}
            dailyBoostUsage={dailyBoostUsage}
            dailyBoostLimit={dailyBoostLimit}
            hermesStatus={hermesStatus}
            loading={boostLoading}
            formatBoostDuration={formatBoostDuration}
            getBoostPrice={getBoostPriceWrapper}
            handlePurchase={handlePurchase}
            handleDialogClose={handleDialogClose}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BoostDialogContainer;
