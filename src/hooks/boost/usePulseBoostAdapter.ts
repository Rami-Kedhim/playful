
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
    if (typeof val === 'number') return val;
    if (typeof val === 'string') {
      const parsed = Number(val);
      if (isNaN(parsed)) return fallback;
      return parsed;
    }
    return fallback;
  };

  const adaptGetPulseBoostPrice = (fn: (pkg: BoostPackage) => number) => (pkg: BoostPackage): number => {
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
    return parseNumberValue(pkg.price, 0);
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
    const parts = durationStr.split(':');

    // Ensure parts are parsed as numbers instead of strings
    const hours = parseNumberValue(parts[0] || '0', 0);
    const minutes = parseNumberValue(parts[1] || '0', 0);
    const seconds = parseNumberValue(parts[2] || '0', 0);

    const durationMinutes: number = (hours * 60) + minutes + (seconds / 60);

    const boostPowerRaw = (pkg as any).boost_power ?? (pkg as any).boostPower;
    const visibilityIncreaseRaw = (pkg as any).visibility_increase ?? (pkg as any).visibilityIncrease;

    const boostPowerNum: number = parseNumberValue(boostPowerRaw, 50);
    const visibilityIncreaseNum: number = parseNumberValue(visibilityIncreaseRaw, 50);

    let visibility: PulseBoost['visibility'] = 'homepage';
    if (boostPowerNum >= 200) visibility = 'global';
    else if (boostPowerNum >= 100) visibility = 'search';

    let priceNum: number = 0;
    if (typeof pkg.price === 'number') priceNum = pkg.price;
    else if (typeof pkg.price === 'string') {
      const parsedPrice = Number(pkg.price);
      priceNum = isNaN(parsedPrice) ? 0 : parsedPrice;
    }

    let costUBXNum: number = 0;
    if (typeof (pkg as any).price_ubx === 'number') costUBXNum = (pkg as any).price_ubx;
    else if (typeof (pkg as any).price_ubx === 'string') {
      const parsedUBX = Number((pkg as any).price_ubx);
      costUBXNum = isNaN(parsedUBX) ? Math.round(convertToUBX(priceNum)) : parsedUBX;
    } else {
      costUBXNum = Math.round(convertToUBX(priceNum));
    }

    return {
      id: pkg.id,
      name: pkg.name,
      description: pkg.description || `${pkg.name} visibility boost for your profile`,
      duration: durationStr,
      durationMinutes: durationMinutes,
      price: priceNum,
      costUBX: costUBXNum,
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
