
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BoostPackage, BoostStatus } from "@/types/pulse-boost";
import { pulseBoostService } from "@/services/pulseBoostService";
import BoostDialog from './dialog/BoostDialog';
import BoostStatusDisplay from './BoostStatusDisplay';

interface PulseBoostManagerProps {
  profileId: string;
  ubxBalance?: number;
  isEligible?: boolean;
}

const PulseBoostManager: React.FC<PulseBoostManagerProps> = ({
  profileId,
  ubxBalance = 0,
  isEligible = true
}) => {
  const [boostStatus, setBoostStatus] = useState<BoostStatus>({
    isActive: false,
    remainingTime: '',
    level: 0,
    packageName: '',
    boostLevel: 0,
    isExpiring: false
  });
  
  const [boostPackages, setBoostPackages] = useState<BoostPackage[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('status');
  
  // Load boost packages on component mount
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const packages = await pulseBoostService.getBoostPackages();
        setBoostPackages(packages);
        
        if (packages.length > 0) {
          setSelectedPackage(packages[0].id);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching boost packages:', error);
        setLoading(false);
      }
    };
    
    fetchPackages();
  }, []);
  
  // Simulated fetch of boost status
  useEffect(() => {
    const fetchBoostStatus = async () => {
      try {
        setLoading(true);
        
        // For demo purposes, randomly determine if there's an active boost
        const isActive = Math.random() > 0.7;
        
        if (isActive) {
          setBoostStatus({
            isActive: true,
            packageName: 'Premium Boost',
            remainingTime: '12:45:30',
            progress: 67,
            level: 2,
            boostLevel: 2,
            isExpiring: Math.random() > 0.5
          });
        } else {
          setBoostStatus({
            isActive: false,
            remainingTime: '',
            level: 0,
            boostLevel: 0,
            isExpiring: false
          });
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching boost status:', error);
        setLoading(false);
      }
    };
    
    fetchBoostStatus();
    
    // Simulate refreshing status every 60 seconds
    const interval = setInterval(fetchBoostStatus, 60000);
    return () => clearInterval(interval);
  }, [profileId]);
  
  const handleApplyBoost = async (packageId: string) => {
    try {
      setLoading(true);
      const result = await pulseBoostService.purchaseBoost(profileId, packageId);
      
      if (result.success) {
        setBoostStatus({
          isActive: true,
          packageId: packageId,
          packageName: boostPackages.find(p => p.id === packageId)?.name || 'Boost',
          remainingTime: '24:00:00',
          progress: 0,
          level: 1,
          boostLevel: 1,
          isExpiring: false
        });
      }
      
      return result.success;
    } catch (error) {
      console.error('Error applying boost:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  const handleCancelBoost = async () => {
    try {
      setLoading(true);
      const result = await pulseBoostService.cancelBoost(profileId);
      
      if (result.success) {
        setBoostStatus({
          isActive: false,
          remainingTime: '',
          level: 0,
          boostLevel: 0,
          isExpiring: false
        });
      }
      
      return result.success;
    } catch (error) {
      console.error('Error canceling boost:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  const getRecommendedPackage = () => {
    return boostPackages.find(p => p.isMostPopular) || boostPackages[0];
  };
  
  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="status">Current Status</TabsTrigger>
          <TabsTrigger value="packages">Available Packages</TabsTrigger>
        </TabsList>
        
        <TabsContent value="status" className="space-y-4">
          <BoostStatusDisplay 
            boostStatus={boostStatus}
            loading={loading}
            onCancel={handleCancelBoost}
            onApply={() => setIsDialogOpen(true)}
          />
          
          {!boostStatus.isActive && (
            <Card>
              <CardHeader>
                <CardTitle>Recommended Package</CardTitle>
                <CardDescription>Our best value boost package for maximum visibility</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div>Loading recommended package...</div>
                ) : (
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{getRecommendedPackage()?.name}</p>
                      <p className="text-sm text-muted-foreground">{getRecommendedPackage()?.price_ubx} UBX</p>
                    </div>
                    <Button onClick={() => setIsDialogOpen(true)}>
                      Boost Now
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="packages" className="space-y-4">
          <Button 
            className="w-full" 
            onClick={() => setIsDialogOpen(true)}
            disabled={boostStatus.isExpiring}
          >
            Apply New Boost
          </Button>
        </TabsContent>
      </Tabs>
      
      <BoostDialog
        profileId={profileId}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        boostStatus={boostStatus}
        eligibility={{ eligible: isEligible, reasons: [] }}
        packages={boostPackages}
        onBoost={handleApplyBoost}
        onCancel={handleCancelBoost}
        selectedPackage={selectedPackage}
        setSelectedPackage={setSelectedPackage}
      />
    </div>
  );
};

export default PulseBoostManager;
