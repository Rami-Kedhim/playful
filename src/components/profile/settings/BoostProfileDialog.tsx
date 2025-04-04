
import { useEffect, useState } from "react";
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
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import useBoostManager from "@/hooks/useBoostManager";

interface BoostProfileDialogProps {
  onSuccess?: () => void;
}

const BoostProfileDialog = ({ onSuccess }: BoostProfileDialogProps) => {
  const [open, setOpen] = useState(false);
  const { profile } = useAuth();
  
  const profileId = profile?.id;

  const { 
    boostStatus, 
    eligibility,
    boostPackages, 
    selectedPackage, 
    setSelectedPackage,
    fetchBoostPackages, 
    purchaseBoost,
    loading,
    formatBoostDuration,
  } = useBoostManager(profileId);

  useEffect(() => {
    if (open) {
      fetchBoostPackages();
    }
  }, [open]);

  const handlePurchase = async () => {
    if (!selectedPackage) return;
    
    const success = await purchaseBoost(selectedPackage);
    
    if (success) {
      setOpen(false);
      if (onSuccess) onSuccess();
    }
  };

  const getProgressColor = (progress: number | undefined) => {
    if (progress === undefined) return 'bg-gray-500';
    if (progress >= 80) return 'bg-red-500';
    if (progress >= 60) return 'bg-orange-500';
    if (progress >= 40) return 'bg-yellow-500';
    if (progress >= 20) return 'bg-green-500';
    return 'bg-emerald-500';
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
            Get more visibility and attention with a profile boost
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {boostStatus.isActive && (
            <div className="bg-muted p-4 rounded-md space-y-2 mb-2">
              <div className="flex justify-between">
                <Badge variant="secondary">
                  <Zap className="h-3 w-3 mr-1" />
                  {boostStatus.boostPackage?.name}
                </Badge>
                <Badge variant="outline">{boostStatus.remainingTime} remaining</Badge>
              </div>
              <Progress 
                value={boostStatus.progress} 
                className={`h-2 ${getProgressColor(boostStatus.progress)}`} 
              />
              <p className="text-xs text-muted-foreground">
                Your profile is currently boosted and will appear with a VIP ribbon.
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
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
                    <Coins className="h-4 w-4 text-yellow-500" />
                    <span className="text-lg font-bold">{pkg.price_lucoin}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="flex justify-between items-center bg-muted p-3 rounded-md mt-2">
            <div className="flex items-center">
              <Coins className="h-4 w-4 text-yellow-500 mr-2" />
              <span className="text-sm">Your balance:</span>
              <span className="ml-2 font-medium">{profile?.lucoin_balance || 0} LC</span>
            </div>
          </div>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center text-sm text-muted-foreground cursor-help">
                  <Info className="h-4 w-4 mr-1" />
                  How do profile boosts work?
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  Boosted profiles appear with a VIP ribbon and get higher priority in search results and browsing.
                  The Oxum algorithm ensures fair and transparent boosting.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handlePurchase} 
            disabled={!selectedPackage || loading || !eligibility.eligible}
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
      </DialogContent>
    </Dialog>
  );
};

// Coins icon component 
const Coins = ({ className }: { className?: string }) => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path 
      d="M12 17.75C7.99594 17.75 4.75 15.8373 4.75 13.5V7.5C4.75 9.83731 7.99594 11.75 12 11.75C16.0041 11.75 19.25 9.83731 19.25 7.5V13.5C19.25 15.8373 16.0041 17.75 12 17.75Z" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M4.75 7.5C4.75 5.16269 7.99594 3.25 12 3.25C16.0041 3.25 19.25 5.16269 19.25 7.5C19.25 9.83731 16.0041 11.75 12 11.75C7.99594 11.75 4.75 9.83731 4.75 7.5Z" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export default BoostProfileDialog;
