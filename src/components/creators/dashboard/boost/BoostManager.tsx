
import { useState, useEffect } from "react";
import { BoostPackage } from "@/types/boost";
import { useBoostStatus } from "@/hooks/creator/useBoostStatus";
import BoostStatusCard from "./BoostStatusCard";
import BoostPackageGrid from "./BoostPackageGrid";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, AlertCircle, Zap } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useParams } from "react-router-dom";
import { calculateBoostPrice, isEligibleForBoosting, getCurrentTimeSlot } from "@/utils/boostCalculator";

interface BoostManagerProps {
  creatorId: string;
  profileCompleteness: number;
  isVerified: boolean;
  rating: number;
  profileCreatedDate: Date;
  country: string;
  role?: 'regular' | 'AI' | 'verified';
  lucoinBalance: number;
}

const BoostManager = ({
  creatorId,
  profileCompleteness,
  isVerified,
  rating,
  profileCreatedDate,
  country,
  role = 'regular',
  lucoinBalance
}: BoostManagerProps) => {
  const { boostStatus, loading: loadingStatus } = useBoostStatus(creatorId);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<BoostPackage | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availablePackages, setAvailablePackages] = useState<BoostPackage[]>([]);
  const { toast } = useToast();
  
  // Check if profile is eligible for boosting
  const profileAge = Math.floor((new Date().getTime() - profileCreatedDate.getTime()) / (1000 * 60 * 60 * 24));
  const eligibility = isEligibleForBoosting(profileCompleteness, isVerified, profileAge, boostStatus.expiresAt);
  
  useEffect(() => {
    // In a real app, this would fetch available packages from an API
    const fetchAvailablePackages = async () => {
      const timeSlot = getCurrentTimeSlot();
      
      // Calculate boost price based on Oxum algorithm
      const basePrice = calculateBoostPrice({
        country,
        completeness: profileCompleteness,
        rating,
        timeSlot,
        role
      });
      
      // Generate package options based on the calculated base price
      const packages: BoostPackage[] = [
        {
          id: "boost-basic",
          name: "Basic Boost",
          duration: "24:00:00", // 1 day
          price_lucoin: basePrice,
          features: ["Priority in search results", "Highlighted profile"],
          description: "24-hour visibility boost"
        },
        {
          id: "boost-standard",
          name: "Standard Boost",
          duration: "72:00:00", // 3 days
          price_lucoin: Math.round(basePrice * 2.5),
          features: ["Priority in search results", "Highlighted profile", "Featured section placement"],
          description: "3-day comprehensive boost package"
        },
        {
          id: "boost-premium",
          name: "Premium Boost",
          duration: "168:00:00", // 7 days
          price_lucoin: Math.round(basePrice * 5),
          features: ["Top search results", "Highlighted profile", "Featured section placement", "Recommended creator status"],
          description: "7-day premium visibility boost"
        }
      ];
      
      setAvailablePackages(packages);
    };
    
    fetchAvailablePackages();
  }, [country, profileCompleteness, rating, role]);
  
  const handleOpenBoostDialog = () => {
    setDialogOpen(true);
    setSelectedPackage(null);
  };
  
  const handleSelectPackage = (pkg: BoostPackage) => {
    setSelectedPackage(pkg);
  };
  
  const handlePurchaseBoost = async () => {
    if (!selectedPackage) return;
    
    setIsSubmitting(true);
    
    try {
      // Check if user has enough lucoins
      if (lucoinBalance < selectedPackage.price_lucoin) {
        toast({
          title: "Insufficient Lucoins",
          description: `You need ${selectedPackage.price_lucoin} Lucoins to purchase this boost package. Please add more Lucoins to your account.`,
          variant: "destructive",
        });
        return;
      }
      
      // In a real app, this would make an API call to purchase the boost
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Boost Activated",
        description: `Your ${selectedPackage.name} has been activated successfully!`,
      });
      
      setDialogOpen(false);
      
      // Refresh status - in a real app, this would trigger a re-fetch
      window.location.reload();
    } catch (error) {
      console.error("Error purchasing boost:", error);
      toast({
        title: "Failed to Purchase Boost",
        description: "An error occurred while trying to purchase this boost. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Render boost manager
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Profile Boost</h2>
        <Button variant="outline" onClick={handleOpenBoostDialog}>
          <Zap className="h-4 w-4 mr-2" />
          Manage Boost
        </Button>
      </div>
      
      {!eligibility.eligible && (
        <Alert variant="warning">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Boost Unavailable</AlertTitle>
          <AlertDescription>
            {eligibility.reason}
          </AlertDescription>
        </Alert>
      )}
      
      <BoostStatusCard 
        boostStatus={boostStatus} 
        onBoostProfile={handleOpenBoostDialog}
        isLoading={loadingStatus}
      />
      
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Boost Your Profile</DialogTitle>
            <DialogDescription>
              Select a boost package to increase your visibility and engagement.
            </DialogDescription>
          </DialogHeader>
          
          {!eligibility.eligible ? (
            <Alert variant="warning">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Boost Unavailable</AlertTitle>
              <AlertDescription>
                {eligibility.reason}
              </AlertDescription>
            </Alert>
          ) : (
            <>
              <div className="py-2">
                <p className="text-sm mb-4">Available Lucoin Balance: <span className="font-bold">{lucoinBalance} LC</span></p>
                <BoostPackageGrid 
                  packages={availablePackages}
                  onSelectPackage={handleSelectPackage}
                  selectedPackageId={selectedPackage?.id}
                />
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handlePurchaseBoost} 
                  disabled={!selectedPackage || isSubmitting || !eligibility.eligible}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Zap className="mr-2 h-4 w-4" />
                      Purchase Boost
                    </>
                  )}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BoostManager;
