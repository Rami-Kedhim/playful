
import { Escort as EscortType } from '@/types/Escort';
import { Escort as EscortTypeLower } from '@/types/escort';
import { AvailabilityDay } from '@/types/availability';
import { BoostStatus as BoostStatusType } from '@/types/boost';
import { BoostStatus as PulseBoostStatusType } from '@/types/pulse-boost';
import { UberPersona } from '@/types/uberPersona';

// Normalize the video objects to ensure compatible types
export const normalizeVideoType = (video: any): { id?: string; url: string; thumbnail?: string; title?: string; duration?: number } => {
  return {
    id: video.id,
    url: video.url || '',
    thumbnail: video.thumbnail || video.thumbnailUrl,
    title: video.title,
    duration: video.duration
  };
};

export const convertEscortType = (escort: any): EscortTypeLower => {
  // Create a normalized escort object that works with both types
  const normalizedEscort: EscortTypeLower = {
    ...escort,
    id: escort.id || '',
    name: escort.name || '',
    gender: escort.gender || 'female', // Provide a default gender
  };

  // Normalize videos array if it exists
  if (escort.videos && Array.isArray(escort.videos)) {
    normalizedEscort.videos = escort.videos.map(normalizeVideoType);
  }

  return normalizedEscort;
};

// Add the missing function
export const ensureCompatibleAvailabilityDays = (days: AvailabilityDay[] | undefined): AvailabilityDay[] => {
  if (!days || !Array.isArray(days)) {
    return [];
  }
  
  return days.map(day => ({
    day: day.day,
    available: day.available,
    startTime: day.startTime || "09:00",
    endTime: day.endTime || "17:00"
  }));
};

// Add a helper function to ensure escort objects are compatible
export const ensureEscortTypeCompatibility = (escort: any): EscortType => {
  if (!escort) return {} as EscortType;
  
  return {
    ...escort,
    gender: escort.gender || 'female', // Ensure gender is always defined
    id: escort.id || '',
    name: escort.name || '',
    location: escort.location || '',
    services: escort.services || [],
    rating: escort.rating || 0,
    price: escort.price || 0,
  } as EscortType;
};

// Helper function to convert between boost status types
export const convertBoostStatus = (status: any): BoostStatusType => {
  return {
    ...status,
    isExpiring: status.isExpiring || false,
    expiresAt: status.expiresAt ? new Date(status.expiresAt) : undefined,
    startedAt: status.startedAt ? new Date(status.startedAt) : undefined,
    timeRemaining: typeof status.timeRemaining === 'number' 
      ? String(status.timeRemaining) 
      : status.timeRemaining || '',
    remainingTime: typeof status.remainingTime === 'number'
      ? String(status.remainingTime)
      : status.remainingTime || '',
  };
};

// Convert PulseBoostStatus to BoostStatus
export const convertPulseBoostStatus = (status: PulseBoostStatusType): BoostStatusType => {
  return {
    isActive: status.isActive,
    isExpiring: status.isExpiring || false,
    expiresAt: status.expiresAt ? new Date(status.expiresAt) : undefined,
    startedAt: status.startedAt ? new Date(status.startedAt) : undefined,
    timeRemaining: status.timeRemaining || '',
    remainingTime: status.timeRemaining || '',
    packageName: status.packageName,
    packageId: status.packageId,
    boostPackage: status.boostPackage,
    progress: status.progress || 0,
    boostLevel: status.boostLevel || 0,
  };
};

// Normalize UberPersona to ensure all required properties exist
export const normalizeUberPersona = (persona: UberPersona): UberPersona => {
  return {
    ...persona,
    id: persona.id || '',
    name: persona.name || '',
    type: persona.type || '',
    displayName: persona.displayName || persona.name || '',
    isVerified: persona.isVerified || false,
    isOnline: persona.isOnline || false,
    isAI: persona.isAI || false,
    isPremium: persona.isPremium || false,
    location: persona.location || '',
    tags: persona.tags || [],
    bio: persona.bio || '',
    languages: persona.languages || [],
    traits: persona.traits || [],
    stats: {
      ...(persona.stats || {}),
      popularity: persona.stats?.popularity || 0,
      intelligence: persona.stats?.intelligence || 0,
      charm: persona.stats?.charm || 0,
      energy: persona.stats?.energy || 0,
      views: persona.stats?.views || 0,
      likes: persona.stats?.likes || 0,
      responseRate: persona.stats?.responseRate || 0,
      responseTime: persona.stats?.responseTime || 0,
      rating: persona.stats?.rating || 0,
    },
    monetization: {
      ...(persona.monetization || {}),
      hourlyRate: persona.monetization?.hourlyRate || 0,
      packages: persona.monetization?.packages || [],
      acceptsUbx: persona.monetization?.acceptsUbx || false,
      acceptsFiat: persona.monetization?.acceptsFiat || false,
      meetingPrice: persona.monetization?.meetingPrice || 0,
    }
  };
};
