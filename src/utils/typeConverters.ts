
import { UberPersona } from '@/types/uberPersona';
import { BoostPackage, BoostStatus, BoostEligibility } from '@/types/pulse-boost';

/**
 * Normalizes UberPersona data
 * @param persona The persona data to normalize
 * @returns A normalized UberPersona object
 */
export function normalizeUberPersona(persona: any): UberPersona {
  return {
    id: persona.id || '',
    name: persona.name || '',
    type: persona.type || 'companion',
    displayName: persona.displayName || persona.name || '',
    avatarUrl: persona.avatarUrl || persona.avatar_url || '',
    description: persona.description || persona.bio || '',
    tags: persona.tags || [],
    location: persona.location || '',
    isVerified: persona.isVerified || false,
    isOnline: persona.isOnline || persona.online_status || false,
    languages: persona.languages || [],
    traits: persona.traits || [],
    bio: persona.bio || persona.description || '',
    isAI: persona.isAI || false,
    isPremium: persona.isPremium || false,
    isFeatured: persona.isFeatured || false,
    stats: {
      popularity: persona.stats?.popularity || 0,
      intelligence: persona.stats?.intelligence || 0,
      charm: persona.stats?.charm || 0,
      energy: persona.stats?.energy || 0,
      views: persona.stats?.views || 0,
      likes: persona.stats?.likes || 0,
      responseRate: persona.stats?.responseRate || 0,
      responseTime: persona.stats?.responseTime || '0',
      rating: persona.stats?.rating || persona.rating || 0
    },
    monetization: {
      hourlyRate: persona.monetization?.hourlyRate || 0,
      minRate: persona.monetization?.minRate || 0,
      maxRate: persona.monetization?.maxRate || 0,
      acceptsUbx: persona.monetization?.acceptsUbx || false,
      acceptsFiat: persona.monetization?.acceptsFiat || false,
      meetingPrice: persona.monetization?.meetingPrice || 0,
      packages: persona.monetization?.packages || []
    }
  };
}

/**
 * Converts BoostStatus between different type formats
 */
export function convertBoostStatus(status: any): BoostStatus {
  return {
    isActive: !!status.isActive,
    packageId: status.packageId || status.activeBoostId || '',
    expiresAt: status.expiresAt || undefined,
    timeRemaining: typeof status.timeRemaining === 'number' ? String(status.timeRemaining) : (status.timeRemaining || ''),
    boostPackage: status.boostPackage,
    progress: status.progress || 0,
    packageName: status.packageName || '',
    startedAt: status.startedAt || undefined,
    activeBoostId: status.activeBoostId || status.packageId || '',
    startTime: status.startTime || undefined,
    endTime: status.endTime || undefined,
    isExpiring: status.isExpiring || false
  };
}

/**
 * Converts BoostEligibility between different type formats
 */
export function convertBoostEligibility(eligibility: any): BoostEligibility {
  return {
    isEligible: eligibility.isEligible || eligibility.eligible || false,
    eligible: eligibility.isEligible || eligibility.eligible || false,
    reason: eligibility.reason || '',
    reasons: eligibility.reasons || [],
    nextEligibleTime: eligibility.nextEligibleTime || '',
    remainingBoosts: eligibility.remainingBoosts || 0,
    maxBoostsPerDay: eligibility.maxBoostsPerDay || 0
  };
}

/**
 * Converts BoostPackage between different type formats
 */
export function convertBoostPackage(pkg: any): BoostPackage {
  return {
    id: pkg.id || '',
    name: pkg.name || '',
    description: pkg.description || '',
    price: pkg.price || 0,
    price_ubx: pkg.price_ubx || pkg.price || 0,
    duration: pkg.duration || '',
    durationMinutes: pkg.durationMinutes || 0,
    features: pkg.features || [],
    visibility: pkg.visibility || '',
    visibility_increase: pkg.visibility_increase || pkg.visibilityIncrease || 0,
    boost_power: pkg.boost_power || pkg.boostPower || 0,
    color: pkg.color || '',
    badgeColor: pkg.badgeColor || '',
    boostMultiplier: pkg.boostMultiplier || 1,
    isMostPopular: pkg.isMostPopular || false
  };
}

/**
 * Converts an array of BoostPackage between different formats
 */
export function convertBoostPackages(packages: any[]): BoostPackage[] {
  return packages.map(convertBoostPackage);
}
