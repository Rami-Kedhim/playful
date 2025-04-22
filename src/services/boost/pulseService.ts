
import { BoostPackage } from '@/types/boost';
import { PulseBoost } from '@/types/pulse-boost';
import { PULSE_BOOSTS } from '@/constants/pulseBoostConfig';

export const getPulsePackages = async (): Promise<BoostPackage[]> => {
  // In a real implementation, this would fetch from an API
  // For now, we'll return our constant data
  return new Promise((resolve) => {
    setTimeout(() => {
      // Cast PulseBoost[] to BoostPackage[] by properly converting properties
      const adaptedPackages: BoostPackage[] = PULSE_BOOSTS.map((pb) => ({
        id: pb.id,
        name: pb.name,
        description: pb.description || '',
        duration: typeof pb.duration === 'number' ? `${pb.duration}:00:00` : pb.duration || '00:00:00',
        price_ubx: pb.costUBX,
        price: pb.price || 0,
        features: pb.features || [],
        boost_power: 0,  // no info provided in PulseBoost
        visibility_increase: 0  // no info provided in PulseBoost
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
