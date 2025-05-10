
import { BoostPackage } from '@/types/pulse-boost';

// Helper function to convert between different package formats
export const convertBoostPackage = (pkg: any): BoostPackage => {
  return {
    id: pkg.id || '',
    name: pkg.name || '',
    description: pkg.description || '',
    price: pkg.price || 0,
    price_ubx: pkg.price_ubx || 0,
    duration: pkg.duration || '',
    durationMinutes: pkg.durationMinutes || 0,
    features: pkg.features || [],
    visibility: pkg.visibility || '',
    visibility_increase: pkg.visibility_increase || 0,
    isMostPopular: pkg.isMostPopular || false
  };
};
