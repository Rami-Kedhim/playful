
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
  useBoostManager,
  formatBoostDuration 
} from "@/hooks/boost";
import { 
  BoostPackageSelection, 
  BoostInfoTooltip,
  BoostActivePackage
} from "@/components/boost";
import { toast } from "@/hooks/use-toast";

interface BoostProfileDialogProps {
  onSuccess?: () => void;
}

const BoostProfileDialog = ({ onSuccess }: BoostProfileDialogProps) => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("packages");
  const [boostAnalytics, setBoostAnalytics] = useState<any>(null);
  const { user } = useAuth();
  
  const profileId = user?.id;

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

  useEffect(() => {
    if (open) {
      fetchBoostPackages();
      if (boostStatus.isActive) {
        fetchAnalytics();
      }
    }
  }, [open, boostStatus.isActive]);

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

    const success = await purchaseBoost(selectedPackage);
    
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

        <div className="grid gap-4 py-4">
          {boostStatus.isActive ? (
            <BoostActivePackage 
              boostStatus={boostStatus}
              boostAnalytics={boostAnalytics}
              onCancel={handleCancel}
              dailyBoostUsage={dailyBoostUsage || 0}
              dailyBoostLimit={dailyBoostLimit || 4}
            />
          ) : (
            <>
              {!eligibility.eligible ? renderEligibilityMessage() : (
                <BoostPackageSelection
                  packages={boostPackages}
                  selectedPackage={selectedPackage}
                  onSelectPackage={setSelectedPackage}
                  formatBoostDuration={formatBoostDuration}
                  isLoading={loading}
                />
              )}
            </>
          )}
          
          <BoostInfoTooltip />
        </div>

        {!boostStatus.isActive && eligibility.eligible && (
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
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
