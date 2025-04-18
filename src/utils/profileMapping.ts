
import { Escort } from "@/types/escort";
import { UberPersona } from "@/types/uberPersona";

/**
 * Maps a legacy Escort object to the new UberPersona structure
 */
export const mapEscortToUberPersona = (escort: Escort): UberPersona => {
  // Extract base profile data
  const baseProfile = {
    id: escort.id,
    username: escort.name?.toLowerCase().replace(/\s/g, '_') || `escort_${escort.id.substring(0, 8)}`,
    displayName: escort.name || 'Unnamed',
    avatarUrl: escort.imageUrl || escort.avatar_url || '',
    location: escort.location || '',
    language: escort.languages?.[0] || 'English',
    bio: escort.bio || escort.description || '',
    age: escort.age || 0,
    ethnicity: escort.ethnicity || '',
    tags: [...(escort.tags || []), ...(escort.services || [])],
    createdAt: new Date(),  // Default to current date if not provided
    updatedAt: new Date(),  // Default to current date if not provided
  };
  
  // Extract role flags
  const roleFlags = {
    isEscort: true,
    isCreator: false,
    isLivecam: false,
    isAI: escort.isAI || false,
    isVerified: escort.verified || false,
    isFeatured: escort.featured || false
  };
  
  // Extract capabilities
  const capabilities = {
    hasPhotos: false,
    hasVideos: false,
    hasStories: false,
    hasChat: true,
    hasBooking: true,
    hasLiveStream: false,
    hasExclusiveContent: false
  };
  
  // Extract monetization
  const monetization = {
    acceptsLucoin: true,
    acceptsTips: true,
    subscriptionPrice: escort.subscriptionPrice || undefined,
    unlockingPrice: escort.price,
    boostingActive: escort.boostLevel ? escort.boostLevel > 0 : false
  };
  
  // Return the complete UberPersona
  return {
    ...baseProfile,
    roleFlags,
    capabilities,
    monetization
  };
};

/**
 * Maps an array of Escorts to UberPersona objects
 */
export const mapEscortsToUberPersonas = (escorts: Escort[]): UberPersona[] => {
  return escorts.map(mapEscortToUberPersona);
};

export const getProfileType = (profile: Escort): 'scraped' | 'manual' | 'ai_enhanced' => {
  if (profile.isScraped || profile.profileType === 'scraped') return 'scraped';
  if (profile.isAI || profile.profileType === 'ai') return 'ai_enhanced';
  return 'manual';
};

export const mapProfileToType = (profileData: any): any => {
  return {
    id: profileData.id,
    username: profileData.username,
    displayName: profileData.displayName,
    avatarUrl: profileData.avatarUrl,
    location: profileData.location,
    language: profileData.language,
    bio: profileData.bio,
    age: profileData.age,
    ethnicity: profileData.ethnicity,
    tags: profileData.tags,
    createdAt: profileData.createdAt,
    updatedAt: profileData.updatedAt,
    sourceType: profileData.sourceType || 'manual',
    roleFlags: profileData.roleFlags,
    capabilities: profileData.capabilities,
    monetization: profileData.monetization,
  };
};
