
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import BoostPackageCard from './BoostPackageCard';
import { pulseBoostService } from '@/services/boost/pulseBoostService';
import { BoostStatus, BoostPackage } from '@/types/boost';
import { Zap, Clock } from 'lucide-react';
import BoostDialog from './BoostDialog';

interface PulseBoostManagerProps {
  profileId: string;
}

const PulseBoostManager: React.FC<PulseBoostManagerProps> = ({ profileId }) => {
  const [boostStatus, setBoostStatus] = useState<BoostStatus>({
    isActive: false,
    packageName: undefined,
    isExpiring: false,
    boostLevel: 0,
    progress: 0
  });
  
  const [packages, setPackages] = useState<BoostPackage[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Fetch boost status and packages
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch boost packages (mocked)
        const boostPackages = await pulseBoostService.getBoostPackages();
        setPackages(boostPackages);
        
        // Set default selected package
        if (boostPackages.length > 0 && !selectedPackage) {
          setSelectedPackage(boostPackages[0].id);
        }
        
        // Fetch current boost status (mocked)
        if (profileId) {
          const status = await pulseBoostService.getBoostStatus(profileId);
          setBoostStatus({
            ...status,
            progress: calculateProgress(status),
            isExpiring: isBoostExpiring(status),
            boostLevel: determineBoostLevel(status)
          });
        }
      } catch (error) {
        console.error('Error fetching boost data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [profileId]);
  
  // Calculate progress percentage based on time remaining
  const calculateProgress = (status: BoostStatus): number => {
    if (!status.isActive) return 0;
    
    // For demo purposes, return a random progress value between 0-100
    return Math.floor(Math.random() * 100);
  };
  
  // Determine if the boost is about to expire (< 24 hours remaining)
  const isBoostExpiring = (status: BoostStatus): boolean => {
    if (!status.isActive || !status.expiresAt) return false;
    
    const now = new Date();
    const expiry = new Date(status.expiresAt);
    const hoursRemaining = (expiry.getTime() - now.getTime()) / (1000 * 60 * 60);
    
    return hoursRemaining < 24;
  };
  
  // Determine the boost level based on the package
  const determineBoostLevel = (status: BoostStatus): number => {
    if (!status.isActive) return 0;
    
    // For demo, return a value between 1-3
    return Math.floor(Math.random() * 3) + 1;
  };
  
  // Handle applying a boost
  const handleApplyBoost = async () => {
    if (!selectedPackage) return;
    
    setLoading(true);
    try {
      const packageId = selectedPackage;
      const result = await pulseBoostService.purchaseBoost(profileId, packageId);
      
      if (result.success) {
        const selectedPkg = packages.find(p => p.id === packageId);
        const now = new Date();
        const expiryDate = new Date();
        expiryDate.setMinutes(expiryDate.getMinutes() + (selectedPkg?.durationMinutes || 0));
        
        setBoostStatus({
          isActive: true,
          packageName: selectedPkg?.name,
          expiresAt: expiryDate,
          startedAt: now,
          progress: 0,
          packageId: packageId,
          isExpiring: false,
          boostLevel: 1
        });
        
        setIsDialogOpen(false);
      }
    } catch (error) {
      console.error('Error applying boost:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Handle canceling a boost
  const handleCancelBoost = async () => {
    if (!boostStatus.isActive) return false;
    
    setLoading(true);
    try {
      await pulseBoostService.cancelBoost(profileId);
      
      setBoostStatus({
        isActive: false,
        packageName: undefined,
        isExpiring: false,
        boostLevel: 0,
        progress: 0
      });
      
      return true;
    } catch (error) {
      console.error('Error canceling boost:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="space-y-6">
      {boostStatus.isActive ? (
        // Active boost display
        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold flex items-center">
                <Zap className="h-5 w-5 mr-2 text-primary" />
                Active Boost
              </h3>
              {boostStatus.isExpiring && (
                <div className="bg-yellow-500/20 text-yellow-600 text-xs px-2 py-1 rounded-full flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  Expiring Soon
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Package</p>
              <p className="font-medium">{boostStatus.packageName || 'Standard Boost'}</p>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Progress</span>
                <span>{boostStatus.progress}%</span>
              </div>
              <Progress value={boostStatus.progress} className="h-2" />
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={handleCancelBoost}
              disabled={loading}
            >
              Cancel Boost
            </Button>
          </CardFooter>
        </Card>
      ) : (
        // No active boost display
        <div className="grid gap-4">
          <Card>
            <CardHeader className="pb-3">
              <h3 className="text-lg font-semibold flex items-center">
                <Zap className="h-5 w-5 mr-2 text-primary" />
                Boost Your Profile
              </h3>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Increase your visibility and get more profile views with a boost.
              </p>
              
              <Button
                className="w-full"
                onClick={() => setIsDialogOpen(true)}
                disabled={loading}
              >
                <Zap className="h-4 w-4 mr-2" />
                Apply Boost
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <h4 className="text-md font-medium">Popular Boost Packages</h4>
            </CardHeader>
            <CardContent className="space-y-4">
              {packages.slice(0, 1).map((pkg) => (
                <BoostPackageCard 
                  key={pkg.id} 
                  pkg={pkg}
                  isSelected={selectedPackage === pkg.id}
                  onSelect={() => {
                    setSelectedPackage(pkg.id);
                    setIsDialogOpen(true);
                  }}
                />
              ))}
            </CardContent>
          </Card>
        </div>
      )}
      
      <BoostDialog 
        profileId={profileId}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </div>
  );
};

export default PulseBoostManager;
