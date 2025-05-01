
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Zap, Clock, TrendingUp, AlertTriangle } from 'lucide-react';
import { usePulseBoost } from '@/hooks/boost/usePulseBoost';
import { formatBoostDuration, calculateRemainingTime } from '@/utils/boostCalculator';
import { PulseBoost } from '@/types/pulse-boost';
import { useToast } from '@/hooks/use-toast';

interface PulseBoostManagerProps {
  profileId?: string;
}

const PulseBoostManager: React.FC<PulseBoostManagerProps> = ({ profileId }) => {
  const { 
    pulseBoostPackages, 
    activeBoosts, 
    isLoading, 
    error, 
    userEconomy,
    purchaseBoost,
    cancelBoost
  } = usePulseBoost(profileId);
  
  const { toast } = useToast();
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [activePackage, setActivePackage] = useState<PulseBoost | null>(null);
  const [activeBoostStatus, setActiveBoostStatus] = useState<{
    isActive: boolean;
    packageId?: string;
    expiresAt?: Date;
    timeRemaining?: string;
    startedAt?: Date;
    packageName?: string;
    progress?: number;
  }>({
    isActive: false
  });

  // Effect to determine if there's an active boost
  useEffect(() => {
    if (activeBoosts && activeBoosts.length > 0) {
      const boost = activeBoosts[0];
      const matchingPackage = pulseBoostPackages.find(pkg => pkg.id === boost.id);
      
      if (matchingPackage) {
        setActivePackage(matchingPackage);
        
        // Calculate time remaining and progress
        const now = new Date();
        const expiryDate = new Date(now.getTime() + 24 * 60 * 60 * 1000); // Simulated expiry date
        const startDate = new Date(now.getTime() - 8 * 60 * 60 * 1000); // Simulated start time (8 hours ago)
        const totalDuration = expiryDate.getTime() - startDate.getTime();
        const elapsed = now.getTime() - startDate.getTime();
        const progress = Math.round((elapsed / totalDuration) * 100);
        
        setActiveBoostStatus({
          isActive: true,
          packageId: matchingPackage.id,
          startedAt: startDate,
          expiresAt: expiryDate,
          packageName: matchingPackage.name,
          timeRemaining: calculateRemainingTime(expiryDate),
          progress: progress
        });
      }
    } else {
      setActiveBoostStatus({
        isActive: false
      });
      setActivePackage(null);
    }
  }, [activeBoosts, pulseBoostPackages]);

  const handlePackageSelect = (id: string) => {
    setSelectedPackage(id);
  };

  const handlePurchaseBoost = async () => {
    if (!selectedPackage) {
      toast({
        title: "No package selected",
        description: "Please select a package to continue",
        variant: "destructive"
      });
      return;
    }

    const selectedPkg = pulseBoostPackages.find(pkg => pkg.id === selectedPackage);
    if (!selectedPkg) return;

    setIsPurchasing(true);
    try {
      const result = await purchaseBoost(selectedPkg);
      if (result) {
        toast({
          title: "Boost Activated",
          description: `Your ${selectedPkg.name} has been successfully applied!`,
        });
        
        // Update the active boost status immediately for better UX
        const now = new Date();
        const expiryDate = new Date(now.getTime() + 
          (selectedPkg.durationMinutes || 1440) * 60 * 1000);
        
        setActivePackage(selectedPkg);
        setActiveBoostStatus({
          isActive: true,
          packageId: selectedPkg.id,
          packageName: selectedPkg.name,
          expiresAt: expiryDate,
          startedAt: now,
          timeRemaining: calculateRemainingTime(expiryDate),
          progress: 0
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to activate boost. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsPurchasing(false);
    }
  };

  const handleCancelBoost = async () => {
    setIsCancelling(true);
    try {
      const result = await cancelBoost();
      if (result) {
        toast({
          title: "Boost Cancelled",
          description: "Your boost has been cancelled successfully",
        });
        setActiveBoostStatus({ isActive: false });
        setActivePackage(null);
      } else {
        toast({
          title: "Error",
          description: "Failed to cancel boost. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsCancelling(false);
    }
  };

  const { isActive, packageName, timeRemaining, progress } = activeBoostStatus;

  // Render active boost card if there's an active boost
  if (isActive && activePackage) {
    return (
      <Card className="border-primary/20 overflow-hidden">
        <div className="bg-primary/5 px-6 py-4 border-b border-primary/10">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl flex items-center">
              <Zap className="text-primary mr-2" /> Active Boost
            </CardTitle>
            <Badge className="text-xs py-1" variant="secondary">
              {packageName}
            </Badge>
          </div>
        </div>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-1" />
                <span>{timeRemaining}</span>
              </div>
              <div>
                <span className="text-sm text-primary mr-2">+{activePackage.visibility_increase}% visibility</span>
              </div>
            </div>
            
            <div className="bg-muted/50 p-3 rounded-md text-sm">
              <h4 className="font-medium mb-1">Boost Benefits:</h4>
              <ul className="list-disc ml-5 text-muted-foreground space-y-1">
                {activePackage.features?.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>
            
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={handleCancelBoost}
              disabled={isCancelling}
            >
              {isCancelling ? "Cancelling..." : "Cancel Boost"}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  // Loading state
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>PULSE Boost Packages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-40 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  // Error state
  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-destructive">
            <AlertTriangle className="mr-2 h-5 w-5" /> Error Loading Boost Packages
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Failed to load boost packages. Please try again later.</p>
        </CardContent>
      </Card>
    );
  }
  
  // Render package selection
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <TrendingUp className="mr-2 h-5 w-5 text-primary" />
          PULSE Boost Packages
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 pb-4 border-b">
          <div className="text-sm text-muted-foreground mb-2">Available UBX</div>
          <div className="text-2xl font-bold">{userEconomy?.ubxBalance || 0} UBX</div>
        </div>
        
        <div className="space-y-4">
          {pulseBoostPackages.map((pkg) => (
            <div 
              key={pkg.id} 
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                selectedPackage === pkg.id 
                  ? "border-primary bg-primary/5" 
                  : "hover:border-primary/50"
              }`}
              onClick={() => handlePackageSelect(pkg.id)}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">{pkg.name}</h3>
                {pkg.isMostPopular && <Badge className="text-xs py-1" variant="secondary">Most Popular</Badge>}
              </div>
              
              <p className="text-sm text-muted-foreground mb-2">{pkg.description}</p>
              
              <div className="flex items-center justify-between text-sm">
                <span>{formatBoostDuration(pkg.duration)}</span>
                <span className="font-medium">{pkg.price_ubx} UBX</span>
              </div>
              
              <div className="mt-3 text-xs text-primary">
                Boost visibility by {pkg.visibility_increase}%
              </div>
            </div>
          ))}
        </div>
        
        <Button 
          className="w-full mt-6" 
          onClick={handlePurchaseBoost} 
          disabled={!selectedPackage || isPurchasing}
        >
          {isPurchasing ? "Activating..." : "Activate Boost"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default PulseBoostManager;
