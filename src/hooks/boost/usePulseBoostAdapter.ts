
import { BoostPackage, PulseBoost } from '@/types/boost';

interface UsePulseBoostAdapterResult {
  formatPulseDuration: (duration: string) => string;
  adaptGetPulseBoostPrice: (fn: (pkg: BoostPackage) => number) => (pkg: BoostPackage) => number;
  convertToUBX: (value: number) => number;
  convertToPulseBoost: (pkg: BoostPackage) => PulseBoost;
}

export const usePulseBoostAdapter = (profileId: string): UsePulseBoostAdapterResult => {
  // Format the pulse boost duration to readable string
  const formatPulseDuration = (duration: string): string => {
    const [hours, minutes, seconds] = duration.split(':').map(Number);
    
    if (!hours && !minutes && !seconds) return "Unknown duration";
    
    if (hours >= 24) {
      const days = Math.floor(hours / 24);
      return `${days} ${days === 1 ? 'day' : 'days'}`;
    }
    
    if (hours >= 1) {
      return `${hours} ${hours === 1 ? 'hour' : 'hours'}`;
    }
    
    if (minutes >= 1) {
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
    }
    
    return "Less than a minute";
  };
  
  // Adapt a price getter function to handle our package formats
  const adaptGetPulseBoostPrice = (
    fn: (pkg: BoostPackage) => number
  ) => (pkg: BoostPackage): number => {
    // If the package has an explicit UBX price, use that
    if (pkg.price_ubx) {
      return pkg.price_ubx;
    }
    
    // If our adapter function is provided, use that
    if (fn) {
      return fn(pkg);
    }
    
    // Fall back to regular price or 0
    return pkg.price || 0;
  };
  
  // Convert USD to UBX at a fixed rate (for example purposes)
  const convertToUBX = (value: number): number => {
    const UBX_RATE = 10; // 1 USD = 10 UBX
    return value * UBX_RATE;
  };
  
  // Convert a standard boost package to a pulse boost
  const convertToPulseBoost = (pkg: BoostPackage): PulseBoost => {
    const durationParts = pkg.duration?.split(':') || ['0', '0', '0'];
    const hours = parseInt(durationParts[0], 10) || 0;
    const minutes = parseInt(durationParts[1], 10) || 0;
    
    // Calculate the duration in minutes
    const durationMinutes = hours * 60 + minutes;
    
    // Determine the visibility level based on boost level or other properties
    let visibility = 'standard';
    if (pkg.boost_power && pkg.boost_power >= 200) {
      visibility = 'global';
    } else if (pkg.boost_power && pkg.boost_power >= 100) {
      visibility = 'platform';
    } else {
      visibility = 'homepage';
    }
    
    return {
      id: pkg.id,
      name: pkg.name,
      description: pkg.description || `${pkg.name} visibility boost for your profile`,
      duration: pkg.duration,
      durationMinutes,
      price: pkg.price,
      costUBX: pkg.price_ubx || Math.round(convertToUBX(pkg.price)),
      visibility,
      color: getColorForBoostPower(pkg.boost_power || 50),
      badgeColor: getColorForBoostPower(pkg.boost_power || 50),
      features: pkg.features || [],
      boost_power: pkg.boost_power || 50,
      visibility_increase: pkg.visibility_increase || 50
    };
  };
  
  // Get a color for the boost level
  const getColorForBoostPower = (boost_power: number): string => {
    if (boost_power >= 200) return '#ec4899'; // Pink for premium
    if (boost_power >= 100) return '#8b5cf6'; // Purple for standard
    return '#60a5fa'; // Blue for basic
  };
  
  return {
    formatPulseDuration,
    adaptGetPulseBoostPrice,
    convertToUBX,
    convertToPulseBoost
  };
};

export default usePulseBoostAdapter;
