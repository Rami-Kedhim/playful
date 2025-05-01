
import React, { useState, useEffect } from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import LoadingOverlay from '@/components/common/LoadingOverlay';
import { toast } from '@/hooks/use-toast';
import { BoostPackage } from '@/types/pulse-boost';
import { PulseBoost } from '@/types/pulse-boost';

// Mock hooks
const usePulseBoost = (profileId?: string) => {
  const [pulseBoostPackages] = useState<PulseBoost[]>([
    {
      id: 'basic',
      name: 'Basic Boost',
      description: 'Enhance visibility for 24 hours',
      duration: '24:00:00',
      durationMinutes: 1440,
      price: 29.99,
      price_ubx: 300,
      visibility: 'homepage',
      visibility_increase: 50,
      features: ['Top search results', 'Featured section'],
      color: '#4CAF50',
      badgeColor: '#4CAF50'
    },
    {
      id: 'premium',
      name: 'Premium Boost',
      description: 'Maximum visibility for 3 days',
      duration: '72:00:00',
      durationMinutes: 4320,
      price: 69.99,
      price_ubx: 700,
      visibility: 'homepage',
      visibility_increase: 100,
      features: ['Top search results', 'Featured section', 'Premium badge'],
      color: '#2196F3',
      badgeColor: '#2196F3'
    }
  ]);
  
  return {
    isLoading: false,
    error: null,
    userEconomy: { ubxBalance: 1000 },
    purchaseBoost: async () => true,
    cancelBoost: async () => true,
    activeBoosts: [],
    pulseBoostPackages
  };
};

const useBoostStatus = (profileId?: string) => {
  return {
    status: { isActive: false },
    loading: false
  };
};

const usePulseBoostAdapter = (profileId: string) => {
  return {
    formatPulseDuration: (duration: string) => `${duration} hours`,
    realtimeStatus: null
  };
};

const PulseBoostCard = ({ 
  boost, 
  isActive, 
  timeRemaining = '', 
  onActivate,
  onCancel,
  userBalance = 0,
  disabled = false 
}: { 
  boost: PulseBoost,
  isActive: boolean,
  timeRemaining?: string,
  onActivate: (boost: PulseBoost) => Promise<boolean>,
  onCancel: (boostId: string) => Promise<boolean>,
  userBalance: number,
  disabled?: boolean
}) => {
  return (
    <div className="border p-4 rounded-md">
      <h3 className="font-medium">{boost.name}</h3>
      <p className="text-muted-foreground text-sm">{boost.description}</p>
      <div className="mt-4">
        <button 
          className={`px-4 py-2 rounded-md ${isActive ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}`}
          onClick={() => isActive ? onCancel(boost.id) : onActivate(boost)}
          disabled={disabled}
        >
          {isActive ? 'Cancel Boost' : 'Activate'}
        </button>
      </div>
    </div>
  );
};

interface PulseBoostManagerProps {
  profileId?: string;
}

const PulseBoostManager: React.FC<PulseBoostManagerProps> = ({ profileId }) => {
  const [processingId, setProcessingId] = useState<string | null>(null);
  
  const {
    isLoading,
    error,
    userEconomy,
    purchaseBoost,
    cancelBoost,
    activeBoosts,
    pulseBoostPackages,
  } = usePulseBoost(profileId || undefined);

  const { status: boostStatus, loading: statusLoading } = useBoostStatus(profileId);
  const { formatPulseDuration, realtimeStatus } = usePulseBoostAdapter(profileId || '');
  
  // Combine realtime status with our regular status if available
  const currentStatus = realtimeStatus || boostStatus;

  // Handle loading state
  if (isLoading || statusLoading) {
    return <LoadingOverlay message="Loading boost packages..." />;
  }

  // Handle error state
  if (error) {
    return (
      <Alert variant="destructive" className="my-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error Loading Boost Packages</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  // Handle empty packages state
  if (!pulseBoostPackages || pulseBoostPackages.length === 0) {
    return (
      <Alert className="my-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>No Boost Packages Available</AlertTitle>
        <AlertDescription>
          There are currently no boost packages available. Please check back later.
        </AlertDescription>
      </Alert>
    );
  }

  const handlePurchaseBoost = async (boost: PulseBoost): Promise<boolean> => {
    if (!purchaseBoost || processingId) return false;
    if (!boost || !boost.id) {
      console.error('Invalid boost object provided');
      return false;
    }
    
    setProcessingId(boost.id);
    
    try {
      // Find the corresponding package from pulseBoostPackages
      const packageToUse = pulseBoostPackages.find(pkg => pkg.id === boost.id);
      
      if (!packageToUse) {
        console.error('Could not find corresponding boost package for ID:', boost.id);
        toast({
          title: "Activation Failed",
          description: "Could not find the selected boost package. Please try again.",
          variant: "destructive"
        });
        return false;
      }
      
      // Convert PulseBoost to BoostPackage
      const boostPackage: BoostPackage = {
        id: packageToUse.id,
        name: packageToUse.name,
        description: packageToUse.description,
        duration: packageToUse.duration || '24:00:00',
        price: packageToUse.price || 0,
        price_ubx: packageToUse.price_ubx,
        durationMinutes: packageToUse.durationMinutes,
        visibility: packageToUse.visibility,
        visibility_increase: packageToUse.visibility_increase,
        features: Array.isArray(packageToUse.features) ? packageToUse.features : [],
        color: packageToUse.color,
        badgeColor: packageToUse.badgeColor
      };
      
      const result = await purchaseBoost(boostPackage);
      if (result) {
        toast({
          title: "Boost Activated",
          description: `Your ${boost.name} boost has been successfully activated.`,
        });
      }
      return result;
    } catch (error) {
      console.error('Error purchasing boost:', error);
      toast({
        title: "Activation Failed",
        description: "There was an error activating your boost. Please try again.",
        variant: "destructive"
      });
      return false;
    } finally {
      setProcessingId(null);
    }
  };

  const handleCancelBoost = async (boostId: string): Promise<boolean> => {
    if (processingId) return false;
    if (!boostId) {
      console.error('Invalid boost ID provided');
      return false;
    }
    
    setProcessingId(boostId);
    try {
      const result = await cancelBoost();
      if (result) {
        toast({
          title: "Boost Cancelled",
          description: "Your boost has been successfully cancelled.",
        });
      }
      return result;
    } catch (error) {
      console.error('Error cancelling boost:', error);
      toast({
        title: "Cancellation Failed",
        description: "There was an error cancelling your boost. Please try again.",
        variant: "destructive"
      });
      return false;
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {pulseBoostPackages.map((pkg) => {
        if (!pkg || !pkg.id) return null;
        
        const isActive = Boolean(
          currentStatus?.isActive && 
          (currentStatus?.packageId === pkg.id)
        );
        
        return (
          <PulseBoostCard
            key={pkg.id}
            boost={pkg}
            isActive={isActive}
            timeRemaining={currentStatus?.remainingTime || currentStatus?.timeRemaining || ''}
            onActivate={handlePurchaseBoost}
            onCancel={handleCancelBoost}
            userBalance={userEconomy?.ubxBalance || 0}
            disabled={Boolean(processingId)}
          />
        );
      })}
    </div>
  );
};

export default PulseBoostManager;
