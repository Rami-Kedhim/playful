
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useBoostContext } from "@/contexts/BoostContext";
import BoostDialogHeader from "@/components/boost/dialog/BoostDialogHeader";
import BoostDialogTabs from "@/components/boost/dialog/BoostDialogTabs";
import BoostInfoTooltip from "@/components/boost/dialog/BoostInfoTooltip";
import { useBoostManager, formatBoostDuration } from "@/hooks/boost";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { 
  adaptBoostStatus, 
  adaptBoostEligibility,
  adaptBoostPackages,
  adaptFormatBoostDuration,
  adaptGetBoostPrice
} from "@/hooks/boost/useBoostAdapters";
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
  const { boostStatus: contextBoostStatus } = useBoostContext();
  const [activeTab, setActiveTab] = useState<string>("packages");
  const [boostAnalytics, setBoostAnalytics] = useState<any>(null);
  const profileId = contextBoostStatus.profileId || '';

  const { 
    boostStatus: managerBoostStatus, 
    eligibility: managerEligibility,
    boostPackages: managerBoostPackages, 
    selectedPackage: managerSelectedPackage, 
    setSelectedPackage: managerSetSelectedPackage,
    fetchBoostPackages, 
    getBoostPrice: managerGetBoostPrice, 
    purchaseBoost,
    cancelBoost,
    loading,
    getBoostAnalytics,
    dailyBoostUsage,
    dailyBoostLimit
  } = useBoostManager(profileId);

  const { hermesStatus: hermesBoostStatus } = useHermesOxumBoost(profileId);

  const boostStatus = adaptBoostStatus(managerBoostStatus);
  const eligibility = adaptBoostEligibility(managerEligibility);
  const boostPackages = adaptBoostPackages(managerBoostPackages);
  
  // Use updated adapter function
  const formatBoostDurationAdapter = adaptFormatBoostDuration(formatBoostDuration);
  const getBoostPrice = adaptGetBoostPrice(managerGetBoostPrice);

  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  useEffect(() => {
    if (managerSelectedPackage) {
      setSelectedPackage(managerSelectedPackage.id);
    } else {
      setSelectedPackage(null);
    }
  }, [managerSelectedPackage]);

  const handlePackageSelect = (packageId: string) => {
    const pkg = managerBoostPackages.find(p => p.id === packageId);
    if (pkg) {
      managerSetSelectedPackage(pkg);
    }
  };

  useEffect(() => {
    if (open) {
      fetchBoostPackages();
      if (boostStatus.isActive) {
        fetchAnalytics();
      }
    }
  }, [open, boostStatus.isActive, fetchBoostPackages]);

  const fetchAnalytics = async () => {
    const analytics = await getBoostAnalytics();
    if (analytics) {
      setBoostAnalytics(analytics);
    }
    return analytics;
  };

  const handlePurchase = async () => {
    if (!selectedPackage) {
      toast({
        title: "No package selected",
        description: "Please select a boost package",
        variant: "destructive",
      });
      return;
    }

    const packageToBoost = managerBoostPackages.find(p => p.id === selectedPackage);
    
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

  const handleCancel = async () => {
    const success = await cancelBoost();
    if (success) {
      if (onSuccess) onSuccess();
    }
    return success;
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
          selectedPackage={selectedPackage}
          setSelectedPackage={handlePackageSelect}
          handlePurchase={handlePurchase}
          handleCancel={handleCancel}
          handleDialogClose={handleCloseDialog}
          boostAnalytics={boostAnalytics}
          formatBoostDuration={formatBoostDurationAdapter}
          getBoostPrice={getBoostPrice}
          loading={loading}
          dailyBoostUsage={dailyBoostUsage}
          dailyBoostLimit={dailyBoostLimit}
          hermesBoostStatus={hermesBoostStatus}
        />
        
        <BoostInfoTooltip />
      </DialogContent>
    </Dialog>
  );
};

export default BoostProfileDialog;
