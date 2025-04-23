
import React, { useState } from 'react';
import usePulseBoost from '@/hooks/boost/usePulseBoost';
import PulseBoostCard from '@/components/boost/PulseBoostCard';
import usePulseBoostAdapter from '@/hooks/boost/usePulseBoostAdapter';
import { BoostPackage } from '@/types/boost';
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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
  const [processingId, setProcessingId] = useState<string | null>(null);
  
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

  // Handle loading state first
  if (isLoading) {
    return (
      <div className="py-8 flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin mb-4" />
        <div className="text-center">
          <h3 className="text-lg font-medium">Loading Boost Packages</h3>
          <p className="text-muted-foreground">Please wait while we load your boost options...</p>
        </div>
      </div>
    );
  }

  // Handle error state next
  if (error) {
    return (
      <Alert variant="destructive" className="my-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error Loading Boost Packages</AlertTitle>
        <AlertDescription>
          {error}
        </AlertDescription>
      </Alert>
    );
  }

  // Defensive: If pulseBoostPackages is empty or undefined, render message
  if (!pulseBoostPackages || !Array.isArray(pulseBoostPackages) || pulseBoostPackages.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <h3 className="text-lg font-medium mb-2">No Boost Packages Available</h3>
          <p className="text-muted-foreground">
            There are currently no boost packages available for your profile.
          </p>
        </CardContent>
      </Card>
    );
  }

  // Helper to check active boost for a package
  const isActive = (boostId: string) => {
    if (!activeBoosts || !Array.isArray(activeBoosts) || activeBoosts.length === 0) return false;
    return activeBoosts.some((boost) => boost.boostId === boostId);
  };

  // Wrap handlers to match expected signatures passing boostId param
  const handleActivate = async (boostId: string): Promise<boolean> => {
    setProcessingId(boostId);
    
    const pkg = pulseBoostPackages.find(p => p.id === boostId);
    if (!pkg) {
      console.error('PulseBoostManager: Boost package not found for id', boostId);
      setProcessingId(null);
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
    } finally {
      setProcessingId(null);
    }
  };

  // Accept boostId param to match signature but ignore it internally
  const handleCancel = async (_boostId: string): Promise<boolean> => {
    setProcessingId(_boostId);
    
    try {
      const success = await cancelBoost();
      if (!success) {
        console.error('Failed to cancel boost');
      }
      return success;
    } catch (err) {
      console.error('Error cancelling boost:', err);
      return false;
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {Array.isArray(pulseBoostPackages) && pulseBoostPackages.map((pkg) => {
        if (!pkg || typeof pkg !== 'object') {
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
        
        const boostActive = isActive(pkg.id);
        const isProcessing = processingId === pkg.id;

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
            isActive={boostActive}
            timeRemaining={timeRemaining}
            onActivate={handleActivate}
            onCancel={handleCancel}
            userBalance={userEconomy?.ubxBalance || 0}
            disabled={isProcessing || Boolean(processingId)}
          />
        );
      })}
    </div>
  );
};

export default PulseBoostManager;
