
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Zap } from 'lucide-react';
import { BoostStatus, BoostPackage } from '@/types/boost';
import BoostStatusCard from './boost/BoostStatusCard';
import BoostEligibilityAlert from './boost/BoostEligibilityAlert';
import BoostPackageSelection from './boost/BoostPackageSelection';
import BoostPurchaseConfirmation from './boost/BoostPurchaseConfirmation';
import HermesOxumQueueVisualization from './boost/HermesOxumQueueVisualization';
import BoostAnalytics from './boost/BoostAnalytics';
import { useBoostOperations } from '@/hooks/boost/useBoostOperations';

interface CreatorBoostTabProps {
  creatorId?: string;
  profileId?: string;
  ubxBalance: number;
}

const CreatorBoostTab = ({ 
  creatorId, 
  profileId, 
  ubxBalance = 0 
}: CreatorBoostTabProps) => {
  const [activeTab, setActiveTab] = useState('boost');
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [purchaseStep, setPurchaseStep] = useState<'select' | 'confirm'>('select');
  
  const { toast } = useToast();
  
  const {
    boostStatus,
    boostEligibility,
    boostPackages,
    boostProfile,
    cancelBoost,
    getBoostPrice,
    hermesMetrics,
    loading
  } = useBoostOperations(creatorId || profileId);

  // Update selected package when boost packages load
  useEffect(() => {
    if (boostPackages.length > 0 && !selectedPackage) {
      setSelectedPackage(boostPackages[0].id);
    }
  }, [boostPackages, selectedPackage]);

  const handleContinueToPayment = () => {
    if (!selectedPackage) {
      toast({
        title: "Please select a boost package",
        variant: "destructive",
      });
      return;
    }
    setPurchaseStep('confirm');
  };

  const handleBackToSelection = () => {
    setPurchaseStep('select');
  };

  const handlePurchaseBoost = async () => {
    if (!selectedPackage || !profileId) {
      toast({
        title: "Unable to process",
        description: "Missing required information",
        variant: "destructive",
      });
      return;
    }

    try {
      const success = await boostProfile(profileId, selectedPackage);
      
      if (success) {
        toast({
          title: "Boost activated!",
          description: "Your profile boost has been activated successfully.",
        });
        setPurchaseStep('select');
      } else {
        toast({
          title: "Boost failed",
          description: "Unable to activate profile boost.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while processing your request.",
        variant: "destructive",
      });
    }
  };

  const handleCancelBoost = async () => {
    try {
      const success = await cancelBoost();
      
      if (success) {
        toast({
          title: "Boost cancelled",
          description: "Your profile boost has been cancelled.",
        });
      } else {
        toast({
          title: "Cancellation failed",
          description: "Unable to cancel your profile boost.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while processing your request.",
        variant: "destructive",
      });
    }
  };

  return (
    <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="boost">Boost Management</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
      </TabsList>
      
      <TabsContent value="boost" className="space-y-4 mt-4">
        <BoostStatusCard 
          boostStatus={boostStatus}
          onCancel={handleCancelBoost}
          loading={loading}
          dailyBoostUsage={0}
          dailyBoostLimit={5}
        />
        
        <div className="grid md:grid-cols-2 gap-4">
          <HermesOxumQueueVisualization 
            profileId={profileId}
            userId={creatorId}
            activeBoosts={boostStatus.isActive ? 1 : 0}
            activeUsers={hermesMetrics.activeUsers}
            visibilityScore={hermesMetrics.visibilityScore}
            impressions={hermesMetrics.impressions}
            engagement={hermesMetrics.engagement}
          />
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Boost Overview</CardTitle>
              <CardDescription>Enhance your visibility and engagement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2 text-center mb-4">
                <div className="bg-muted p-2 rounded-md">
                  <p className="text-xl font-semibold">{hermesMetrics.visibilityScore}%</p>
                  <p className="text-xs text-muted-foreground">Visibility</p>
                </div>
                <div className="bg-muted p-2 rounded-md">
                  <p className="text-xl font-semibold">{hermesMetrics.impressions}</p>
                  <p className="text-xs text-muted-foreground">Daily Impressions</p>
                </div>
              </div>
              
              {!boostStatus.isActive && (
                <Button 
                  className="w-full" 
                  onClick={() => setActiveTab('boost')}
                  disabled={loading}
                >
                  <Zap className="mr-2 h-4 w-4" />
                  Get a Boost
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
        
        {!boostStatus.isActive && (
          <Card>
            <CardHeader>
              <CardTitle>Purchase a Boost</CardTitle>
              <CardDescription>
                Increase your profile's visibility to potential clients
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BoostEligibilityAlert 
                eligible={boostEligibility.isEligible} 
                reason={boostEligibility.reason || ''} 
              />
              
              {boostEligibility.isEligible && (
                purchaseStep === 'select' ? (
                  <BoostPackageSelection
                    profileCompleteness={85}
                    rating={4.5}
                    country="United States"
                    role="verified"
                    getBoostPrice={getBoostPrice}
                    packages={boostPackages}
                    selectedPackage={selectedPackage}
                    onSelectPackage={setSelectedPackage}
                    onContinue={handleContinueToPayment}
                    loading={loading}
                  />
                ) : (
                  <BoostPurchaseConfirmation
                    selectedPackage={boostPackages.find(p => p.id === selectedPackage) || null}
                    ubxBalance={ubxBalance}
                    onBack={handleBackToSelection}
                    onPurchase={handlePurchaseBoost}
                    onCancel={handleBackToSelection}
                    loading={loading}
                  />
                )
              )}
            </CardContent>
          </Card>
        )}
      </TabsContent>
      
      <TabsContent value="analytics" className="space-y-4 mt-4">
        <BoostAnalytics 
          isActive={boostStatus.isActive}
          creatorId={creatorId || profileId || ''}
        />
      </TabsContent>
    </Tabs>
  );
};

export default CreatorBoostTab;
