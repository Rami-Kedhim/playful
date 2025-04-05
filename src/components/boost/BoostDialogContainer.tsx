
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useBoostManager, formatBoostDuration } from "@/hooks/boost";
import useHermesOxumBoost from "@/hooks/boost/useHermesOxumBoost";
import BoostDialogHeader from "./dialog/BoostDialogHeader";
import BoostDialogTabs from "./dialog/BoostDialogTabs";
import BoostInfoTooltip from "./dialog/BoostInfoTooltip";

interface BoostDialogContainerProps {
  profileId: string;
  onSuccess?: () => void;
  buttonText?: string;
  buttonVariant?: "default" | "outline" | "destructive" | "ghost" | "link" | "secondary" | "lucoin";
  buttonSize?: "default" | "sm" | "lg" | "icon";
}

const BoostDialogContainer = ({
  profileId,
  onSuccess,
  buttonText = "Boost Profile",
  buttonVariant = "outline",
  buttonSize = "sm"
}: BoostDialogContainerProps) => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("packages");
  const [boostAnalytics, setBoostAnalytics] = useState<any>(null);
  
  const { 
    boostStatus, 
    eligibility,
    boostPackages, 
    selectedPackage, 
    setSelectedPackage,
    fetchBoostPackages, 
    getBoostPrice, 
    purchaseBoost,
    cancelBoost,
    loading,
    getBoostAnalytics,
    dailyBoostUsage,
    dailyBoostLimit
  } = useBoostManager(profileId);

  // Add Hermes + Oxum integration
  const { hermesBoostStatus } = useHermesOxumBoost(profileId);

  useEffect(() => {
    if (open) {
      fetchBoostPackages();
      if (boostStatus.isActive) {
        fetchAnalytics();
      }
    }
  }, [open, boostStatus.isActive]);

  const fetchAnalytics = async () => {
    const analytics = await getBoostAnalytics();
    if (analytics) {
      setBoostAnalytics(analytics);
    }
    return true;
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

    const success = await purchaseBoost(selectedPackage);
    
    if (success) {
      setActiveTab("active");
      if (onSuccess) onSuccess();
    }
  };

  const handleCancel = async () => {
    const success = await cancelBoost();
    if (success && onSuccess) {
      onSuccess();
    }
    return success;
  };

  const handleDialogClose = () => setOpen(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={buttonVariant} size={buttonSize}>
          <Zap className="mr-2 h-4 w-4" />
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <BoostDialogHeader />

        <BoostDialogTabs 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          boostStatus={boostStatus}
          eligibility={eligibility}
          boostPackages={boostPackages}
          selectedPackage={selectedPackage}
          setSelectedPackage={setSelectedPackage}
          handlePurchase={handlePurchase}
          handleCancel={handleCancel}
          handleDialogClose={handleDialogClose}
          boostAnalytics={boostAnalytics}
          formatBoostDuration={formatBoostDuration}
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

export default BoostDialogContainer;
