
import { useState, useEffect } from "react";
import { Zap } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/auth/useAuth";
import { 
  useBoostManager,
  formatBoostDuration 
} from "@/hooks/boost";
import useHermesOxumBoost from "@/hooks/boost/useHermesOxumBoost";
import BoostActivePackage from "./dialog/BoostActivePackage";
import BoostInfoTooltip from "./dialog/BoostInfoTooltip";
import HermesBoostInfo from "./dialog/HermesBoostInfo";
import BoostPackages from "./dialog/BoostPackages";
import BoostEligibilityMessage from "./dialog/BoostEligibilityMessage";

interface BoostProfileDialogProps {
  profileId: string;
  onSuccess?: () => void;
}

const BoostProfileDialog = ({ profileId, onSuccess }: BoostProfileDialogProps) => {
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
        <Button variant="outline" size="sm">
          <Zap className="mr-2 h-4 w-4" />
          Boost Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Boost Your Profile</DialogTitle>
          <DialogDescription>
            Get more visibility and appear higher in search results
          </DialogDescription>
        </DialogHeader>

        <Tabs 
          defaultValue="packages" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="mt-2"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="packages">Boost Packages</TabsTrigger>
            <TabsTrigger value="active">Active Boost</TabsTrigger>
          </TabsList>
          
          <TabsContent value="packages" className="space-y-4 mt-4">
            {!eligibility.eligible ? (
              <BoostEligibilityMessage reason={eligibility.reason} />
            ) : (
              <BoostPackages
                packages={boostPackages}
                selectedPackage={selectedPackage}
                onSelectPackage={setSelectedPackage}
                formatBoostDuration={formatBoostDuration}
                getBoostPrice={getBoostPrice}
                dailyBoostUsage={dailyBoostUsage}
                dailyBoostLimit={dailyBoostLimit}
                onPurchase={handlePurchase}
                loading={loading}
                onCancel={handleDialogClose}
              />
            )}
          </TabsContent>
          
          <TabsContent value="active" className="space-y-4 mt-4">
            <BoostActivePackage 
              boostStatus={boostStatus}
              boostAnalytics={boostAnalytics}
              onCancel={handleCancel}
              dailyBoostUsage={dailyBoostUsage}
              dailyBoostLimit={dailyBoostLimit}
            />
            
            {/* Add Hermes Boost Info when active */}
            {boostStatus.isActive && (
              <HermesBoostInfo hermesData={hermesBoostStatus} />
            )}
          </TabsContent>
        </Tabs>
        
        <BoostInfoTooltip />
      </DialogContent>
    </Dialog>
  );
};

export default BoostProfileDialog;
