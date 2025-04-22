import { BoostPackage } from '@/types/boost';

// Add the missing properties to BoostPackage type in your adapter
interface AdaptedBoostPackage extends BoostPackage {
  durationMinutes: number;
  costUBX: number;
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

  // Fix the formatDuration function to use the proper properties
  const formatDuration = (pkg: BoostPackage): string => {
    // Check if we're dealing with the native package format or an adapted one
    if ((pkg as AdaptedBoostPackage).durationMinutes) {
      const minutes = (pkg as AdaptedBoostPackage).durationMinutes;
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

  // Fix the getBoostPrice function to use the proper properties
  const getBoostPrice = (pkg: BoostPackage): number => {
    if ((pkg as AdaptedBoostPackage).costUBX !== undefined) {
      return (pkg as AdaptedBoostPackage).costUBX;
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
