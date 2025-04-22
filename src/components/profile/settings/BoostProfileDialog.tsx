
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useBoost } from "@/contexts/BoostContext";
import BoostDialogHeader from "@/components/boost/dialog/BoostDialogHeader";
import BoostDialogTabs from "@/components/boost/dialog/BoostDialogTabs";
import BoostInfoTooltip from "@/components/boost/dialog/BoostInfoTooltip";
import { useBoostManager } from "@/hooks/boost";
import { toast } from "@/components/ui/use-toast";
import { useBoostAdapters } from "@/hooks/boost/useBoostAdapters";
import { useHermesOxumBoost } from "@/hooks/boost/useHermesOxumBoost";

interface BoostProfileDialogProps {
  onSuccess?: () => void;
  onClose?: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const BoostProfileDialog = ({ 
  onSuccess, 
  onClose,
  open,
  setOpen
}: BoostProfileDialogProps) => {
  const { boostStatus: contextBoostStatus } = useBoost();
  const [activeTab, setActiveTab] = useState<string>("packages");
  const [boostAnalytics, setBoostAnalytics] = useState<any>(null);
  const profileId = contextBoostStatus?.profileId || '';

  const { 
    boostStatus: managerBoostStatus, 
    eligibility: managerEligibility,
    boostPackages: managerBoostPackages, 
    loading,
    purchaseBoost,
    cancelBoost,
    getBoostAnalytics,
    dailyBoostUsage,
    dailyBoostLimit,
    adaptBoostStatus,
    adaptBoostEligibility,
    adaptBoostPackages,
    adaptFormatBoostDuration,
    adaptGetBoostPrice,
    fetchBoostPackages
  } = useBoostAdapters(profileId);

  const { hermesStatus: hermesBoostStatus } = useHermesOxumBoost(profileId);

  // Convert data using adapters
  const boostStatus = adaptBoostStatus(managerBoostStatus);
  const eligibility = adaptBoostEligibility(managerEligibility);
  const boostPackages = adaptBoostPackages(managerBoostPackages);
  
  // Use updated adapter function
  const formatBoostDurationAdapter = adaptFormatBoostDuration((duration: string) => {
    const [hours, minutes] = duration.split(':').map(Number);
    return hours >= 24 ? 
      `${Math.floor(hours / 24)} days` : 
      `${hours} hours`;
  });
  
  const getBoostPrice = adaptGetBoostPrice(() => 15);

  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      if (fetchBoostPackages) {
        fetchBoostPackages();
      }
      if (boostStatus.isActive && getBoostAnalytics) {
        fetchAnalytics();
      }
    }
  }, [open, boostStatus.isActive, fetchBoostPackages]);

  const fetchAnalytics = async () => {
    if (getBoostAnalytics) {
      const analytics = await getBoostAnalytics();
      if (analytics) {
        setBoostAnalytics(analytics);
      }
      return analytics;
    }
    return null;
  };

  const handlePackageSelect = (packageId: string) => {
    setSelectedPackage(packageId);
  };

  const handlePurchase = async (): Promise<void> => {
    if (!selectedPackage) {
      toast({
        title: "No package selected",
        description: "Please select a boost package",
        variant: "destructive",
      });
      return;
    }

    const packageToBoost = boostPackages.find(p => p.id === selectedPackage);
    
    if (!packageToBoost) {
      toast({
        title: "Package not found",
        description: "The selected package could not be found",
        variant: "destructive",
      });
      return;
    }
    
    const success = await purchaseBoost(packageToBoost);
    
    if (success) {
      setActiveTab("active");
      if (onSuccess) onSuccess();
    }
  };

  const handleCancel = async (): Promise<void> => {
    const success = await cancelBoost();
    if (success) {
      if (onSuccess) onSuccess();
    }
  };

  const handleCloseDialog = () => {
    if (onClose) onClose();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <BoostDialogHeader />

        <BoostDialogTabs 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          boostStatus={boostStatus}
          eligibility={eligibility}
          boostPackages={boostPackages}
          selectedPackage={selectedPackage || ""}
          setSelectedPackage={handlePackageSelect}
          handleBoost={handlePurchase}
          handleCancel={handleCancel}
          handleDialogClose={handleCloseDialog}
          hermesStatus={hermesBoostStatus}
          loading={loading}
          dailyBoostUsage={dailyBoostUsage}
          dailyBoostLimit={dailyBoostLimit}
          formatBoostDuration={formatBoostDurationAdapter}
          getBoostPrice={getBoostPrice}
          boostAnalytics={boostAnalytics}
        />
        
        <BoostInfoTooltip />
      </DialogContent>
    </Dialog>
  );
};

export default BoostProfileDialog;
