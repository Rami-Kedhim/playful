
import { BoostPackage, PulseBoost } from '@/types/boost';

interface UsePulseBoostAdapterResult {
  formatPulseDuration: (duration: string) => string;
  adaptGetPulseBoostPrice: (fn: (pkg: BoostPackage) => number) => (pkg: BoostPackage) => number;
  convertToUBX: (value: number) => number;
  convertToPulseBoost: (pkg: BoostPackage) => PulseBoost;
}

export const usePulseBoostAdapter = (profileId: string): UsePulseBoostAdapterResult => {
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

  const parseNumberValue = (val: any, fallback: number): number => {
    if (typeof val === "number") return val;
    if (typeof val === "string") {
      const parsed = Number(val);
      return isNaN(parsed) ? fallback : parsed;
    }
    return fallback;
  };

  const adaptGetPulseBoostPrice = (
    fn: (pkg: BoostPackage) => number
  ) => (pkg: BoostPackage): number => {
    if (pkg.price_ubx !== undefined && pkg.price_ubx !== null) {
      if (typeof pkg.price_ubx === 'string') {
        const parsed = Number(pkg.price_ubx);
        return isNaN(parsed) ? (fn ? fn(pkg) : 0) : parsed;
      }
      return pkg.price_ubx;
    }
    if (fn) {
      return fn(pkg);
    }
    return pkg.price || 0;
  };

  const convertToUBX = (value: number): number => {
    const UBX_RATE = 10; // 1 USD = 10 UBX
    return value * UBX_RATE;
  };

  const getColorForBoostPower = (boostPower: number): string => {
    if (boostPower >= 200) return '#ec4899';
    if (boostPower >= 100) return '#8b5cf6';
    return '#60a5fa';
  };

  const convertToPulseBoost = (pkg: BoostPackage): PulseBoost => {
    const durationStr = typeof pkg.duration === 'string' ? pkg.duration : '00:00:00';
    const [hoursStr, minutesStr, secondsStr] = durationStr.split(':');

    const hours = parseNumberValue(hoursStr, 0);
    const minutes = parseNumberValue(minutesStr, 0);
    const seconds = parseNumberValue(secondsStr, 0);

    const durationMinutes = (hours * 60) + minutes + (seconds / 60);
    const boostPowerNum = parseNumberValue(pkg.boost_power, 50);
    const visibilityIncreaseNum = parseNumberValue(pkg.visibility_increase, 50);

    let visibility: PulseBoost['visibility'] = 'homepage';
    if (boostPowerNum >= 200) visibility = 'global';
    else if (boostPowerNum >= 100) visibility = 'search';

    return {
      id: pkg.id,
      name: pkg.name,
      description: pkg.description || `${pkg.name} visibility boost for your profile`,
      duration: durationStr,
      durationMinutes,
      price: typeof pkg.price === 'number' ? pkg.price : 0,
      costUBX: typeof pkg.price_ubx === 'number' ? pkg.price_ubx : Math.round(convertToUBX(typeof pkg.price === 'number' ? pkg.price : 0)),
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
