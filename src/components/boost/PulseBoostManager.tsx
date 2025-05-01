
import React, { useState, useEffect } from 'react';
import usePulseBoost from '@/hooks/boost/usePulseBoost';
import PulseBoostCard from '@/components/boost/PulseBoostCard';
import usePulseBoostAdapter from '@/hooks/boost/usePulseBoostAdapter';
import { useBoostStatus } from '@/hooks/boost/useBoostStatus';
import LoadingOverlay from '@/components/common/LoadingOverlay';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { BoostPackage } from '@/types/pulse-boost';
import { PulseBoost } from '@/types/pulse-boost';
import { toast } from '@/hooks/use-toast';

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

  // Modified to adapt PulseBoost to BoostPackage that purchaseBoost expects
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
        boostMultiplier: packageToUse.boostMultiplier || 1.5,  // Default to 1.5 if not specified
        features: Array.isArray(packageToUse.features) ? packageToUse.features : [],
        price_ubx: packageToUse.price_ubx,
        durationMinutes: packageToUse.durationMinutes,
        visibility: packageToUse.visibility,
        visibility_increase: packageToUse.visibility_increase,
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
            boost={{
              id: pkg.id,
              name: pkg.name || 'Unnamed Boost',
              description: pkg.description || '',
              durationMinutes: pkg.durationMinutes || (pkg.duration ? parseInt(String(pkg.duration).split(':')[0]) * 60 : 0),
              duration: String(pkg.duration || '00:00:00'),
              visibility: pkg.visibility_increase ? 'homepage' : 'search',
              price_ubx: pkg.price_ubx || 0,
              color: pkg.color || '#3b82f6',
              badgeColor: pkg.color || '#3b82f6',
              features: Array.isArray(pkg.features) ? pkg.features : [],
              visibility_increase: pkg.visibility_increase || 0,
              price: pkg.price || 0 // Ensure price is never undefined
            }}
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
