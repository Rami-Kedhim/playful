
// NOTE: Fixed access to visibility property on BoostPackage by using optional chaining and default value

import React from 'react';
import usePulseBoost from '@/hooks/boost/usePulseBoost';
import PulseBoostCard from '@/components/boost/PulseBoostCard';
import usePulseBoostAdapter from '@/hooks/boost/usePulseBoostAdapter';

interface PulseBoostManagerProps {
  profileId?: string;
}

const PulseBoostManager: React.FC<PulseBoostManagerProps> = ({ profileId }) => {
  const {
    isLoading,
    error,
    userEconomy,
    purchaseBoost,
    cancelBoost,
    activeBoosts,
    enhancedBoostStatus,
    pulseBoostPackages,
  } = usePulseBoost(profileId || undefined);

  const { formatPulseDuration } = usePulseBoostAdapter(profileId || '');

  // Helper to check active boost for a package
  const isActive = (boostId: string) => activeBoosts.some((boost) => boost.boostId === boostId);

  if (isLoading) {
    return <div>Loading Pulse Boosts...</div>;
  }

  if (error) {
    return <div className="text-red-600">Error loading Pulse Boosts: {error}</div>;
  }

  return (
    <div className="space-y-4">
      {pulseBoostPackages.map((pkg) => {
        // Safely access visibility with fallback
        const visibility = pkg?.visibility_increase !== undefined
          ? `${pkg.visibility_increase}% increased visibility`
          : 'Standard visibility';

        return (
          <PulseBoostCard
            key={pkg.id}
            boost={{
              id: pkg.id,
              name: pkg.name,
              description: pkg.description,
              durationMinutes: 0, // Could parse duration if needed
              visibility: 'homepage', // default or map from package
              costUBX: pkg.price_ubx || 0,
              color: pkg.color || '#3b82f6',
              badgeColor: pkg.color || '#3b82f6',
              features: pkg.features || []
            }}
            isActive={isActive(pkg.id)}
            timeRemaining={activeBoosts.find(b => b.boostId === pkg.id)?.timeRemaining}
            onActivate={purchaseBoost}
            onCancel={cancelBoost}
            userBalance={userEconomy.ubxBalance}
            disabled={false}
          />
        );
      })}
    </div>
  );
};

export default PulseBoostManager;

