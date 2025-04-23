
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

// Helper to convert "HH:mm:ss" string duration to minutes number
const parseDurationToMinutes = (duration?: string): number => {
  if (!duration) return 0;
  const parts = duration.split(':');
  if (parts.length !== 3) return 0;
  const [hoursStr, minutesStr, secondsStr] = parts;
  const hours = Number(hoursStr);
  const minutes = Number(minutesStr);
  // return total minutes rounded
  return Math.max(0, (hours * 60) + minutes);
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

  // Debug log for packages
  // console.debug("PulseBoostManager packages:", pulseBoostPackages);

  // Handle loading state first
  if (isLoading) {
    return <div className="text-center py-4">Loading Pulse Boosts...</div>;
  }

  // Handle error state next
  if (error) {
    return <div className="text-center py-4 text-red-500">Error: {error}</div>;
  }

  // Defensive: If pulseBoostPackages is empty or undefined, render message
  if (!pulseBoostPackages || pulseBoostPackages.length === 0) {
    return <div className="text-center text-muted-foreground">No pulse boosts available.</div>;
  }

  // Helper to check active boost for a package
  const isActive = (boostId: string) => {
    if (!activeBoosts || activeBoosts.length === 0) return false;
    return activeBoosts.some((boost) => boost.boostId === boostId);
  };

  // Wrap handlers to match expected signatures passing boostId param
  const handleActivate = async (boostId: string): Promise<boolean> => {
    const pkg = pulseBoostPackages.find(p => p.id === boostId);
    if (!pkg) {
      console.error('PulseBoostManager: Boost package not found for id', boostId);
      return false;
    }
    
    try {
      const success = await purchaseBoost(pkg);
      if (!success) {
        console.error('Failed to activate boost:', pkg.name);
      }
      return success;
    } catch (err) {
      console.error('Error activating boost:', err);
      return false;
    }
  };

  // Accept boostId param to match signature but ignore it internally
  const handleCancel = async (_boostId: string): Promise<boolean> => {
    try {
      const success = await cancelBoost();
      if (!success) {
        console.error('Failed to cancel boost');
      }
      return success;
    } catch (err) {
      console.error('Error cancelling boost:', err);
      return false;
    }
  };

  return (
    <div className="space-y-4">
      {Array.isArray(pulseBoostPackages) && pulseBoostPackages.map((pkg) => {
        if (!pkg || typeof pkg !== 'object') {
          console.error('PulseBoostManager: Encountered invalid package in pulseBoostPackages');
          return null;
        }

        const visibilityKey = mapVisibility(pkg.visibility_increase);
        const costUBX = typeof pkg.price_ubx === 'number' ? pkg.price_ubx : 0;
        
        // Find active boost for this package
        const activeBoost = Array.isArray(activeBoosts) ? 
          activeBoosts.find(b => b.boostId === pkg.id) : 
          undefined;
          
        const timeRemaining = activeBoost ? activeBoost.timeRemaining : undefined;
        const durationMinutes = parseDurationToMinutes(pkg.duration);

        return (
          <PulseBoostCard
            key={pkg.id}
            boost={{
              id: pkg.id,
              name: pkg.name || 'Unnamed Boost',
              description: pkg.description || '',
              durationMinutes: durationMinutes,
              duration: pkg.duration,
              visibility: visibilityKey,
              costUBX: costUBX,
              color: pkg.color || '#3b82f6',
              badgeColor: pkg.color || '#3b82f6',
              features: Array.isArray(pkg.features) ? pkg.features : []
            }}
            isActive={isActive(pkg.id)}
            timeRemaining={timeRemaining}
            onActivate={handleActivate}
            onCancel={handleCancel}
            userBalance={userEconomy?.ubxBalance || 0}
            disabled={false}
          />
        );
      })}
    </div>
  );
};

export default PulseBoostManager;
