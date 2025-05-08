
import { useState } from 'react';
import { BoostStatus } from '@/types/boost';

export const useBoostStatusBase = (initialState: BoostStatus | null = null) => {
  // Initialize with default state if none provided
  const defaultState: BoostStatus = initialState || {
    isActive: false,
    remainingTime: '00:00:00'
  };
  
  const [status, setStatus] = useState<BoostStatus>(defaultState);
  
  // Function to update the boost status
  const updateStatus = (newStatus: Partial<BoostStatus>) => {
    setStatus(prevStatus => ({
      ...prevStatus,
      ...newStatus
    }));
  };
  
  // Function to set active boost
  const setActiveBoost = (
    packageId: string, 
    expiresAt: Date, 
    options?: {
      packageName?: string;
      boostMultiplier?: number;
      activeBoostId?: string;
    }
  ) => {
    setStatus({
      isActive: true,
      packageId,
      expiresAt,
      startedAt: new Date(),
      startTime: new Date(),
      endTime: expiresAt,
      remainingTime: '24:00:00', // Default remaining time
      packageName: options?.packageName,
      activeBoostId: options?.activeBoostId,
      progress: 0
    });
  };
  
  // Function to set inactive boost
  const setInactiveBoost = () => {
    setStatus({
      isActive: false,
      remainingTime: '00:00:00'
    });
  };
  
  // Function to reset the boost status
  const resetStatus = () => {
    setStatus(defaultState);
  };
  
  return {
    status,
    updateStatus,
    setActiveBoost,
    setInactiveBoost,
    resetStatus
  };
};

export default useBoostStatusBase;
