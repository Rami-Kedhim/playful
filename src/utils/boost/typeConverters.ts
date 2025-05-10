
import { BoostPackage as BoostPackageType } from '@/types/boost';
import { BoostPackage as PulseBoostPackageType } from '@/types/pulse-boost';
import { BoostStatus as BoostStatusType } from '@/types/boost';
import { BoostStatus as PulseBoostStatusType } from '@/types/pulse-boost';
import { BoostEligibility as BoostEligibilityType } from '@/types/boost';
import { BoostEligibility as PulseBoostEligibilityType } from '@/types/pulse-boost';

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

// Convert a BoostPackage from boost type to pulse-boost type
export const convertBoostPackageToPulseBoostPackage = (
  boostPackage: BoostPackageType
): PulseBoostPackageType => {
  return {
    ...boostPackage,
    description: boostPackage.description || '',
    price_ubx: boostPackage.price_ubx || 0,
    durationMinutes: boostPackage.durationMinutes || 0,
    features: boostPackage.features || [],
    visibility: boostPackage.visibility || '',
    visibility_increase: boostPackage.visibility_increase || 0,
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
    // Ensure timeRemaining is string
    timeRemaining: typeof pulseStatus.timeRemaining === 'number' 
      ? String(pulseStatus.timeRemaining) 
      : pulseStatus.timeRemaining || '',
    remainingTime: typeof pulseStatus.remainingTime === 'number'
      ? String(pulseStatus.remainingTime)
      : pulseStatus.remainingTime || '',
  };
};

// Convert a BoostStatus from boost type to pulse-boost type
export const convertBoostStatusToPulseBoostStatus = (
  boostStatus: BoostStatusType
): PulseBoostStatusType => {
  return {
    ...boostStatus,
    isExpiring: boostStatus.isExpiring || false,
    // Ensure timeRemaining is string
    timeRemaining: typeof boostStatus.timeRemaining === 'number' 
      ? String(boostStatus.timeRemaining) 
      : boostStatus.timeRemaining || '',
    remainingTime: typeof boostStatus.remainingTime === 'number'
      ? String(boostStatus.remainingTime)
      : boostStatus.remainingTime || '',
  };
};

// Convert BoostEligibility between types
export const convertBoostEligibilityToPulseBoostEligibility = (
  eligibility: BoostEligibilityType
): PulseBoostEligibilityType => {
  return {
    ...eligibility,
    eligible: eligibility.eligible ?? eligibility.isEligible ?? true,
  };
};

// Convert an array of BoostPackages
export const convertBoostPackagesArrayToPulseBoostPackagesArray = (
  packages: BoostPackageType[]
): PulseBoostPackageType[] => {
  return packages.map(convertBoostPackageToPulseBoostPackage);
};
