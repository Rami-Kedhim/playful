import { Escort } from "@/types/escort";
import { UberPersona, RoleFlags, Capabilities, Monetization, SystemMetadata } from "@/types/uberPersona";

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
  const roleFlags: RoleFlags = {
    isEscort: true,
    isCreator: !!escort.gallery?.length || !!escort.gallery_images?.length,
    isLivecam: false, // Default value, can be updated if needed
    isAI: escort.isAI || false,
    isVerified: escort.verified || false,
    isFeatured: escort.featured || false
  };
  
  // Extract capabilities
  const capabilities: Capabilities = {
    hasPhotos: !!(escort.gallery?.length || escort.gallery_images?.length),
    hasVideos: !!escort.videos?.length,
    hasStories: false, // Default value, can be updated if needed
    hasChat: true,
    hasVoice: false, // Default value, can be updated if needed
    hasBooking: true,
    hasLiveStream: false, // Default value, can be updated if needed
    hasExclusiveContent: !!escort.providesVirtualContent
  };
  
  // Extract monetization
  const monetization: Monetization = {
    acceptsLucoin: true,
    acceptsTips: true,
    subscriptionPrice: escort.subscriptionPrice,
    unlockingPrice: escort.price,
    boostingActive: escort.boostLevel ? escort.boostLevel > 0 : false
  };
  
  // Extract system metadata
  const systemMetadata: SystemMetadata = {
    source: escort.isScraped ? 'scraped' : escort.isAI ? 'ai_generated' : 'manual',
    lastSynced: undefined,  // No direct mapping available
    aiPersonality: escort.isAI ? 'friendly' : undefined,
    aiMood: escort.isAI ? 'happy' : undefined,
    aiEngine: escort.isAI ? 'GPT' : undefined,
    tagsGeneratedByAI: escort.isAI || escort.isScraped || false
  };
  
  // Return the complete UberPersona
  return {
    ...baseProfile,
    roleFlags,
    capabilities,
    monetization,
    systemMetadata
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
