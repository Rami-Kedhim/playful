
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/auth';
import { useWallet } from '@/hooks/useWallet';
import { BoostPackage, BoostStatus, BoostEligibility } from '@/types/pulse-boost';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { 
  convertBoostStatus, 
  convertBoostEligibility, 
  convertBoostPackages
} from '@/utils/typeConverters';

interface PulseBoostManagerProps {
  profileId?: string;
  onPurchaseComplete?: () => void;
}

const PulseBoostManager: React.FC<PulseBoostManagerProps> = ({ 
  profileId,
  onPurchaseComplete
}) => {
  const { user } = useAuth();
  const { balance } = useWallet();
  
  const [boostStatus, setBoostStatus] = useState<BoostStatus>({
    isActive: false,
    packageId: '',
    timeRemaining: '',
    progress: 0,
    packageName: '',
    isExpiring: false,
  });
  
  const [eligibility, setEligibility] = useState<BoostEligibility>({
    isEligible: false,
    eligible: false,
    reason: '',
  });
  
  const [packages, setPackages] = useState<BoostPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      if (!profileId && !user?.id) return;
      
      try {
        setLoading(true);
        
        // Mock data for demonstration
        const id = profileId || user?.id;
        
        // Simulating API responses
        const statusResponse = {
          isActive: false,
          packageId: '',
          expiresAt: null,
          timeRemaining: '0',
          progress: 0,
          packageName: '',
          isExpiring: false,
        };
        
        const eligibilityResponse = {
          isEligible: true,
          reason: '',
          remainingBoosts: 3,
          maxBoostsPerDay: 3,
        };
        
        const packagesResponse = [
          {
            id: 'basic',
            name: 'Basic Boost',
            description: 'Increase your visibility for 1 hour',
            price: 100,
            price_ubx: 100,
            duration: '1 hour',
            durationMinutes: 60,
            visibility: 'medium',
            visibility_increase: 50,
            boost_power: 1,
            color: 'blue',
          },
          {
            id: 'premium',
            name: 'Premium Boost',
            description: 'Increase your visibility for 4 hours',
            price: 300,
            price_ubx: 300,
            duration: '4 hours',
            durationMinutes: 240,
            visibility: 'high',
            visibility_increase: 150,
            boost_power: 3,
            color: 'purple',
            isMostPopular: true,
          },
        ];
        
        // Use converters to normalize data
        setBoostStatus(convertBoostStatus(statusResponse));
        setEligibility(convertBoostEligibility(eligibilityResponse));
        setPackages(convertBoostPackages(packagesResponse));
        
      } catch (error) {
        console.error('Error fetching boost data:', error);
        toast({
          title: 'Error',
          description: 'Failed to load boost information.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [profileId, user?.id]);
  
  const handlePurchase = async (pkg: BoostPackage) => {
    if (!profileId && !user?.id) return;
    
    try {
      setPurchasing(true);
      
      // Mock purchase logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulating successful purchase
      toast({
        title: 'Boost Activated',
        description: `Your ${pkg.name} has been activated.`,
      });
      
      // Update status after successful purchase
      setBoostStatus(convertBoostStatus({
        isActive: true,
        packageId: pkg.id,
        expiresAt: new Date(Date.now() + (pkg.durationMinutes || 60) * 60 * 1000),
        timeRemaining: pkg.duration || '1 hour',
        progress: 0,
        packageName: pkg.name,
        startedAt: new Date(),
        isExpiring: false,
      }));
      
      if (onPurchaseComplete) {
        onPurchaseComplete();
      }
      
    } catch (error) {
      console.error('Error purchasing boost:', error);
      toast({
        title: 'Purchase Failed',
        description: 'Failed to purchase boost. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setPurchasing(false);
    }
  };
  
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Pulse Boost</h2>
      
      {loading ? (
        <div className="animate-pulse">Loading boost options...</div>
      ) : boostStatus.isActive ? (
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <h3 className="font-medium">Active Boost: {boostStatus.packageName}</h3>
          <p>Time remaining: {boostStatus.timeRemaining}</p>
          {/* Additional boost active UI */}
        </div>
      ) : (
        <>
          <div>
            <h3 className="font-medium">Select a boost package:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              {packages.map((pkg) => (
                <div 
                  key={pkg.id} 
                  className={`p-4 rounded-lg border ${pkg.isMostPopular ? 'ring-2 ring-primary' : ''}`}
                >
                  <h4 className="font-bold">{pkg.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{pkg.description}</p>
                  <div className="mt-2">
                    <span className="font-bold">{pkg.price_ubx} UBX</span>
                    <span className="text-sm text-gray-500 ml-2">for {pkg.duration}</span>
                  </div>
                  <Button 
                    className="w-full mt-2" 
                    onClick={() => handlePurchase(pkg)}
                    disabled={purchasing || !eligibility.isEligible || pkg.price_ubx > (balance || 0)}
                  >
                    {purchasing ? 'Processing...' : 'Purchase'}
                  </Button>
                </div>
              ))}
            </div>
          </div>
          
          {!eligibility.isEligible && eligibility.reason && (
            <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
              <p className="text-amber-800 dark:text-amber-200">{eligibility.reason}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PulseBoostManager;
