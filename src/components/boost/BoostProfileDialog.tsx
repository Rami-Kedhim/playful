import { useState, useEffect } from "react";
import { Zap, Loader2, Calendar, Info, X, Award, TrendingUp } from "lucide-react";
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
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/auth/useAuth";
import { useBoostManager } from "@/hooks/boost";

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
    formatBoostDuration,
    getBoostAnalytics
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
  };

  const getScoreColor = (progress: number | undefined) => {
    if (progress === undefined) return 'bg-gray-500';
    if (progress >= 80) return 'bg-red-500'; // Almost expired
    if (progress >= 60) return 'bg-orange-500';
    if (progress >= 40) return 'bg-yellow-500';
    if (progress >= 20) return 'bg-green-500';
    return 'bg-emerald-500'; // Just started
  };

  const renderActiveBoost = () => {
    if (!boostStatus.isActive) {
      return (
        <div className="text-center py-8">
          <div className="mb-4">
            <TrendingUp className="h-12 w-12 mx-auto text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">No Active Boost</h3>
          <p className="text-muted-foreground mb-4">
            You don't have any active boost. Purchase one to increase your profile visibility.
          </p>
          <Button onClick={() => setActiveTab("packages")}>
            <Zap className="mr-2 h-4 w-4" />
            Purchase Boost
          </Button>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="p-4 border rounded-lg bg-muted/30">
          <div className="flex justify-between items-center mb-2">
            <Badge variant="secondary" className="gap-1 px-3 py-1">
              <Award className="h-3.5 w-3.5" />
              {boostStatus.boostPackage?.name}
            </Badge>
            <Badge variant="outline" className="px-3 py-1">
              {boostStatus.remainingTime} remaining
            </Badge>
          </div>
          
          <Progress 
            value={boostStatus.progress} 
            className={`h-2 ${getScoreColor(boostStatus.progress)}`}
          />
          
          <div className="flex justify-between items-center mt-2 text-xs text-muted-foreground">
            <span>Started</span>
            <span>Expires {boostStatus.expiresAt?.toLocaleDateString()}</span>
          </div>
        </div>
        
        {boostAnalytics && (
          <div className="grid grid-cols-3 gap-2 mt-4">
            <Card className="p-3 text-center">
              <h4 className="text-xs text-muted-foreground mb-1">Extra Views</h4>
              <p className="text-xl font-bold">+{boostAnalytics.additionalViews}</p>
            </Card>
            <Card className="p-3 text-center">
              <h4 className="text-xs text-muted-foreground mb-1">Engagement</h4>
              <p className="text-xl font-bold">+{boostAnalytics.engagementIncrease}%</p>
            </Card>
            <Card className="p-3 text-center">
              <h4 className="text-xs text-muted-foreground mb-1">Rank</h4>
              <p className="text-xl font-bold">#{boostAnalytics.rankingPosition}</p>
            </Card>
          </div>
        )}
        
        <div className="flex justify-end mt-4">
          <Button variant="outline" size="sm" onClick={handleCancel}>
            <X className="mr-2 h-4 w-4" />
            Cancel Boost
          </Button>
        </div>
      </div>
    );
  };

  const renderPackages = () => {
    if (!eligibility.eligible) {
      return (
        <div className="text-center py-8">
          <div className="mb-4">
            <X className="h-12 w-12 mx-auto text-destructive" />
          </div>
          <h3 className="text-lg font-medium mb-2">Not Eligible for Boosting</h3>
          <p className="text-muted-foreground mb-4">
            {eligibility.reason || "Your profile is not eligible for boosting at this time."}
          </p>
        </div>
      );
    }

    return (
      <div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-4">
          {boostPackages.map((pkg) => (
            <Card 
              key={pkg.id}
              className={`p-4 cursor-pointer transition-all ${
                selectedPackage === pkg.id 
                  ? "ring-2 ring-primary" 
                  : "hover:shadow-md"
              }`}
              onClick={() => setSelectedPackage(pkg.id)}
            >
              <div className="text-center">
                <h3 className="font-medium">{pkg.name}</h3>
                <div className="text-sm text-muted-foreground my-2">
                  {formatBoostDuration(pkg.duration)}
                </div>
                <div className="flex items-center justify-center gap-1 mt-2">
                  <Zap className="h-4 w-4 text-yellow-500" />
                  <span className="text-lg font-bold">{pkg.price_lucoin}</span>
                  <span className="text-xs text-muted-foreground">LC</span>
                </div>
                {pkg.features && pkg.features.length > 0 && (
                  <div className="mt-3 text-xs text-left">
                    <p className="font-medium mb-1">Includes:</p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      {pkg.features.map((feature, i) => (
                        <li key={i}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
        
        <div className="flex justify-between items-center bg-muted p-3 rounded-md">
          <div className="flex items-center">
            <Zap className="h-4 w-4 text-yellow-500 mr-2" />
            <span className="text-sm">Your balance:</span>
            <span className="ml-2 font-medium">1000 LC</span>
          </div>
          
          <div className="flex items-center text-muted-foreground text-sm">
            <span>Dynamic price:</span>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-4 w-4 mx-1 cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  The Oxum algorithm adjusts the boost price based on your profile quality, 
                  location, and current demand.
                </p>
              </TooltipContent>
            </Tooltip>
            <span className="font-medium">{getBoostPrice()} LC</span>
          </div>
        </div>
      </div>
    );
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
            {renderPackages()}
          </TabsContent>
          
          <TabsContent value="active" className="space-y-4 mt-4">
            {renderActiveBoost()}
          </TabsContent>
        </Tabs>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center text-sm text-muted-foreground cursor-help mt-2">
                <Info className="h-4 w-4 mr-1" />
                How do profile boosts work?
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">
                Boosted profiles appear with a special badge and get higher priority in search 
                results and browsing. The Oxum algorithm ensures fairness in the boosting system.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {activeTab === "packages" && eligibility.eligible && (
          <DialogFooter className="mt-4">
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
