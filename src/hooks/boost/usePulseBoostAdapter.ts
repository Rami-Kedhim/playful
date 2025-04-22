
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
    const [hoursStr, minutesStr, secondsStr] = duration.split(':');
    const hours = Number(hoursStr);
    const minutes = Number(minutesStr);
    const seconds = Number(secondsStr);

    if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) return "Unknown duration";

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
    if (pkg.price_ubx !== undefined && pkg.price_ubx !== null) {
      return pkg.price_ubx;
    }

    if (fn) {
      return fn(pkg);
    }

    return pkg.price || 0;
  };

  // Convert USD to UBX at a fixed rate (for example purposes)
  const convertToUBX = (value: number): number => {
    const UBX_RATE = 10; // 1 USD = 10 UBX
    return value * UBX_RATE;
  };

  // Get a color for the boost level
  const getColorForBoostPower = (boost_power: number): string => {
    if (boost_power >= 200) return '#ec4899'; // Pink for premium
    if (boost_power >= 100) return '#8b5cf6'; // Purple for standard
    return '#60a5fa'; // Blue for basic
  };

  // Convert a standard boost package to a pulse boost
  const convertToPulseBoost = (pkg: BoostPackage): PulseBoost => {
    // Ensure duration is string and parse numbers
    const durationStr: string = typeof pkg.duration === 'string' ? pkg.duration : '00:00:00';
    const durationParts = durationStr.split(':');
    const hours = Number(durationParts[0]) || 0;
    const minutes = Number(durationParts[1]) || 0;
    const seconds = Number(durationParts[2]) || 0;

    // Calculate durationMinutes as number
    const durationMinutes = (hours * 60) + minutes + Math.floor(seconds / 60);

    let visibility: PulseBoost['visibility'] = 'homepage';
    const boostPowerNum: number = Number(pkg.boost_power) || 50;

    if (pkg.boost_power !== undefined && pkg.boost_power !== null) {
      if (boostPowerNum >= 200) {
        visibility = 'global';
      } else if (boostPowerNum >= 100) {
        visibility = 'search';
      } else {
        visibility = 'homepage';
      }
    }

    const visibilityIncreaseNum: number = Number(pkg.visibility_increase) || 50;

    return {
      id: pkg.id,
      name: pkg.name,
      description: pkg.description || `${pkg.name} visibility boost for your profile`,
      duration: durationStr,
      durationMinutes: durationMinutes,
      price: typeof pkg.price === 'number' ? pkg.price : 0,
      costUBX: typeof pkg.price_ubx === 'number'
        ? pkg.price_ubx
        : Math.round(convertToUBX(typeof pkg.price === 'number' ? pkg.price : 0)),
      visibility,
      color: getColorForBoostPower(boostPowerNum),
      badgeColor: getColorForBoostPower(boostPowerNum),
      features: pkg.features || [],
      visibility_increase: visibilityIncreaseNum
    };
  };

  return {
    formatPulseDuration,
    adaptGetPulseBoostPrice,
    convertToUBX,
    convertToPulseBoost
  };
};

export default usePulseBoostAdapter;
