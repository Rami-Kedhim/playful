
import { UberPersona } from '@/types/uberPersona';

/**
 * Ensures all UberPersona objects have consistent properties
 */
export const normalizeUberPersona = (persona: UberPersona): UberPersona => {
  return {
    ...persona,
    type: persona.type || 'escort',
    isVerified: persona.isVerified || false,
    isOnline: persona.isOnline || false,
    isPremium: persona.isPremium || false,
    rating: persona.rating || (persona.stats?.rating || 0),
    location: persona.location || 'Unknown',
    tags: persona.tags || [],
    stats: {
      ...(persona.stats || {}),
      rating: persona.stats?.rating || persona.rating || 0,
    }
  };
};

/**
 * Convert Escort type from one format to another
 * Handles differences between imported data and internal representation
 */
export const convertEscortType = (escort: any): any => {
  // Ensure videos have required url property
  const videos = Array.isArray(escort.videos)
    ? escort.videos.map((video: any) => ({
        ...video,
        url: video.url || video.source || '',
      }))
    : [];

  return {
    ...escort,
    videos,
  };
};

/**
 * Ensures compatibility of availability days data structure
 */
export const ensureCompatibleAvailabilityDays = (days: any[]): any[] => {
  if (!Array.isArray(days)) return [];
  
  return days.map(day => {
    return {
      day: day.day || day.name || 'Unknown',
      available: !!day.available,
      hours: day.hours || '9:00 AM - 5:00 PM',
      ...day
    };
  });
};

// Add the missing boost type converters
import { BoostPackage, BoostStatus, BoostEligibility } from '@/types/pulse-boost';

export const convertBoostStatus = (status: any): BoostStatus => {
  return {
    isActive: status.isActive || false,
    packageId: status.packageId,
    expiresAt: status.expiresAt,
    timeRemaining: status.timeRemaining || '0',
    packageName: status.packageName,
    startedAt: status.startedAt,
    isExpiring: status.isExpiring,
    boostLevel: status.boostLevel
  };
};

export const convertBoostEligibility = (eligibility: any): BoostEligibility => {
  return {
    eligible: eligibility.eligible || eligibility.isEligible || false,
    reason: eligibility.reason || '',
    reasons: eligibility.reasons || [],
    nextEligibleTime: eligibility.nextEligibleTime
  };
};

export const convertBoostPackages = (packages: any[]): BoostPackage[] => {
  if (!Array.isArray(packages)) return [];
  
  return packages.map(pkg => ({
    id: pkg.id,
    name: pkg.name,
    description: pkg.description || '',
    price: pkg.price || 0,
    price_ubx: pkg.price_ubx || 0,
    duration: pkg.duration || '24h',
    durationMinutes: pkg.durationMinutes || 1440,
    features: pkg.features || [],
    visibility: pkg.visibility || 'medium',
    visibility_increase: pkg.visibility_increase || 0,
    color: pkg.color,
    badgeColor: pkg.badgeColor,
    boostMultiplier: pkg.boostMultiplier,
    isMostPopular: pkg.isMostPopular
  }));
};
