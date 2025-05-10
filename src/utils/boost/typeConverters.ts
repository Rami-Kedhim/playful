
import { BoostPackage as BoostPackageType } from '@/types/boost';
import { BoostPackage as PulseBoostPackageType } from '@/types/pulse-boost';
import { BoostStatus as BoostStatusType } from '@/types/boost';
import { BoostStatus as PulseBoostStatusType } from '@/types/pulse-boost';

// Convert a BoostPackage from pulse-boost type to boost type
export const convertPulseBoostPackageToBoostPackage = (
  pulsePackage: PulseBoostPackageType
): BoostPackageType => {
  return {
    ...pulsePackage,
    // Ensure required fields exist
    description: pulsePackage.description || '',
    price_ubx: pulsePackage.price_ubx || 0,
    durationMinutes: pulsePackage.durationMinutes || 0,
    features: pulsePackage.features || [],
    visibility: pulsePackage.visibility || '',
    visibility_increase: pulsePackage.visibility_increase || 0,
  };
};

// Convert a BoostStatus from pulse-boost type to boost type
export const convertPulseBoostStatusToBoostStatus = (
  pulseStatus: PulseBoostStatusType
): BoostStatusType => {
  return {
    ...pulseStatus,
    isExpiring: pulseStatus.isExpiring || false,
    // Handle date conversion if needed
    expiresAt: pulseStatus.expiresAt || undefined,
    startedAt: pulseStatus.startedAt || undefined,
  };
};

// Convert a BoostStatus from boost type to pulse-boost type
export const convertBoostStatusToPulseBoostStatus = (
  boostStatus: BoostStatusType
): PulseBoostStatusType => {
  return {
    ...boostStatus,
    isExpiring: boostStatus.isExpiring || false,
    // Any additional conversions needed
  };
};
