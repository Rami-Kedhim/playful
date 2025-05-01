
import { useState } from 'react';
import { BoostStatus, HermesStatus } from '@/types/boost';

export const useHermesStatusAdapter = (initialStatus?: Partial<HermesStatus>) => {
  // Initialize with all required properties
  const [status, setStatus] = useState<HermesStatus>({
    position: initialStatus?.position || 0,
    activeUsers: initialStatus?.activeUsers || 0,
    estimatedVisibility: initialStatus?.estimatedVisibility || 0,
    lastUpdateTime: initialStatus?.lastUpdateTime || new Date().toISOString(),
    boostScore: initialStatus?.boostScore || 0,
    effectivenessScore: initialStatus?.effectivenessScore || 0,
    isActive: initialStatus?.isActive || false
  });

  const updateStatus = (newStatus: Partial<HermesStatus>) => {
    setStatus(prevStatus => ({
      ...prevStatus,
      ...newStatus
    }));
  };

  const calculateBoostRank = (score: number): number => {
    if (score > 80) return 1;
    if (score > 60) return 2;
    if (score > 40) return 3;
    if (score > 20) return 4;
    return 5;
  };

  const updateBoostScore = (score: number) => {
    // Make sure to include all required properties
    setStatus(prevStatus => ({
      ...prevStatus,
      boostScore: score,
      effectivenessScore: score > 50 ? score : prevStatus.effectivenessScore
    }));
  };

  return {
    status,
    updateStatus,
    calculateBoostRank,
    updateBoostScore
  };
};

export const useBoostStatusAdapter = () => {
  const [boostStatus, setBoostStatus] = useState<BoostStatus>({
    isActive: false
  });

  const updateBoostStatus = (newStatus: Partial<BoostStatus>) => {
    setBoostStatus(prevStatus => ({
      ...prevStatus,
      ...newStatus
    }));
  };

  const setActive = (packageId: string, expiresAt: Date) => {
    setBoostStatus({
      isActive: true,
      packageId,
      expiresAt,
      startedAt: new Date(),
      startTime: new Date(),
      endTime: expiresAt,
      remainingTime: '24:00:00',
      progress: 0
    });
  };

  const setInactive = () => {
    setBoostStatus({
      isActive: false
    });
  };

  return {
    boostStatus,
    updateBoostStatus,
    setActive,
    setInactive
  };
};
