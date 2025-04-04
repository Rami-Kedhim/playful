
import { useState, useEffect } from "react";
import { Zap, Loader2, Info } from "lucide-react";
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress"; // Fixed import - Progress is a UI component, not an icon
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/auth/useAuth";
import { 
  useBoostManager,
  formatBoostDuration 
} from "@/hooks/boost";
import BoostActivePackage from "./dialog/BoostActivePackage";
import BoostPackageList from "./dialog/BoostPackageList";
import BoostInfoTooltip from "./dialog/BoostInfoTooltip";

interface BoostProfileDialogProps {
  profileId: string;
  onSuccess?: () => void;
}

const BoostProfileDialog = ({ profileId, onSuccess }: BoostProfileDialogProps) => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("packages");
  const [boostAnalytics, setBoostAnalytics] = useState<any>(null);
  const { user } = useAuth();
  
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

  const fetchAnalytics = async () => {
    const analytics = await getBoostAnalytics();
    if (analytics) {
      setBoostAnalytics(analytics);
    }
    return true; // Return boolean to satisfy TypeScript
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
    return success; // Return boolean to satisfy TypeScript
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
            {!eligibility.eligible ? renderEligibilityMessage() : (
              <>
                <BoostPackageList
                  packages={boostPackages}
                  selectedPackage={selectedPackage}
                  onSelectPackage={setSelectedPackage}
                  formatBoostDuration={formatBoostDuration}
                  getBoostPrice={getBoostPrice}
                />
                
                <div className="p-3 bg-muted/10 border border-muted rounded-md">
                  <h4 className="text-sm font-medium mb-2 flex items-center">
                    <Info className="h-4 w-4 mr-2 text-blue-500" />
                    Oxum Ethical Boosting
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Limited to {dailyBoostLimit} boosts (12 hours) per day for fairness and equal opportunity.
                  </p>
                  <div className="mt-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Daily usage</span>
                      <span>{dailyBoostUsage} of {dailyBoostLimit}</span>
                    </div>
                    <Progress value={(dailyBoostUsage / dailyBoostLimit) * 100} className="h-1.5" />
                  </div>
                </div>
              </>
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
          </TabsContent>
        </Tabs>
        
        <BoostInfoTooltip />

        {activeTab === "packages" && eligibility.eligible && (
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handlePurchase} 
              disabled={!selectedPackage || loading || dailyBoostUsage >= dailyBoostLimit}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Zap className="mr-2 h-4 w-4" />
                  Boost Now {boostPackages.find(p => p.id === selectedPackage)?.price_lucoin} LC
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
