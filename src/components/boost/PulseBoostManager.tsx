
import React, { useState } from 'react';
import usePulseBoost from '@/hooks/boost/usePulseBoost';
import PulseBoostCard from '@/components/boost/PulseBoostCard';
import usePulseBoostAdapter from '@/hooks/boost/usePulseBoostAdapter';
import { useBoostStatus } from '@/hooks/boost/useBoostStatus';
import LoadingOverlay from '@/components/common/LoadingOverlay';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

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
  const { formatPulseDuration } = usePulseBoostAdapter(profileId || '');

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
            visibility: pkg.visibility || 'homepage',
            costUBX: pkg.price_ubx || 0,
            color: pkg.color || '#3b82f6',
            badgeColor: pkg.color || '#3b82f6',
            features: Array.isArray(pkg.features) ? pkg.features : []
          }}
          isActive={boostStatus?.isActive && boostStatus?.packageId === pkg.id}
          timeRemaining={boostStatus?.remainingTime}
          onActivate={purchaseBoost}
          onCancel={cancelBoost}
          userBalance={userEconomy?.ubxBalance || 0}
          disabled={Boolean(processingId)}
        />
      ))}
    </div>
  );
};

export default PulseBoostManager;
