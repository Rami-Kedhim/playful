import React, { useState, useEffect } from 'react';
import usePulseBoost from '@/hooks/boost/usePulseBoost';
import PulseBoostCard from '@/components/boost/PulseBoostCard';
import usePulseBoostAdapter from '@/hooks/boost/usePulseBoostAdapter';
import { useBoostStatus } from '@/hooks/boost/useBoostStatus';
import LoadingOverlay from '@/components/common/LoadingOverlay';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { BoostPackage } from '@/types/boost';
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
  if (!pulseBoostPackages?.length) {
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

  const handlePurchaseBoost = async (pkg: BoostPackage) => {
    if (!purchaseBoost || processingId) return false;
    setProcessingId(pkg.id);
    try {
      const result = await purchaseBoost(pkg);
      if (result) {
        toast({
          title: "Boost Activated",
          description: `Your ${pkg.name} boost has been successfully activated.`,
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

  const handleCancelBoost = async (boostId: string) => {
    if (processingId) return false;
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
      {pulseBoostPackages.map((pkg) => (
        <PulseBoostCard
          key={pkg.id}
          boost={{
            id: pkg.id,
            name: pkg.name || 'Unnamed Boost',
            description: pkg.description || '',
            durationMinutes: pkg.duration ? parseInt(pkg.duration.split(':')[0]) * 60 : 0,
            duration: pkg.duration || '00:00:00',
            visibility: pkg.visibility_increase ? 'homepage' : 'search',
            costUBX: pkg.price_ubx || 0,
            color: pkg.color || '#3b82f6',
            badgeColor: pkg.color || '#3b82f6',
            features: Array.isArray(pkg.features) ? pkg.features : [],
            visibility_increase: pkg.visibility_increase
          }}
          isActive={currentStatus?.isActive && (currentStatus?.activeBoostId === pkg.id || currentStatus?.packageId === pkg.id)}
          timeRemaining={currentStatus?.remainingTime}
          onActivate={handlePurchaseBoost}
          onCancel={handleCancelBoost}
          userBalance={userEconomy?.ubxBalance || 0}
          disabled={Boolean(processingId)}
        />
      ))}
    </div>
  );
};

export default PulseBoostManager;
