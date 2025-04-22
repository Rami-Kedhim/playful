
// The error was about incorrectly passing a number to a parameter that doesn't accept numbers

// For the formatDurationAdapter function, ensure it's typed correctly:
export const adaptFormatBoostDuration = (formatFn: (duration: string) => string) => {
  // Ensure the adapter function accepts and returns the correct types
  return (duration: string): string => {
    if (typeof duration !== 'string') {
      // Convert number to string if needed (this helps with type safety)
      const durationStr = String(duration);
      return formatFn(durationStr);
    }
    return formatFn(duration);
  };
};

// Add missing adapter functions
export const adaptBoostStatus = (status: any): any => {
  return {
    isActive: !!status?.isActive,
    startTime: status?.startTime,
    endTime: status?.endTime,
    remainingTime: status?.timeRemaining || status?.remainingTime,
    progress: status?.progress || 0,
    packageId: status?.packageId,
    packageName: status?.packageName,
    profileId: status?.profileId,
    activeBoostId: status?.activeBoostId,
    expiresAt: status?.expiresAt,
    timeRemaining: status?.timeRemaining,
    boostPackage: status?.boostPackage
  };
};

export const adaptBoostEligibility = (eligibility: any): any => {
  return {
    isEligible: eligibility?.isEligible !== undefined ? eligibility.isEligible : eligibility?.eligible,
    reason: eligibility?.reason,
    reasons: eligibility?.reasons,
    minimumProfileCompleteness: eligibility?.minimumProfileCompleteness,
    missingFields: eligibility?.missingFields,
    minRequiredBalance: eligibility?.minRequiredBalance
  };
};

export const adaptBoostPackages = (packages: any[]): any[] => {
  if (!packages || !Array.isArray(packages)) return [];
  return packages.map(pkg => ({
    id: pkg.id,
    name: pkg.name,
    duration: pkg.duration,
    price_ubx: pkg.price_ubx,
    description: pkg.description || '',
    features: pkg.features || []
  }));
};

export const adaptGetBoostPrice = (priceFn: any): (() => number) => {
  return () => {
    if (typeof priceFn === 'function') {
      return priceFn();
    }
    return 0;
  };
};
