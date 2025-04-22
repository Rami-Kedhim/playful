
import { BoostPackage } from '@/types/boost';
import { PulseBoost } from '@/types/pulse-boost';
import { PULSE_BOOSTS } from '@/constants/pulseBoostConfig';

export const getPulsePackages = async (): Promise<BoostPackage[]> => {
  // In a real implementation, this would fetch from an API
  // For now, we'll return our constant data
  return new Promise((resolve) => {
    setTimeout(() => {
      // Cast PulseBoost[] to BoostPackage[] by converting 'durationMinutes' and 'costUBX' to string price and duration respectively
      // We create new objects to satisfy BoostPackage shape
      const adaptedPackages: BoostPackage[] = PULSE_BOOSTS.map((pb: PulseBoost) => ({
        id: pb.id,
        name: pb.name,
        description: pb.description || '',
        duration: String(pb.duration) ?? '00:00:00',  // duration must be string in BoostPackage
        price_ubx: pb.costUBX,
        price: pb.price || 0,
        features: pb.features || [],
        boost_power: 0,  // no info
        visibility_increase: 0  // no info
      }));
      resolve(adaptedPackages);
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
