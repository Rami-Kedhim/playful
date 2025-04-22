
import React from 'react';
import usePulseBoost from '@/hooks/boost/usePulseBoost';
import PulseBoostCard from '@/components/boost/PulseBoostCard';
import usePulseBoostAdapter from '@/hooks/boost/usePulseBoostAdapter';
import { BoostPackage } from '@/types/boost';

interface PulseBoostManagerProps {
  profileId?: string;
}

// Helper to map numeric visibility_increase to allowed string literals
const mapVisibility = (visibilityIncrease?: number): "homepage" | "search" | "smart_match" | "global" => {
  if (visibilityIncrease === undefined) return 'homepage';
  if (visibilityIncrease >= 150) return 'global';
  if (visibilityIncrease >= 100) return 'search';
  if (visibilityIncrease >= 50) return 'smart_match';
  return 'homepage';
};

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

  // Wrap handlers to match expected signatures passing boostId param
  const handleActivate = async (boostId: string): Promise<boolean> => {
    const pkg = pulseBoostPackages.find(p => p.id === boostId);
    if (!pkg) {
      console.error('PulseBoostManager: Boost package not found for id', boostId);
      return false;
    }
    const success = await purchaseBoost(pkg);
    if (!success) {
      console.error('Failed to activate boost:', pkg.name);
    }
    return success;
  };

  // Accept boostId param to match signature but ignore it internally
  const handleCancel = async (_boostId: string): Promise<boolean> => {
    const success = await cancelBoost();
    if (!success) {
      console.error('Failed to cancel boost');
    }
    return success;
  };

  return (
    <div className="space-y-4">
      {pulseBoostPackages.length === 0 && (
        <div className="text-center text-muted-foreground">No pulse boosts available.</div>
      )}
      {pulseBoostPackages.map((pkg) => {
        const visibilityKey = mapVisibility(pkg.visibility_increase);

        const costUBX = pkg.price_ubx ?? 0;

        // timeRemaining is a string or undefined, ensure it matches expected string | undefined
        const activeBoost = activeBoosts.find(b => b.boostId === pkg.id);
        const timeRemaining = activeBoost ? activeBoost.timeRemaining : undefined;

        return (
          <PulseBoostCard
            key={pkg.id}
            boost={{
              id: pkg.id,
              name: pkg.name,
              description: pkg.description,
              durationMinutes: 0, // Could parse duration if needed
              visibility: visibilityKey,
              costUBX: costUBX,
              color: pkg.color || '#3b82f6',
              badgeColor: pkg.color || '#3b82f6',
              features: pkg.features || []
            }}
            isActive={isActive(pkg.id)}
            timeRemaining={timeRemaining}
            onActivate={handleActivate}
            onCancel={handleCancel}
            userBalance={userEconomy.ubxBalance}
            disabled={false}
          />
        );
      })}
    </div>
  );
};

export default PulseBoostManager;

