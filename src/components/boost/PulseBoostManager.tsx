
import React, { useState, useEffect } from 'react';
import { BoostStatus, BoostPackage } from '@/types/pulse-boost';
import { formatDistanceToNow } from 'date-fns';

// Fixed number conversion functions
const stringToNumber = (value: string | number): number => {
  if (typeof value === 'number') return value;
  const parsed = parseInt(value);
  return isNaN(parsed) ? 0 : parsed;
};

const formatNumberWithCommas = (x: number | string): string => {
  if (typeof x === 'string') {
    x = parseFloat(x);
    if (isNaN(x)) return '0';
  }
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

interface PulseBoostManagerProps {
  profileId: string;
  eligibilityCheck?: boolean;
}

const PulseBoostManager: React.FC<PulseBoostManagerProps> = ({ profileId, eligibilityCheck = true }) => {
  const [boostStatus, setBoostStatus] = useState<BoostStatus>({
    isActive: false,
    expiresAt: "",
    remainingDays: 0,
    boostLevel: 0,
    isExpiring: false,
    packageId: "",
    packageName: "",
    boostPackage: undefined
  });

  const [packages, setPackages] = useState<BoostPackage[]>([
    {
      id: 'basic',
      name: 'Basic Boost',
      description: 'Boost visibility for 24 hours',
      price: 9.99,
      duration: 24,
      boostLevel: 1,
      popularity: 'medium',
      features: ['50% visibility increase', 'Featured placement'],
      price_ubx: 100,
      durationMinutes: 1440,
      visibility: 50,
      visibility_increase: 50,
      isMostPopular: false
    },
    {
      id: 'premium',
      name: 'Premium Boost',
      description: 'Boost visibility for 72 hours',
      price: 24.99,
      duration: 72,
      boostLevel: 2,
      popularity: 'high',
      features: ['100% visibility increase', 'Featured placement', 'Priority ranking'],
      price_ubx: 250,
      durationMinutes: 4320,
      visibility: 100,
      visibility_increase: 100,
      isMostPopular: true
    }
  ]);

  useEffect(() => {
    // Simulate fetching boost status
    const timerID = setTimeout(() => {
      // Mocking an active boost
      setBoostStatus({
        isActive: true,
        packageId: 'premium',
        packageName: 'Premium Boost',
        expiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000).toString(),
        remainingDays: 2,
        boostLevel: 2,
        isExpiring: false,
        progress: 33,
        timeRemaining: '48:00:00',
        endTime: new Date(Date.now() + 48 * 60 * 60 * 1000),
        startTime: new Date(Date.now() - 24 * 60 * 60 * 1000)
      });
    }, 1000);

    return () => clearTimeout(timerID);
  }, [profileId]);

  const calculateRemainingTime = (): string => {
    if (!boostStatus.endTime) return '--:--:--';
    
    try {
      const endTime = new Date(boostStatus.endTime);
      if (isNaN(endTime.getTime())) return '--:--:--';
      
      return formatDistanceToNow(endTime, { addSuffix: true });
    } catch (error) {
      console.error('Error calculating remaining time:', error);
      return '--:--:--';
    }
  };

  const calculateProgress = (): number => {
    if (!boostStatus.startTime || !boostStatus.endTime) {
      return boostStatus.progress || 0;
    }

    try {
      const startTime = new Date(boostStatus.startTime).getTime();
      const endTime = new Date(boostStatus.endTime).getTime();
      const now = Date.now();
      
      if (isNaN(startTime) || isNaN(endTime)) {
        return boostStatus.progress || 0;
      }
      
      const totalDuration = endTime - startTime;
      const elapsed = now - startTime;
      
      const progress = Math.round((elapsed / totalDuration) * 100);
      return Math.min(Math.max(progress, 0), 100); // Clamp between 0-100
    } catch (error) {
      console.error('Error calculating progress:', error);
      return boostStatus.progress || 0;
    }
  };

  const renderPackages = () => {
    return packages.map(pkg => (
      <div 
        key={pkg.id}
        className="border rounded-md p-4 hover:border-primary cursor-pointer"
      >
        <h3 className="font-medium text-lg">{pkg.name}</h3>
        <p className="text-muted-foreground text-sm mb-2">{pkg.description}</p>
        
        <div className="flex justify-between items-center">
          <span className="font-bold">${pkg.price}</span>
          <span className="text-sm text-muted-foreground">
            {pkg.durationMinutes ? formatNumberWithCommas(Math.floor(pkg.durationMinutes / 60)) : 0} hours
          </span>
        </div>
        
        {pkg.isMostPopular && (
          <div className="mt-2">
            <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
              Most Popular
            </span>
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Profile Boost</h2>
      
      <div className="bg-muted/50 p-4 rounded-md">
        <div className="flex justify-between mb-2">
          <h3 className="font-medium">Boost Status</h3>
          <span>
            {boostStatus.isActive ? (
              <span className="text-green-500 font-medium">Active</span>
            ) : (
              <span className="text-muted-foreground">Inactive</span>
            )}
          </span>
        </div>
        
        {boostStatus.isActive && (
          <div className="space-y-2">
            <p className="text-sm">
              <span className="text-muted-foreground">Package: </span>
              <span>{boostStatus.packageName}</span>
            </p>
            <p className="text-sm">
              <span className="text-muted-foreground">Time Remaining: </span>
              <span>{calculateRemainingTime()}</span>
            </p>
            <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
              <div 
                className="bg-primary h-full rounded-full"
                style={{ width: `${calculateProgress()}%` }}
              />
            </div>
          </div>
        )}
      </div>
      
      <div className="space-y-4">
        <h3 className="font-medium">Available Boost Packages</h3>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
          {renderPackages()}
        </div>
      </div>
    </div>
  );
};

export default PulseBoostManager;
