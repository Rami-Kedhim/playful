import { Escort } from '@/types/escort';
import { ContentCreator } from '@/types/creator';
import { LivecamModel } from '@/types/livecam';
import { UberPersona } from '@/types/UberPersona';

/**
 * Maps an escort model to the UberPersona format
 * @param escort The escort data to convert
 * @returns UberPersona formatted data
 */
export const mapEscortToUberPersona = (escort: Escort): UberPersona => {
  return {
    id: escort.id,
    username: escort.name.toLowerCase().replace(/\s+/g, '_'),
    displayName: escort.name,
    avatarUrl: escort.avatarUrl || escort.avatar || escort.images[0] || '',
    location: escort.location || '',
    language: (escort.languages && escort.languages.length > 0) ? escort.languages[0] : 'English',
    bio: escort.bio || escort.description || '',
    age: escort.age || 0,
    ethnicity: escort.ethnicity || '',
    tags: escort.tags || escort.services || [],
    createdAt: new Date(),
    updatedAt: new Date(),
    roleFlags: {
      isEscort: true,
      isCreator: false,
      isLivecam: false,
      isAI: escort.isAI || false,
      isVerified: escort.isVerified || escort.verified || false,
      isFeatured: escort.featured || false
    },
    capabilities: {
      hasPhotos: (escort.images && escort.images.length > 0) || false,
      hasVideos: (escort.videos && escort.videos.length > 0) || false,
      hasStories: false,
      hasChat: true,
      hasBooking: escort.providesInPersonServices || true,
      hasLiveStream: escort.providesVirtualContent || false,
      hasExclusiveContent: false,
      hasContent: false,
      hasRealMeets: escort.providesInPersonServices || true,
      hasVirtualMeets: escort.providesVirtualContent || false
    },
    monetization: {
      acceptsLucoin: true,
      acceptsTips: true,
      subscriptionPrice: 0,
      unlockingPrice: 0,
      boostingActive: escort.boostLevel ? escort.boostLevel > 0 : false,
      meetingPrice: escort.price || 0
    },
    stats: {
      rating: escort.rating || 0,
      reviewCount: escort.reviewCount || 0,
      responseRate: escort.responseRate || 0.8,
      viewCount: 0,
      favoriteCount: 0
    },
    systemMetadata: {
      source: escort.isAI ? 'ai_generated' : (escort.isVerified ? 'manual' : 'scraped'),
      tagsGeneratedByAI: false,
      hilbertSpaceVector: generateHilbertVector(escort.id)
    }
  };
};

/**
 * Maps a content creator to UberPersona format
 */
export const mapCreatorToUberPersona = (creator: ContentCreator): UberPersona => {
  return {
    id: creator.id,
    username: creator.username || creator.name.toLowerCase().replace(/\s+/g, '_'),
    displayName: creator.name,
    avatarUrl: creator.avatarUrl || creator.profileImage || creator.imageUrl || '',
    location: creator.location || '',
    language: (creator.languages && creator.languages.length > 0) ? creator.languages[0] : 'English',
    bio: creator.bio || creator.description || '',
    age: creator.age || 0,
    ethnicity: creator.ethnicity || '',
    tags: creator.tags || [],
    createdAt: creator.createdAt ? new Date(creator.createdAt) : new Date(),
    updatedAt: creator.updatedAt ? new Date(creator.updatedAt) : new Date(),
    roleFlags: {
      isEscort: false,
      isCreator: true,
      isLivecam: creator.hasLiveStream || false,
      isAI: creator.isAI || false,
      isVerified: creator.isVerified || false,
      isFeatured: creator.isFeatured || false
    },
    capabilities: {
      hasPhotos: (creator.contentCount?.photos || 0) > 0,
      hasVideos: (creator.contentCount?.videos || 0) > 0,
      hasStories: (creator.contentCount?.stories || 0) > 0,
      hasChat: true,
      hasBooking: false,
      hasLiveStream: creator.hasLiveStream || creator.isLive || false,
      hasExclusiveContent: creator.isPremium || false,
      hasContent: true,
      hasRealMeets: false,
      hasVirtualMeets: true
    },
    monetization: {
      acceptsLucoin: true,
      acceptsTips: true,
      subscriptionPrice: creator.subscriptionPrice || 0,
      unlockingPrice: 0,
      boostingActive: false,
      meetingPrice: 0
    },
    stats: {
      rating: creator.rating || 0,
      reviewCount: 0,
      responseRate: 0.5,
      viewCount: 0,
      favoriteCount: 0
    },
    systemMetadata: {
      source: creator.isAI ? 'ai_generated' : (creator.isScraped ? 'scraped' : 'manual'),
      lastSynced: creator.lastSynced ? new Date(creator.lastSynced) : undefined,
      tagsGeneratedByAI: false,
      hilbertSpaceVector: generateHilbertVector(creator.id)
    }
  };
};

