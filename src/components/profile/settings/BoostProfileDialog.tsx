
import { useEffect, useState } from "react";
import { Zap, Loader2 } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/auth/useAuth";
import { 
  useBoostManager, formatBoostDuration
} from "@/hooks/boost";
import { 
  BoostPackageSelection, 
  BoostInfoTooltip,
  BoostActivePackage
} from "@/components/boost";
import { toast } from "@/components/ui/use-toast";
import {
  adaptBoostStatus,
  adaptBoostEligibility,
  adaptBoostPackages,
  adaptFormatBoostDuration,
  adaptGetBoostPrice
} from "@/hooks/boost/useBoostAdapters";

interface BoostProfileDialogProps {
  onSuccess?: () => void;
  onClose?: () => void;
  open?: boolean;
  setOpen?: (open: boolean) => void;
}

const BoostProfileDialog = ({ 
  onSuccess,
  onClose,
  open: controlledOpen,
  setOpen: setControlledOpen
}: BoostProfileDialogProps) => {
  const [open, setInternalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("packages");
  const [boostAnalytics, setBoostAnalytics] = useState<any>(null);
  const { user } = useAuth();
  
  const profileId = user?.id;

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

  // Adapt types to match expected interfaces
  const boostStatus = adaptBoostStatus(managerBoostStatus);
  const eligibility = adaptBoostEligibility(managerEligibility);
  const boostPackages = adaptBoostPackages(managerBoostPackages);
  const formatBoostDurationAdapter = adaptFormatBoostDuration(formatBoostDuration);
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

  // Handle controlled/uncontrolled state
  const isControlled = controlledOpen !== undefined && setControlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : open;
  const setIsOpen = isControlled ? setControlledOpen : setInternalOpen;

  useEffect(() => {
    if (isOpen) {
      fetchBoostPackages();
      if (boostStatus.isActive) {
        fetchAnalytics();
      }
    }
  }, [isOpen, boostStatus.isActive]);

  const fetchAnalytics = async (): Promise<boolean> => {
    const analytics = await getBoostAnalytics();
    if (analytics) {
      setBoostAnalytics(analytics);
      return true;
    }
    return false;
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

  const handleCancel = async (): Promise<boolean> => {
    const success = await cancelBoost();
    if (success && onSuccess) {
      onSuccess();
    }
    return success;
  };

  const handleDialogClose = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };

  const renderEligibilityMessage = () => {
    if (!eligibility.eligible) {
      return (
        <div className="text-center py-8">
          <div className="mb-4">
            <Zap className="h-12 w-12 mx-auto text-destructive opacity-50" />
          </div>
          <h3 className="text-lg font-medium mb-2">Not Eligible for Boosting</h3>
          <p className="text-muted-foreground mb-4">
            {eligibility.reason || "Your profile is not eligible for boosting at this time."}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {!isControlled && (
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Zap className="mr-2 h-4 w-4" />
            Boost Profile
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Boost Your Profile</DialogTitle>
          <DialogDescription>
            Get more visibility and appear higher in search results
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {boostStatus.isActive ? (
            <BoostActivePackage 
              boostStatus={boostStatus}
              boostAnalytics={boostAnalytics}
              onCancel={handleCancel}
              dailyBoostUsage={dailyBoostUsage}
              dailyBoostLimit={dailyBoostLimit}
            />
          ) : (
            <>
              {!eligibility.eligible ? renderEligibilityMessage() : (
                <BoostPackageSelection
                  packages={boostPackages}
                  selectedPackage={selectedPackage}
                  onSelectPackage={handlePackageSelect}
                  formatBoostDuration={formatBoostDurationAdapter}
                  isLoading={loading}
                />
              )}
            </>
          )}
          
          <BoostInfoTooltip />
        </div>

        {!boostStatus.isActive && eligibility.eligible && (
          <DialogFooter>
            <Button variant="outline" onClick={handleDialogClose}>
              Cancel
            </Button>
            <Button 
              onClick={handlePurchase} 
              disabled={!selectedPackage || loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Zap className="mr-2 h-4 w-4" />
                  Boost Now
                </>
              )}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BoostProfileDialog;
