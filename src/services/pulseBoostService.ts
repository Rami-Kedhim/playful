import { BoostPackage } from '@/types/boost';
import { PulseBoost } from '@/types/pulse-boost';
import { PULSE_BOOSTS } from '@/constants/pulseBoostConfig';

export const getPulsePackages = async (): Promise<BoostPackage[]> => {
  // Return constant PulseBoosts with costUBX properly assigned
  return new Promise((resolve) => {
    setTimeout(() => {
      const adaptedPackages: BoostPackage[] = PULSE_BOOSTS.map((pb) => ({
        id: pb.id,
        name: pb.name,
        description: pb.description || '',
        duration: typeof pb.duration === 'number' ? `${pb.duration}:00:00` : pb.duration || '00:00:00',
        price_ubx: pb.costUBX ?? 0,
        price: pb.price || 0,
        features: pb.features || [],
        boost_power: 0,
        visibility_increase: 0,
      }));
      resolve(adaptedPackages);
    }, 500);
  });
};

export const applyBoost = async (userId: string, packageId: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });
};

export const cancelActiveBoost = async (userId: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });
};
