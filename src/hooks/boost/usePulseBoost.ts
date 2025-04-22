
import { useState, useEffect, useCallback } from 'react';
import { BoostStatus, BoostPackage } from '@/types/boost';
import { useBoostManager } from '@/hooks/boost/useBoostManager';

interface PulseBoostProps {
  profileId?: string;
  userId?: string;
}

interface EnhancedBoostStatus extends BoostStatus {
  // Make sure the startTime and endTime are Date objects
  startTime: string;
  endTime: string;
  remainingTime: string;
}

export const usePulseBoost = ({ profileId, userId }: PulseBoostProps) => {
  const [pulseLevel, setPulseLevel] = useState(0);
  const [enhancedStatus, setEnhancedStatus] = useState<EnhancedBoostStatus | null>(null);
  const [isActive, setIsActive] = useState(false);
  
  const {
    boostStatus,
    boostPackages,
    loading,
    error,
    purchaseBoost,
    cancelBoost
  } = useBoostManager(profileId || userId || '');
  
  // Function to calculate pulse data based on boost status
  const calculatePulseData = useCallback(() => {
    if (!boostStatus?.isActive) {
      return {
        visibility: 'low',
        pulseLevel: 0,
        boostType: 'none'
      };
    }
    
    // Determine the current boost package
    const currentPackage = boostPackages.find(pkg => pkg.id === boostStatus.packageId);
    
    // Calculate pulse level based on boost power or default to medium
    const boostPower = currentPackage?.boost_power || 5;
    let pulseLevel = 0;
    let visibility = 'low';
    let boostType = currentPackage?.name || 'standard';
    
    if (boostPower >= 8) {
      pulseLevel = 3;
      visibility = 'high';
    } else if (boostPower >= 5) {
      pulseLevel = 2;
      visibility = 'medium';
    } else if (boostPower > 0) {
      pulseLevel = 1;
      visibility = 'low';
    }
    
    return {
      visibility,
      pulseLevel,
      boostType
    };
  }, [boostStatus, boostPackages]);
  
  // Calculate progress percentage
  const calculateProgress = useCallback(() => {
    if (!boostStatus?.isActive) return 0;
    
    const now = new Date().getTime();
    const start = new Date(boostStatus.startTime).getTime();
    const end = new Date(boostStatus.endTime).getTime();
    
    if (now >= end) return 100;
    if (now <= start) return 0;
    
    const elapsed = now - start;
    const total = end - start;
    const progress = (elapsed / total) * 100;
    
    return Math.max(0, Math.min(100, progress));
  }, [boostStatus]);
  
  // Update the enhanced boost status
  const updateEnhancedStatus = useCallback(() => {
    if (!boostStatus) {
      setEnhancedStatus(null);
      setIsActive(false);
      setPulseLevel(0);
      return;
    }
    
    const pulseData = calculatePulseData();
    const progress = calculateProgress();
    
    setPulseLevel(pulseData.pulseLevel);
    setIsActive(boostStatus.isActive);
    
    if (boostStatus.isActive) {
      setEnhancedStatus({
        ...boostStatus,
        pulseData,
        progress
      });
    } else {
      setEnhancedStatus(null);
    }
  }, [boostStatus, calculatePulseData, calculateProgress]);
  
  // Apply a pulse boost
  const applyPulseBoost = async (boostPackage: BoostPackage) => {
    try {
      const result = await purchaseBoost(boostPackage);
      if (result) {
        updateEnhancedStatus();
      }
      return result;
    } catch (err) {
      console.error('Error applying pulse boost:', err);
      return false;
    }
  };
  
  // Cancel an active pulse boost
  const cancelPulseBoost = async () => {
    try {
      const result = await cancelBoost();
      if (result) {
        setIsActive(false);
        setPulseLevel(0);
        setEnhancedStatus(null);
      }
      return result;
    } catch (err) {
      console.error('Error cancelling pulse boost:', err);
      return false;
    }
  };
  
  // Update on any changes
  useEffect(() => {
    updateEnhancedStatus();
  }, [updateEnhancedStatus]);
  
  return {
    pulseLevel,
    isActive,
    enhancedStatus,
    loading,
    error,
    boostPackages,
    applyPulseBoost,
    cancelPulseBoost
  };
};

export default usePulseBoost;