/**
 * Maps a livecam model to UberPersona format
 */
export const mapLivecamToUberPersona = (livecam: LivecamModel): UberPersona => {
  return {
    id: livecam.id,
    username: livecam.username || livecam.name.toLowerCase().replace(/\s+/g, '_'),
    displayName: livecam.displayName || livecam.name,
    avatarUrl: livecam.imageUrl || livecam.thumbnailUrl || '',
    location: livecam.location || livecam.region || livecam.country || '',
    language: livecam.language || 'English',
    bio: livecam.description || '',
    age: livecam.age || 0,
    ethnicity: livecam.ethnicity || '',
    tags: livecam.tags || livecam.categories || [],
    createdAt: livecam.createdAt || new Date(),
    updatedAt: new Date(),
    roleFlags: {
      isEscort: false,
      isCreator: false,
      isLivecam: true,
      isAI: false,
      isVerified: livecam.isVerified || false,
      isFeatured: livecam.isFeatured || livecam.isPopular || false
    },
    capabilities: {
      hasPhotos: false,
      hasVideos: !!livecam.previewVideoUrl,
      hasStories: false,
      hasChat: true,
      hasBooking: false,
      hasLiveStream: livecam.isLive || livecam.isStreaming || false,
      hasExclusiveContent: false,
      hasContent: false,
      hasRealMeets: false,
      hasVirtualMeets: true
    },
    monetization: {
      acceptsLucoin: true,
      acceptsTips: true,
      subscriptionPrice: 0,
      unlockingPrice: 0,
      boostingActive: !!livecam.boosted,
      meetingPrice: livecam.price || 0
    },
    stats: {
      rating: livecam.rating || 0,
      reviewCount: 0,
      responseRate: 0.9,
      viewCount: livecam.viewerCount || 0,
      favoriteCount: 0
    },
    systemMetadata: {
      source: 'scraped',
      tagsGeneratedByAI: false,
      boostScore: livecam.boostScore,
      hilbertSpaceVector: generateHilbertVector(livecam.id)
    }
  };
};

/**
 * Maps multiple escorts to UberPersonas
 */
export const mapEscortsToUberPersonas = (escorts: Escort[]): UberPersona[] => {
  return escorts.map(escort => mapEscortToUberPersona(escort));
};

/**
 * Maps multiple content creators to UberPersonas
 */
export const mapCreatorsToUberPersonas = (creators: ContentCreator[]): UberPersona[] => {
  return creators.map(creator => mapCreatorToUberPersona(creator));
};

/**
 * Maps multiple livecam models to UberPersonas
 */
export const mapLivecamsToUberPersonas = (livecams: LivecamModel[]): UberPersona[] => {
  return livecams.map(livecam => mapLivecamToUberPersona(livecam));
};

/**
 * Helper function to generate a stable Hilbert vector for an entity
 */
const generateHilbertVector = (id: string, dimension: number = 4): number[] => {
  // Generate a deterministic vector based on the ID
  const seed = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const vector = [];
  
  for (let i = 0; i < dimension; i++) {
    const value = Math.sin(seed * (i + 1) * 0.1) * 0.5 + 0.5;
    vector.push(value);
  }
  
  return vector;
};

/**
 * Helper function to determine if a profile is AI generated
 */
export const isAIProfile = (profile: UberPersona): boolean => {
  return profile.roleFlags.isAI === true || 
    profile.systemMetadata?.source === "ai_generated";
};

/**
 * Helper function to get appropriate styling class based on profile type
 */
export const getProfileTypeClass = (type: string): string => {
  switch(type) {
    case 'verified': return 'border-green-500';
    case 'ai': return 'border-purple-500';
    case 'provisional': return 'border-yellow-500';
    case 'scraped': return 'border-gray-500';
    default: return '';
  }
};
