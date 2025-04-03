
import { useState, useEffect } from "react";
import { Zap, Loader2, Calendar, Info } from "lucide-react";
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
import { useAuth } from "@/contexts/AuthContext";
import { useLucoins, BoostPackage } from "@/hooks/useLucoins";

interface BoostProfileDialogProps {
  onSuccess?: () => void;
}

const BoostProfileDialog = ({ onSuccess }: BoostProfileDialogProps) => {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [boostPackages, setBoostPackages] = useState<BoostPackage[]>([]);
  const [open, setOpen] = useState(false);
  const [activeBoost, setActiveBoost] = useState<any>(null);
  const [timeRemaining, setTimeRemaining] = useState<string>("");
  const [progress, setProgress] = useState(0);
  const { profile } = useAuth();
  const { loading, fetchBoostPackages, purchaseBoost, isProfileBoosted } = useLucoins();

  useEffect(() => {
    if (open) {
      loadPackages();
      checkActiveBoost();
    }
  }, [open]);

  const loadPackages = async () => {
    const data = await fetchBoostPackages();
    setBoostPackages(data);
    
    // Auto-select a featured package if available
    if (data.length > 0 && !selectedPackage) {
      setSelectedPackage(data[0].id);
    }
  };

  const checkActiveBoost = async () => {
    if (!profile) return;
    
    // This would be a simplified version
    // In a real implementation, you would fetch the active boost details from the database
    const isBoosted = await isProfileBoosted(profile.id);
    
    if (isBoosted) {
      // Mock active boost data for demonstration
      const mockBoost = {
        end_time: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
        start_time: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
        boost_package: {
          name: "Weekly Boost",
          duration: "168:00:00" // 7 days
        }
      };
      
      setActiveBoost(mockBoost);
      updateRemainingTime(mockBoost);
      
      // Set up an interval to update the remaining time
      const interval = setInterval(() => {
        updateRemainingTime(mockBoost);
      }, 60000); // Update every minute
      
      return () => clearInterval(interval);
    } else {
      setActiveBoost(null);
      setTimeRemaining("");
      setProgress(0);
    }
  };

  const updateRemainingTime = (boost: any) => {
    const endTime = new Date(boost.end_time).getTime();
    const now = Date.now();
    const diffMs = endTime - now;
    
    if (diffMs <= 0) {
      setTimeRemaining("Expired");
      setProgress(100);
      return;
    }
    
    const startTime = new Date(boost.start_time).getTime();
    const totalDuration = endTime - startTime;
    const elapsed = now - startTime;
    const progressValue = Math.min(100, Math.floor((elapsed / totalDuration) * 100));
    
    setProgress(progressValue);
    
    // Format remaining time
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    let timeString = "";
    if (days > 0) timeString += `${days}d `;
    if (hours > 0 || days > 0) timeString += `${hours}h `;
    timeString += `${minutes}m`;
    
    setTimeRemaining(timeString);
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

    if (activeBoost) {
      toast({
        title: "Already boosted",
        description: "You already have an active boost. Wait for it to expire or replace it.",
        variant: "destructive",
      });
      // In a real app, you might offer to extend or replace the existing boost
    }

    const success = await purchaseBoost(selectedPackage);
    
    if (success) {
      setOpen(false);
      if (onSuccess) onSuccess();
      
      // Force refresh of the active boost status
      checkActiveBoost();
    }
  };

  // Helper function to format the duration in a readable format
  const formatDuration = (durationStr: string) => {
    // Parse the PostgreSQL interval format "168:00:00" (hours:minutes:seconds)
    const parts = durationStr.split(':');
    const hours = parseInt(parts[0]);
    
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;
    
    if (days > 0) {
      return `${days} day${days !== 1 ? 's' : ''}${remainingHours > 0 ? ` ${remainingHours} hours` : ''}`;
    }
    
    return `${hours} hour${hours !== 1 ? 's' : ''}`;
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
          {activeBoost && (
            <div className="bg-muted p-4 rounded-md space-y-2 mb-2">
              <div className="flex justify-between">
                <Badge variant="secondary">
                  <Zap className="h-3 w-3 mr-1" />
                  {activeBoost.boost_package.name}
                </Badge>
                <Badge variant="outline">{timeRemaining} remaining</Badge>
              </div>
              <Progress value={progress} className="h-2" />
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
                    {formatDuration(pkg.duration)}
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
