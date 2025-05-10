
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, Zap, Timer } from 'lucide-react';
import { usePulseBoost } from '@/hooks/boost/usePulseBoost';
import { BoostStatus, BoostPackage } from '@/types/pulse-boost';
import BoostPackageCard from './BoostPackageCard';
import BoostProgress from './BoostProgress';
import { useToast } from '@/components/ui/use-toast';

interface PulseBoostManagerProps {
  profileId?: string;
}

const PulseBoostManager: React.FC<PulseBoostManagerProps> = ({ profileId }) => {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const { toast } = useToast();
  const {
    boostStatus,
    packages,
    loading,
    refreshStatus,
    purchaseBoost,
    getFormattedTimeRemaining,
  } = usePulseBoost(profileId);
  
  const [localStatus, setLocalStatus] = useState<BoostStatus>({
    isActive: false,
  });

  useEffect(() => {
    if (boostStatus) {
      setLocalStatus({
        ...boostStatus,
        remainingDays: calculateRemainingDays(boostStatus)
      });
    }
  }, [boostStatus]);

  // Calculate remaining days for display purposes
  const calculateRemainingDays = (status: BoostStatus): number => {
    if (!status.expiresAt) return 0;
    
    const expiry = status.expiresAt instanceof Date 
      ? status.expiresAt 
      : new Date(status.expiresAt);
    
    const now = new Date();
    const diff = expiry.getTime() - now.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  const handleSelectPackage = (packageId: string) => {
    setSelectedPackage(packageId);
  };

  const handleActivateBoost = async () => {
    if (!selectedPackage) {
      toast({
        title: "No package selected",
        description: "Please select a boost package first",
        variant: "destructive"
      });
      return;
    }

    const result = await purchaseBoost(selectedPackage);
    
    if (result.success) {
      toast({
        title: "Boost activated",
        description: "Your profile boost has been successfully activated"
      });
      
      // Update local status
      const selectedBoostPackage = packages.find(pkg => pkg.id === selectedPackage);
      if (selectedBoostPackage) {
        // Calculate expiry date
        const now = new Date();
        const expiryDate = new Date(now);
        expiryDate.setMinutes(expiryDate.getMinutes() + selectedBoostPackage.durationMinutes);
        
        setLocalStatus({
          isActive: true,
          packageName: selectedBoostPackage.name,
          packageId: selectedBoostPackage.id,
          startedAt: now,
          expiresAt: expiryDate,
          boostPackage: selectedBoostPackage,
          remainingDays: calculateRemainingDays({ isActive: true, expiresAt: expiryDate })
        });
      }
      
      // Reset selection
      setSelectedPackage(null);
    } else {
      toast({
        title: "Boost activation failed",
        description: result.message || "Failed to activate boost",
        variant: "destructive"
      });
    }
  };

  // Display active boost and boost packages
  return (
    <div className="space-y-6">
      {localStatus.isActive ? (
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Active Boost</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">{localStatus.packageName}</p>
                <p className="text-sm text-muted-foreground">
                  {getFormattedTimeRemaining()}
                </p>
              </div>
              <BoostProgress status={localStatus} />
            </div>
            
            <div className="bg-muted/50 p-4 rounded-md">
              <h4 className="text-sm font-medium mb-2">Benefits</h4>
              {localStatus.boostPackage && (
                <ul className="text-sm space-y-1">
                  {localStatus.boostPackage.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Zap className="h-3 w-3 text-amber-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </Card>
      ) : (
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Boost Your Profile</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Increase your visibility and appear higher in search results.
          </p>
          
          <Tabs defaultValue="packages" className="space-y-4">
            <TabsList>
              <TabsTrigger value="packages">Boost Packages</TabsTrigger>
              <TabsTrigger value="info">How It Works</TabsTrigger>
            </TabsList>
            
            <TabsContent value="packages">
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-64 bg-muted animate-pulse rounded-md"></div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {packages.map((pkg) => (
                      <BoostPackageCard
                        key={pkg.id}
                        pkg={pkg}
                        isSelected={selectedPackage === pkg.id}
                        onSelect={() => handleSelectPackage(pkg.id)}
                      />
                    ))}
                  </div>
                  
                  <Button 
                    onClick={handleActivateBoost} 
                    disabled={!selectedPackage || loading}
                    className="w-full"
                  >
                    <Zap className="mr-2 h-4 w-4" />
                    Activate Boost
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="info" className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-md">
                <h4 className="font-medium mb-2">How Boosting Works</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="bg-primary/20 p-2 rounded-full">
                      <Zap className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Increased Visibility</p>
                      <p className="text-sm text-muted-foreground">
                        Your profile appears higher in search results and recommendations.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-primary/20 p-2 rounded-full">
                      <Timer className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Limited Duration</p>
                      <p className="text-sm text-muted-foreground">
                        Boosts are active for their specified duration, starting immediately.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-primary/20 p-2 rounded-full">
                      <ArrowRight className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Real-time Results</p>
                      <p className="text-sm text-muted-foreground">
                        See the impact on your profile views and interactions instantly.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      )}
    </div>
  );
};

export default PulseBoostManager;
