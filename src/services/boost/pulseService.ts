
import { BoostPackage } from '@/types/boost';
import { PULSE_BOOSTS } from '@/constants/pulseBoostConfig';

export const getPulsePackages = async (): Promise<BoostPackage[]> => {
  // In a real implementation, this would fetch from an API
  // For now, we'll return our constant data
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(PULSE_BOOSTS);
    }, 500);
  });
};

export const applyBoost = async (userId: string, packageId: string): Promise<boolean> => {
  // Simulated API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });
};

export const cancelActiveBoost = async (userId: string): Promise<boolean> => {
  // Simulated API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });
};
