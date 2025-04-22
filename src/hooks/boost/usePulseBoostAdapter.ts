
import { BoostPackage } from '@/types/boost';

// Create extended interfaces for the adapter
interface AdaptedBoostPackage extends BoostPackage {
  durationMinutes?: number;
  costUBX?: number;
}

export const useBoostAdapters = (profileId: string) => {
  const adaptFormatBoostDuration = (duration: string) => {
    const [hours, minutes] = duration.split(':').map(Number);
    return hours >= 24 ? 
      `${Math.floor(hours / 24)} days` : 
      `${hours} hours`;
  };

  const formatBoostDuration = (minutes: number): string => {
    if (minutes < 60) return `${minutes} minutes`;
    if (minutes < 1440) return `${Math.floor(minutes / 60)} hours`;
    return `${Math.floor(minutes / 1440)} days`;
  };

  // Fix the formatDuration function to handle standard packages
  const formatDuration = (pkg: BoostPackage): string => {
    const adaptedPkg = pkg as AdaptedBoostPackage;
    
    // Check if we're dealing with the adapted package format
    if (adaptedPkg.durationMinutes !== undefined) {
      const minutes = adaptedPkg.durationMinutes;
      if (minutes < 60) return `${minutes} minutes`;
      if (minutes < 1440) return `${Math.floor(minutes / 60)} hours`;
      return `${Math.floor(minutes / 1440)} days`;
    } else if (pkg.duration) {
      // Parse the duration string like "24:00:00" into hours
      const parts = pkg.duration.split(':');
      const hours = parseInt(parts[0], 10);
      
      if (hours < 1) return "Less than an hour";
      if (hours < 24) return `${hours} hours`;
      return `${Math.floor(hours / 24)} days`;
    } else {
      return "Unknown duration";
    }
  };

  // Fix the getBoostPrice function to handle multiple price formats
  const getBoostPrice = (pkg: BoostPackage): number => {
    const adaptedPkg = pkg as AdaptedBoostPackage;
    
    if (adaptedPkg.costUBX !== undefined) {
      return adaptedPkg.costUBX;
    }
    return pkg.price_lucoin || pkg.price || 0;
  };

  return {
    formatBoostDuration,
    adaptFormatBoostDuration,
    formatDuration,
    getBoostPrice
  };
};
