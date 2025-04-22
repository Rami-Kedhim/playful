
import { BoostStatus, BoostEligibility, BoostPackage } from '@/types/boost';
import { useBoostManager } from '@/hooks/boost/useBoostManager';

/**
 * Adapts boost status from useBoostManager to the BoostStatus type
 */
export const adaptBoostStatus = (status: any): BoostStatus => {
  return {
    isActive: status?.isActive || false,
    startTime: status?.startTime || '',
    endTime: status?.endTime || '',
    remainingTime: status?.remainingTime?.toString() || '0',
    progress: status?.progress || 0,
    packageId: status?.packageId || '',
    packageName: status?.packageName || 'Standard Boost',
    profileId: status?.profileId || '',
    activeBoostId: status?.activeBoostId || '',
    expiresAt: status?.expiresAt || new Date().toISOString(),
  };
};

/**
 * Adapts boost eligibility from useBoostManager to the BoostEligibility type
 */
export const adaptBoostEligibility = (eligibility: any): BoostEligibility => {
  return {
    isEligible: eligibility?.isEligible || false,
    reason: eligibility?.reason || 'Unknown eligibility status',
  };
};

/**
 * Adapts boost packages from useBoostManager to BoostPackage[]
 */
export const adaptBoostPackages = (packages: any[]): BoostPackage[] => {
  return packages.map(pkg => ({
    id: pkg.id || '',
    name: pkg.name || '',
    description: pkg.description || '',
    duration: pkg.duration || '01:00',
    price_ubx: pkg.price || 0,
    boost_power: pkg.power || 1,
    visibility_increase: pkg.visibilityIncrease || 0,
    image_url: pkg.imageUrl,
    is_featured: pkg.isFeatured,
    badge_color: pkg.badgeColor,
    icon: pkg.icon
  }));
};

/**
 * Adapts the price getter from useBoostManager
 */
export const adaptGetBoostPrice = (selectedPackage: string, packages: any[]): number => {
  const selected = packages.find(pkg => pkg.id === selectedPackage);
  return selected?.price || 0;
};

/**
 * Hook that provides typed boost functionality
 */
export const useBoostAdapters = (profileId: string) => {
  const {
    boostStatus: rawStatus,
    eligibility: rawEligibility,
    boostPackages: rawPackages,
    loading,
    error,
    purchaseBoost: rawPurchase,
    cancelBoost: rawCancel,
    dailyBoostUsage,
    dailyBoostLimit
  } = useBoostManager(profileId);

  // Adapt types for consumer components
  const boostStatus = adaptBoostStatus(rawStatus);
  const eligibility = adaptBoostEligibility(rawEligibility);
  const boostPackages = adaptBoostPackages(rawPackages);

  // Adapt functions
  const purchaseBoost = async (pkg: BoostPackage) => {
    // Convert BoostPackage to the format expected by raw purchaseBoost
    const adaptedPackage = {
      id: pkg.id,
      name: pkg.name,
      description: pkg.description,
      price: pkg.price_ubx,
      duration: pkg.duration
    };
    return rawPurchase(adaptedPackage);
  };

  return {
    boostStatus,
    eligibility,
    boostPackages,
    loading,
    error,
    purchaseBoost,
    cancelBoost: rawCancel,
    dailyBoostUsage,
    dailyBoostLimit,
    getBoostPrice: (packageId: string) => adaptGetBoostPrice(packageId, rawPackages)
  };
};
