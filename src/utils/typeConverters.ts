
import { UberPersona } from '@/types/uberPersona';
import { BoostPackage, BoostStatus, BoostEligibility } from '@/types/pulse-boost';
import { Escort } from '@/types/Escort';

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
    isExpiring: status.isExpiring || false,
    boostLevel: status.boostLevel || 0,
    remainingTime: typeof status.remainingTime === 'number' ? String(status.remainingTime) : (status.remainingTime || '')
  };
}

/**
 * Converts BoostEligibility between different type formats
 */
export function convertBoostEligibility(eligibility: any): BoostEligibility {
  return {
    eligible: eligibility.eligible || eligibility.isEligible || false,
    isEligible: eligibility.isEligible || eligibility.eligible || false,
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

/**
 * Converts an escort from any source to a standardized Escort type
 */
export function convertEscortType(escortData: any): Escort {
  if (!escortData) return {} as Escort;
  
  return {
    id: escortData.id || '',
    name: escortData.name || '',
    age: escortData.age || 0,
    gender: escortData.gender || '',
    bio: escortData.bio || escortData.description || '',
    location: escortData.location || '',
    locationDetails: escortData.locationDetails || {},
    profileImage: escortData.profileImage || escortData.avatarUrl || escortData.imageUrl || '',
    imageUrl: escortData.imageUrl || escortData.profileImage || escortData.avatarUrl || '',
    images: escortData.images || [],
    videos: escortData.videos || [],
    services: escortData.services || [],
    rates: escortData.rates || {},
    price: escortData.price || escortData.rates?.hourly || escortData.monetization?.hourlyRate || 0,
    priceDetails: escortData.priceDetails || {},
    verified: escortData.verified || escortData.isVerified || false,
    isVerified: escortData.isVerified || escortData.verified || false,
    tags: escortData.tags || [],
    availability: escortData.availability || [],
    availabilityPreferences: escortData.availabilityPreferences || {},
    contactInfo: escortData.contactInfo || {},
    reviewCount: escortData.reviewCount || escortData.reviews?.length || 0,
    rating: escortData.rating || escortData.stats?.rating || 0,
    createdAt: escortData.createdAt || new Date().toISOString(),
    updatedAt: escortData.updatedAt || new Date().toISOString(),
    userId: escortData.userId || escortData.id || '',
    displayName: escortData.displayName || escortData.name || '',
    city: escortData.city || escortData.location?.split(',')[0] || '',
    province: escortData.province || '',
    country: escortData.country || '',
    isPremium: escortData.isPremium || false,
    isFeatured: escortData.isFeatured || false,
    isActive: escortData.isActive !== undefined ? escortData.isActive : true,
  };
}

/**
 * Ensures escort availability days are in a compatible format
 */
export function ensureCompatibleAvailabilityDays(availability: any) {
  if (!availability || !Array.isArray(availability)) {
    return [];
  }
  
  return availability.map(slot => {
    return {
      start: typeof slot.start === 'string' ? new Date(slot.start) : slot.start,
      end: typeof slot.end === 'string' ? new Date(slot.end) : slot.end
    };
  });
}
