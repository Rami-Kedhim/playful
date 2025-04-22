// Creating a temporary mock implementation for this component
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { useBoostContext } from "@/contexts/BoostContext";
import { formatDistance } from "date-fns";
import BoostDialogTabs from "./dialog/BoostDialogTabs";
import { HermesBoostStatus, BoostDialogContainerProps } from "./types";

const BoostDialogContainer = ({
  profileId,
  onSuccess,
  buttonProps,
  open,
  setOpen,
  buttonText = "Boost Profile",
  buttonVariant = "outline",
  buttonSize = "sm"
}: BoostDialogContainerProps) => {
  const [dialogOpen, setDialogOpen] = useState(open || false);
  const [activeTab, setActiveTab] = useState("packages");
  const [hermesBoostStatus, setHermesBoostStatus] = useState<HermesBoostStatus | undefined>(undefined);
  
  const {
    boostStatus,
    isLoading,
    dailyBoostUsage,
    dailyBoostLimit,
    purchaseBoost,
    cancelBoost,
  } = useBoostContext();

  // Handle external open state if provided
  useEffect(() => {
    if (open !== undefined) {
      setDialogOpen(open);
    }
  }, [open]);

  // Handle close event both internally and externally
  const handleOpenChange = (newOpen: boolean) => {
    setDialogOpen(newOpen);
    if (setOpen) {
      setOpen(newOpen);
    }
  };
  
  // Mock boost packages for demo purposes
  const boostPackages = [
    {
      id: "boost-1",
      name: "Quick Boost",
      duration: "06:00:00",
      price_ubx: 25,
      description: "Get a 6-hour visibility boost",
      features: ["Top of search results", "Featured profile badge"]
    },
    {
      id: "boost-2",
      name: "Daily Boost",
      duration: "24:00:00",
      price_ubx: 50,
      description: "Get a full day visibility boost",
      features: ["Extended visibility", "Priority in feeds"]
    },
    {
      id: "boost-3",
      name: "Weekend Boost",
      duration: "72:00:00",
      price_ubx: 120,
      description: "Maximum visibility for 3 days",
      features: ["Maximum exposure", "Featured everywhere", "Analytics report"]
    }
  ];
  
  const [selectedPackage, setSelectedPackage] = useState<string>("");
  
  // Mock eligibility for demo purposes
  const eligibility = {
    isEligible: true,
    reason: ""
  };
  
  useEffect(() => {
    if (dialogOpen) {
      // Mock fetching Hermes boost status
      setHermesBoostStatus({
        position: 3,
        activeUsers: 125,
        estimatedVisibility: 65,
        lastUpdateTime: new Date().toISOString(),
        timeRemaining: 16 * 60 + 32, // 16h 32m in minutes
        boostScore: 85,
        effectivenessScore: 75
      });
    }
  }, [dialogOpen]);
  
  // Format boost duration for display
  const formatBoostDuration = (duration: string): string => {
    // Parse HH:MM:SS format
    const [hours, minutes] = duration.split(":").map(Number);
    
    if (hours >= 24) {
      const days = Math.floor(hours / 24);
      return `${days} day${days !== 1 ? 's' : ''}`;
    }
    
    return `${hours} hour${hours !== 1 ? 's' : ''}`;
  };
  
  // Get boost price based on selected package
  const getBoostPrice = (): number => {
    const pkg = boostPackages.find(p => p.id === selectedPackage);
    return pkg ? pkg.price_ubx : 0;
  };
  
  // Handle purchasing boost
  const handleBoost = async (): Promise<void> => {
    const success = await purchaseBoost(selectedPackage);
    
    if (success && onSuccess) {
      onSuccess();
      setActiveTab("active");
    }
  };
  
  // Handle cancelling boost
  const handleCancel = async (): Promise<void> => {
    const success = await cancelBoost();
    
    if (success && onSuccess) {
      onSuccess();
      setActiveTab("packages");
    }
  };
  
  // Handle closing dialog
  const handleDialogClose = () => {
    handleOpenChange(false);
  };
  
  return (
    <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Zap className="h-5 w-5 mr-2 text-yellow-500" />
            Boost Your Profile
          </DialogTitle>
        </DialogHeader>
        
        <BoostDialogTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          boostStatus={boostStatus}
          eligibility={eligibility}
          hermesStatus={hermesBoostStatus}
          boostPackages={boostPackages}
          selectedPackage={selectedPackage}
          setSelectedPackage={setSelectedPackage}
          formatBoostDuration={formatBoostDuration}
          getBoostPrice={getBoostPrice}
          handleBoost={handleBoost}
          handlePurchase={handlePurchase}
          handleCancel={handleCancel}
          handleDialogClose={handleDialogClose}
          dailyBoostUsage={dailyBoostUsage}
          dailyBoostLimit={dailyBoostLimit}
          loading={isLoading}
          hermesBoostStatus={hermesBoostStatus}
          boostAnalytics={undefined}
        />
      </DialogContent>
    </Dialog>
  );
};

export default BoostDialogContainer;
