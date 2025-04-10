
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useBoostManager } from "@/hooks/boost/useBoostManager";
import { useHermesOxumBoost } from "@/hooks/boost/useHermesOxumBoost";
import BoostDialogHeader from "./dialog/BoostDialogHeader";
import BoostDialogTabs from "./dialog/BoostDialogTabs";
import BoostInfoTooltip from "./dialog/BoostInfoTooltip";
import { 
  adaptBoostStatus, 
  adaptBoostEligibility,
  adaptBoostPackages,
  adaptFormatBoostDuration,
  adaptGetBoostPrice
} from "@/hooks/boost/useBoostAdapters";

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

  // Add Hermes + Oxum integration
  const { hermesStatus: hermesBoostStatus } = useHermesOxumBoost(profileId);

  // Adapt types to match expected interfaces
  const boostStatus = adaptBoostStatus(managerBoostStatus);
  const eligibility = adaptBoostEligibility(managerEligibility);
  const boostPackages = adaptBoostPackages(managerBoostPackages);
  const formatBoostDuration = adaptFormatBoostDuration(formatBoostDuration);
  const getBoostPrice = adaptGetBoostPrice(managerGetBoostPrice);

  // Handle selected package conversion
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  // Update selected package when manager selected package changes
  useEffect(() => {
    if (managerSelectedPackage) {
      setSelectedPackage(managerSelectedPackage.id);
    } else {
      setSelectedPackage(null);
    }
  }, [managerSelectedPackage]);

  // Handle package selection
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

    // Find the manager package object from the selected package ID
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
          setSelectedPackage={handlePackageSelect}
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
